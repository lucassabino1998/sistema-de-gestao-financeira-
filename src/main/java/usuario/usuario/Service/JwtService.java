package usuario.usuario.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;
import usuario.usuario.Entity.Usuario;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {

    private final SecretKey chave = Keys.hmacShaKeyFor(
            "teste-chave-essa-porra-precisa-ser-crumprida".getBytes()
    );

    public String gerarToken(Usuario usuario) {

        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", usuario.getId());
        claims.put("role", usuario.getPerfil().name());

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(usuario.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
                .signWith(chave, SignatureAlgorithm.HS256)
                .compact();
    }

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

    public Date extrairExpiracao(String token) {
        return extrairClaims(token).getExpiration();
    }

    public boolean tokenExpirado(String token) {
        return extrairExpiracao(token).before(new Date());
    }

    public boolean tokenValido(String token) {
        return !tokenExpirado(token);
    }
}