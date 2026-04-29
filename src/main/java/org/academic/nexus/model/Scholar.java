package org.academic.nexus.model;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/**
 * Core domain entity representing an academic participant.
 */
public class Scholar {

    private Long refId;

    @NotBlank(message = "Scholar name is mandatory and cannot be empty")
    @Size(min = 2, max = 100, message = "Full name should span between 2 and 100 characters")
    private String legalName;

    @NotBlank(message = "Electronic mail is required for communication")
    @Email(message = "Provided mail format is not valid")
    private String electronicMail;

    @NotBlank(message = "Academic stream must be specified")
    private String academicStream;

    // Default constructor for framework initialization
    public Scholar() {}

    // Convenience constructor for creating new records
    public Scholar(String legalName, String electronicMail, String academicStream) {
        this.legalName = legalName;
        this.electronicMail = electronicMail;
        this.academicStream = academicStream;
    }

    // Full constructor for retrieval
    public Scholar(Long refId, String legalName, String electronicMail, String academicStream) {
        this.refId = refId;
        this.legalName = legalName;
        this.electronicMail = electronicMail;
        this.academicStream = academicStream;
    }

    // Accessors and Mutators
    public Long getRefId() { return refId; }
    public void setRefId(Long refId) { this.refId = refId; }

    public String getLegalName() { return legalName; }
    public void setLegalName(String legalName) { this.legalName = legalName; }

    public String getElectronicMail() { return electronicMail; }
    public void setElectronicMail(String electronicMail) { this.electronicMail = electronicMail; }

    public String getAcademicStream() { return academicStream; }
    public void setAcademicStream(String academicStream) { this.academicStream = academicStream; }

    @Override
    public String toString() {
        return String.format("Scholar[RefID=%d, Name='%s', Mail='%s', Stream='%s']", 
            refId, legalName, electronicMail, academicStream);
    }
}
