package org.academic.nexus.service;

import org.academic.nexus.model.Scholar;
import java.util.List;

/**
 * High-level orchestration interface for academic operations.
 */
public interface AcademicManagement {
    Scholar enroll(Scholar scholar);
    List<Scholar> getRegistry();
    Scholar getScholarDetail(Long sid);
    Scholar updateRecord(Long sid, Scholar scholar);
    void deRegister(Long sid);
}
