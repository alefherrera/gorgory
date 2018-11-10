package org.ungs.gorgory.service.impl;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.ungs.gorgory.bean.internal.MailPayload;
import org.ungs.gorgory.service.MailService;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class MailServiceImpl implements MailService {

    private final JavaMailSender mailSender;

    public MailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void send(MailPayload mailPayload) {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper;
        try {
            helper = new MimeMessageHelper(message, false);
            helper.setFrom("gorgory@ungs.edu.ar");
            helper.setTo(mailPayload.getDestination());
            helper.setSubject(mailPayload.getSubject());
            helper.setText(mailPayload.getBody(), true);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

        mailSender.send(message);
    }
}
