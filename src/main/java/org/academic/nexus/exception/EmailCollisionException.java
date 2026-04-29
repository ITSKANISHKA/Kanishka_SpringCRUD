package org.academic.nexus.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Triggered when a mail address is already registered in the vault.
 */
@ResponseStatus(HttpStatus.CONFLICT)
public class EmailCollisionException extends RuntimeException {
    public EmailCollisionException(String details) {
        super(details);
    }
}
