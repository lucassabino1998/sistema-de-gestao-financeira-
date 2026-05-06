package usuario.usuario.Security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import usuario.usuario.Service.JwtService;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UsuarioDetailsService usuarioDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        System.out.println("AUTH HEADER: " + authHeader);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);
        System.out.println("TOKEN: " + token);

        try {
            String email = jwtService.extrairEmail(token);
            System.out.println("EMAIL DO TOKEN: " + email);

            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                UserDetails usuario = usuarioDetailsService.loadUserByUsername(email);
                System.out.println("USERNAME DO USERDETAILS: " + usuario.getUsername());

                if (jwtService.tokenValido(token)) {

                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    usuario,
                                    null,
                                    usuario.getAuthorities()
                            );

                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);

                    System.out.println("USUARIO AUTENTICADO COM SUCESSO");

                } else {
                    System.out.println("TOKEN INVALIDO");
                }
            }

        } catch (Exception e) {
            SecurityContextHolder.clearContext();
            e.printStackTrace();
        }

        filterChain.doFilter(request, response);
    }
}