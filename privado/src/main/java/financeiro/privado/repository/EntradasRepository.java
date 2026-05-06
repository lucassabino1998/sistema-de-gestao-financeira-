package financeiro.privado.repository;

import financeiro.privado.model.Entradas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


// RESPONSAVEL PELO ACESSOS AOS DADOS DA ENTIDADE ENTRADA
@Repository
public interface EntradasRepository   extends JpaRepository<Entradas, Long> {
    List<Entradas> findByUsuarioId(Long usuarioId);

    Optional<Entradas> findByIdAndUsuarioId(Long id, Long usuarioId);
}
