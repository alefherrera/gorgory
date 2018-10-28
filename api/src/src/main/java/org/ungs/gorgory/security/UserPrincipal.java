package org.ungs.gorgory.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.userdetails.UserDetails;
import org.ungs.gorgory.model.Role;
import org.ungs.gorgory.model.User;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

public class UserPrincipal implements UserDetails {
    private Long id;

    private String name;

    private String username;

    @JsonIgnore
    private String email;

    @JsonIgnore
    private String password;

    private Collection<Role> authorities;

    private UserPrincipal(Long id, String name, String username, String email, String password, Collection<Role> authorities) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
    }

    static UserPrincipal create(User user) {
        List<Role> authorities = user.getRole() == null ? null : Collections.singletonList(user.getRole());

        return new UserPrincipal(
                user.getId(),
                user.getName(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                authorities
        );
    }

    static User toUser(UserPrincipal principal) {
        User user = new User(principal.getId());
        user.setName(principal.name);
        user.setUsername(principal.username);
        user.setEmail(principal.email);
        user.setPassword(principal.password);
        user.setRole(principal.getAuthorities().iterator().next());
        return user;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public Collection<Role> getAuthorities() {
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserPrincipal that = (UserPrincipal) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
