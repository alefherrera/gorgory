package org.ungs.gorgory.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.ungs.gorgory.model.User;

@Service
public class UserRetrieverServiceImpl implements UserRetrieverService {

    public User getUser() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        final UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
        return UserPrincipal.toUser(principal);
    }
}
