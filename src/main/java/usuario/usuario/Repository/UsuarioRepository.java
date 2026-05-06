package usuario.usuario.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import usuario.usuario.Entity.Usuario;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByEmail(String email);
}
