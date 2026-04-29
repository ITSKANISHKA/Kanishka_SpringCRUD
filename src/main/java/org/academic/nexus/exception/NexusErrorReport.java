package org.academic.nexus.exception;

import java.time.LocalDateTime;

/**
 * Standard error structure for the Nexus API.
 */
public class NexusErrorReport {
    private int statusCode;
    private String label;
    private String detail;
    private LocalDateTime occurrence;

    public NexusErrorReport(int statusCode, String label, String detail) {
        this.statusCode = statusCode;
        this.label = label;
        this.detail = detail;
        this.occurrence = LocalDateTime.now();
    }

    // Boilerplate Accessors
    public int getStatusCode() { return statusCode; }
    public String getLabel() { return label; }
    public String getDetail() { return detail; }
    public LocalDateTime getOccurrence() { return occurrence; }
}
