package usuario.usuario.Controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import usuario.usuario.DTO.LoginRequest;
import usuario.usuario.DTO.LoginResponse;
import usuario.usuario.DTO.UsuarioRequest;
import usuario.usuario.DTO.UsuarioResponse;
import usuario.usuario.Entity.Usuario;
import usuario.usuario.Service.JwtService;
import usuario.usuario.Service.UsuarioService;

import java.util.List;

@RequestMapping("/usuario")
@RestController
@RequiredArgsConstructor
public class UsuarioController {
    private final UsuarioService usuarioService;
    private final JwtService jwtService;

    @PostMapping
    public ResponseEntity<LoginResponse> criarUsuario(@Valid @RequestBody UsuarioRequest usuarioRequest) {
        Usuario usuario = usuarioService.criarUsuario(usuarioRequest);

        String token = jwtService.gerarToken(usuario);

        LoginResponse loginResponse = new LoginResponse(
                usuario.getNome(),
                usuario.getEmail(),
                token
        );

        return ResponseEntity.ok(loginResponse);
    }
    @GetMapping
    public ResponseEntity<List<UsuarioResponse>> listarUsuarios() {
        List<UsuarioResponse> lista = usuarioService.listarUsuario()
                .stream()
                .map(usuario -> new UsuarioResponse(
                        usuario.getId(),
                        usuario.getNome(),
                        usuario.getEmail(),
                        usuario.getPerfil().name()
                ))
                .toList();

        return ResponseEntity.ok(lista);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> atualizarUsuario(@PathVariable Long id, @Valid @RequestBody Usuario usuario){
        return ResponseEntity.ok(usuarioService.atualizarUsuario(id, usuario));
    }
    @GetMapping("/me")
    public ResponseEntity<UsuarioResponse> buscarMinhaConta(Authentication authentication) {
        return ResponseEntity.ok(usuarioService.Buscarminhaconta(authentication.getName()));
    }

    @PutMapping("/me")
    public ResponseEntity<UsuarioResponse> atualizarMinhaConta(
            @Valid @RequestBody UsuarioRequest request,
            Authentication authentication
    ) {
        return ResponseEntity.ok(
                usuarioService.atualizarMinhaConta(authentication.getName(), request)
        );
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarUsuario(@PathVariable Long id){
        usuarioService.deletarUsuario(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest loginRequest){
        return ResponseEntity.ok(usuarioService.login(loginRequest));
    }
}