package org.academic.nexus.repository;

import org.academic.nexus.model.Scholar;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.util.List;
import java.util.Optional;

/**
 * JDBC-based persistence implementation for scholarship records.
 */
@Repository
public class ScholarJdbcVault implements ScholarDataStore {

    private static final Logger logger = LoggerFactory.getLogger(ScholarJdbcVault.class);
    private final JdbcTemplate dbOperation;

    public ScholarJdbcVault(JdbcTemplate dbOperation) {
        this.dbOperation = dbOperation;
    }

    private final RowMapper<Scholar> mapper = (rs, rowNum) -> new Scholar(
        rs.getLong("sid"),
        rs.getString("full_name"),
        rs.getString("contact_email"),
        rs.getString("academic_discipline")
    );

    @Override
    public Scholar persist(Scholar s) {
        final String query = "INSERT INTO academic_records (full_name, contact_email, academic_discipline) VALUES (?, ?, ?)";
        KeyHolder identity = new GeneratedKeyHolder();

        dbOperation.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(query, new String[]{"sid"});
            ps.setString(1, s.getLegalName());
            ps.setString(2, s.getElectronicMail());
            ps.setString(3, s.getAcademicStream());
            return ps;
        }, identity);

        s.setRefId(identity.getKey().longValue());
        logger.info("New record established in vault: {}", s.getRefId());
        return s;
    }

    @Override
    public List<Scholar> fetchAll() {
        return dbOperation.query("SELECT * FROM academic_records ORDER BY sid DESC", mapper);
    }

    @Override
    public Optional<Scholar> locateById(Long sid) {
        try {
            Scholar found = dbOperation.queryForObject(
                "SELECT * FROM academic_records WHERE sid = ?",
                mapper,
                sid
            );
            return Optional.ofNullable(found);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    @Override
    public void modify(Scholar s) {
        dbOperation.update(
            "UPDATE academic_records SET full_name = ?, contact_email = ?, academic_discipline = ? WHERE sid = ?",
            s.getLegalName(), s.getElectronicMail(), s.getAcademicStream(), s.getRefId()
        );
        logger.info("Vault record updated: {}", s.getRefId());
    }

    @Override
    public void remove(Long sid) {
        dbOperation.update("DELETE FROM academic_records WHERE sid = ?", sid);
        logger.info("Record purged from vault: {}", sid);
    }

    @Override
    public boolean checkEmailPresence(String mail) {
        Integer count = dbOperation.queryForObject(
            "SELECT COUNT(*) FROM academic_records WHERE contact_email = ?",
            Integer.class,
            mail
        );
        return count != null && count > 0;
    }
}
