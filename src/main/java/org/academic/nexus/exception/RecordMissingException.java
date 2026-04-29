package org.academic.nexus.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Triggered when a specific scholarship record cannot be located.
 */
@ResponseStatus(HttpStatus.NOT_FOUND)
public class RecordMissingException extends RuntimeException {
    public RecordMissingException(String details) {
        super(details);
    }
}
