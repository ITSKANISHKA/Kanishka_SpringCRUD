package org.academic.nexus.controller;

import org.academic.nexus.model.Scholar;
import org.academic.nexus.service.AcademicManagement;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * Entry point for academic record interactions.
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/nexus/scholars")
public class NexusGatekeeper {

    private static final Logger log = LoggerFactory.getLogger(NexusGatekeeper.class);
    private final AcademicManagement management;

    public NexusGatekeeper(AcademicManagement management) {
        this.management = management;
    }

    @PostMapping
    public ResponseEntity<Scholar> addScholar(@Valid @RequestBody Scholar s) {
        log.info("Incoming request to add scholar: {}", s.getLegalName());
        Scholar saved = management.enroll(s);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Scholar> listAllScholars() {
        log.info("Fetching entire scholarship registry");
        return management.getRegistry();
    }

    @GetMapping("/{sid}")
    public Scholar getScholarById(@PathVariable Long sid) {
        log.info("Locating scholar with ID: {}", sid);
        return management.getScholarDetail(sid);
    }

    @PutMapping("/{sid}")
    public Scholar updateScholarRecord(@PathVariable Long sid, @Valid @RequestBody Scholar s) {
        log.info("Updating registry for ID: {}", sid);
        return management.updateRecord(sid, s);
    }

    @DeleteMapping("/{sid}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteScholar(@PathVariable Long sid) {
        log.info("Purging scholar from nexus: {}", sid);
        management.deRegister(sid);
    }
}
