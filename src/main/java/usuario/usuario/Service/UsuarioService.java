package usuario.usuario.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import usuario.usuario.DTO.LoginRequest;
import usuario.usuario.DTO.LoginResponse;
import usuario.usuario.DTO.UsuarioRequest;
import usuario.usuario.DTO.UsuarioResponse;
import usuario.usuario.Entity.Perfil;
import usuario.usuario.Entity.Usuario;
import usuario.usuario.Repository.UsuarioRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public Usuario criarUsuario(UsuarioRequest request) {
        Perfil perfil = usuarioRepository.count() == 0 ? Perfil.ADMIN : Perfil.USER;

        Usuario usuario = Usuario.builder()
                .nome(request.getNome())
                .email(request.getEmail())
                .senha(passwordEncoder.encode(request.getPassword()))
                .ativo(request.getAtivo())
                .perfil(perfil)
                .build();

        return usuarioRepository.save(usuario);
    }

    public List<Usuario> listarUsuario() {
        return usuarioRepository.findAll();
    }

    public Usuario atualizarUsuario(Long id, Usuario usuarioAtualizado) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        usuario.setNome(usuarioAtualizado.getNome());
        usuario.setEmail(usuarioAtualizado.getEmail());

        if (usuarioAtualizado.getSenha() != null && !usuarioAtualizado.getSenha().isBlank()) {
            usuario.setSenha(passwordEncoder.encode(usuarioAtualizado.getSenha()));
        }

        usuario.setAtivo(usuarioAtualizado.getAtivo());

        if (usuarioAtualizado.getPerfil() != null) {
            usuario.setPerfil(usuarioAtualizado.getPerfil());
        }

        return usuarioRepository.save(usuario);
    }

    public void deletarUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }

    public LoginResponse login(LoginRequest request) {
        Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Email ou senha inválidos"));

        boolean senhaCorreta = passwordEncoder.matches(request.getSenha(), usuario.getSenha());

        if (!senhaCorreta) {
            throw new RuntimeException("Email ou senha inválidos");
        }

        String token = jwtService.gerarToken(usuario);

        return new LoginResponse(
                usuario.getNome(),
                usuario.getEmail(),
                token
        );
    }

    public UsuarioResponse Buscarminhaconta(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(()->new RuntimeException("Usuário não encontrado"));

        return new UsuarioResponse(
                usuario.getId(),
                usuario.getNome(),
                usuario.getNome(),
                usuario.getPerfil().name()
        );
    }

    public UsuarioResponse atualizarMinhaConta(String email, UsuarioRequest request) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        usuario.setNome(request.getNome());
        usuario.setEmail(request.getEmail());
        usuario.setAtivo(request.getAtivo());

        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            usuario.setSenha(passwordEncoder.encode(request.getPassword()));
        }

        Usuario usuarioSalvo = usuarioRepository.save(usuario);

        return new UsuarioResponse(
                usuarioSalvo.getId(),
                usuarioSalvo.getNome(),
                usuarioSalvo.getEmail(),
                usuarioSalvo.getPerfil().name()
        );
    }


}