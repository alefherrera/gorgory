package org.ungs.gorgory.service;

import org.ungs.gorgory.bean.internal.MailPayload;

public interface MailService {

    void send(MailPayload mailPayload);

}
