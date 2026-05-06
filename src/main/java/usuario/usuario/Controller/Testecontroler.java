package usuario.usuario.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import usuario.usuario.Entity.Perfil;
import usuario.usuario.Entity.Usuario;
import usuario.usuario.Service.JwtService;

@RestController
public class Testecontroler {
    private final JwtService jwtService;
    public Testecontroler(JwtService jwtService) {
        this.jwtService = jwtService;
    }
    @GetMapping("/token")
    public String gerarToken() {
        Usuario usuario = Usuario.builder()
                .id(1L)
                .email("teste@email.com")
                .perfil(Perfil.USER)
                .build();

        return jwtService.gerarToken(usuario);
    }
    @GetMapping("/validar")
    public String validarToken(@RequestParam String token){
        return jwtService.extrairEmail(token);

    }
}
