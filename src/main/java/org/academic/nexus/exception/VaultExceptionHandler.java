package org.academic.nexus.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.stream.Collectors;

/**
 * Intercepts system exceptions and translates them into a standardized format.
 */
@ControllerAdvice
public class VaultExceptionHandler {

    @ExceptionHandler(RecordMissingException.class)
    public ResponseEntity<NexusErrorReport> handleMissing(RecordMissingException ex) {
        NexusErrorReport report = new NexusErrorReport(
            HttpStatus.NOT_FOUND.value(),
            "Resource Not Found",
            ex.getMessage()
        );
        return new ResponseEntity<>(report, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(EmailCollisionException.class)
    public ResponseEntity<NexusErrorReport> handleCollision(EmailCollisionException ex) {
        NexusErrorReport report = new NexusErrorReport(
            HttpStatus.CONFLICT.value(),
            "Data Conflict",
            ex.getMessage()
        );
        return new ResponseEntity<>(report, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<NexusErrorReport> handleValidation(MethodArgumentNotValidException ex) {
        String validationErrors = ex.getBindingResult()
            .getFieldErrors()
            .stream()
            .map(err -> String.format("[%s]: %s", err.getField(), err.getDefaultMessage()))
            .collect(Collectors.joining("; "));

        NexusErrorReport report = new NexusErrorReport(
            HttpStatus.BAD_REQUEST.value(),
            "Validation Integrity Failure",
            validationErrors
        );
        return new ResponseEntity<>(report, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<NexusErrorReport> handleGeneric(Exception ex) {
        NexusErrorReport report = new NexusErrorReport(
            HttpStatus.INTERNAL_SERVER_ERROR.value(),
            "System Fault",
            "An unforeseen error occurred: " + ex.getMessage()
        );
        return new ResponseEntity<>(report, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
