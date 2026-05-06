package financeiro.privado.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
@Service
public class JwtService {
    private final SecretKey chave = Keys.hmacShaKeyFor(
            "teste-chave-essa-porra-precisa-ser-crumprida".getBytes()
    );

    public Claims extrairClaims(String token) {
        return Jwts.parser()
                .verifyWith(chave)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public String extrairEmail(String token) {
        return extrairClaims(token).getSubject();
    }

    public Long extrairUserId(String token) {
        return extrairClaims(token).get("userId", Long.class);
    }

    public String extrairRole(String token) {
        return extrairClaims(token).get("role", String.class);
    }

    public boolean tokenValido(String token) {
        return !extrairClaims(token)
                .getExpiration()
                .before(new Date());
    }
}
