package financeiro.privado.repository;

import financeiro.privado.model.Entradas;
import financeiro.privado.model.Gastos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GastosRepository extends JpaRepository<Gastos, Long> {
    List<Gastos> findByUsuarioId(Long usuarioId);

    Optional<Gastos> findByIdAndUsuarioId(Long id, Long usuarioId);
}
