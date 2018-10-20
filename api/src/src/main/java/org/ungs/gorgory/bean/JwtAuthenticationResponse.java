package org.ungs.gorgory.bean;

import org.ungs.gorgory.bean.dto.UserDTO;

public class JwtAuthenticationResponse {
    private UserDTO user;
    private String accessToken;
    private String tokenType = "Bearer";

    public JwtAuthenticationResponse(UserDTO user, String accessToken) {
        this.user = user;
        this.accessToken = accessToken;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }
}
