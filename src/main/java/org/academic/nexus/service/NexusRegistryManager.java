package org.academic.nexus.service;

import org.academic.nexus.exception.EmailCollisionException;
import org.academic.nexus.exception.RecordMissingException;
import org.academic.nexus.model.Scholar;
import org.academic.nexus.repository.ScholarDataStore;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Concrete management of the scholar registry.
 */
@Service
public class NexusRegistryManager implements AcademicManagement {

    private final ScholarDataStore store;

    public NexusRegistryManager(ScholarDataStore store) {
        this.store = store;
    }

    @Override
    public Scholar enroll(Scholar s) {
        if (store.checkEmailPresence(s.getElectronicMail())) {
            throw new EmailCollisionException(
                String.format("Identity collision: Address '%s' is already registered.", s.getElectronicMail())
            );
        }
        return store.persist(s);
    }

    @Override
    public List<Scholar> getRegistry() {
        return store.fetchAll();
    }

    @Override
    public Scholar getScholarDetail(Long sid) {
        return store.locateById(sid)
            .orElseThrow(() -> new RecordMissingException("Registry lookup failed for ID: " + sid));
    }

    @Override
    public Scholar updateRecord(Long sid, Scholar updatedData) {
        Scholar existing = getScholarDetail(sid);

        // Check for collision if email changed
        if (!existing.getElectronicMail().equals(updatedData.getElectronicMail()) &&
            store.checkEmailPresence(updatedData.getElectronicMail())) {
            throw new EmailCollisionException("New address is already tied to another scholar.");
        }

        existing.setLegalName(updatedData.getLegalName());
        existing.setElectronicMail(updatedData.getElectronicMail());
        existing.setAcademicStream(updatedData.getAcademicStream());

        store.modify(existing);
        return existing;
    }

    @Override
    public void deRegister(Long sid) {
        if (store.locateById(sid).isPresent()) {
            store.remove(sid);
        } else {
            throw new RecordMissingException("Cannot de-register non-existent scholar ID: " + sid);
        }
    }
}
