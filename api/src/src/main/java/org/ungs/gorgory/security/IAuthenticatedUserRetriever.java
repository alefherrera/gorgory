package org.ungs.gorgory.security;

import org.ungs.gorgory.model.User;

public interface IAuthenticatedUserRetriever {
    User getAuthenticatedUser();
}
