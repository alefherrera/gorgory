package org.ungs.gorgory.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.ungs.gorgory.model.User;

@Component
public class AuthenticatedUserRetriever implements IAuthenticatedUserRetriever {
    @Override
    public User getAuthenticatedUser() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        final UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
        return UserPrincipal.toUser(principal);
    }
}
