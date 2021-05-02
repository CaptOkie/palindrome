package io.github.captokie.palindrome.message;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.context.support.GenericApplicationContext;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.Errors;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

class MessageTest {

    LocalValidatorFactoryBean validator;
    GenericApplicationContext applicationContext;
    Message message;
    Errors errors;

    @BeforeEach
    void setUp() throws Exception {
        applicationContext = new GenericApplicationContext();
        applicationContext.refresh();
        validator = new LocalValidatorFactoryBean();
        validator.setApplicationContext(applicationContext);
        validator.afterPropertiesSet();
        message = new Message();
        errors = new BeanPropertyBindingResult(message, "message");
    }

    @AfterEach
    void tearDown() {
        validator.destroy();
        applicationContext.close();
    }

    @Test
    void testValidation_Null() {
        validator.validate(message, errors);
        assertTrue(errors.hasErrors());
    }

    @Test
    void testValidation_Empty() {
        message.setValue("");
        validator.validate(message, errors);
        assertFalse(errors.hasErrors());
    }

    @Test
    void testValidation() {
        message.setValue("not empty");
        validator.validate(message, errors);
        assertFalse(errors.hasErrors());
    }
}
