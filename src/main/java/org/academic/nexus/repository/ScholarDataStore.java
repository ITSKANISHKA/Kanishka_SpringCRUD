package org.academic.nexus.repository;

import org.academic.nexus.model.Scholar;
import java.util.List;
import java.util.Optional;

/**
 * Interface defining persistent operations for Scholar records.
 */
public interface ScholarDataStore {
    Scholar persist(Scholar scholar);
    List<Scholar> fetchAll();
    Optional<Scholar> locateById(Long sid);
    void modify(Scholar scholar);
    void remove(Long sid);
    boolean checkEmailPresence(String mail);
}
