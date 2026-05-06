package usuario.usuario.Config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import usuario.usuario.Entity.Perfil;
import usuario.usuario.Entity.Usuario;
import usuario.usuario.Repository.UsuarioRepository;

@Configuration
@RequiredArgsConstructor
public class AdminInitializer {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner criarAdmin() {
        return args -> {
            if (usuarioRepository.count() == 0) {

                Usuario admin = Usuario.builder()
                        .nome("Admin")
                        .email("admin@email.com")
                        .senha(passwordEncoder.encode("123456"))
                        .ativo(true)
                        .perfil(Perfil.ADMIN)
                        .build();

                usuarioRepository.save(admin);

                System.out.println("ADMIN CRIADO:");
                System.out.println("email: admin@email.com");
                System.out.println("senha: 123456");
            }
        };
    }
}