package financeiro.privado.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "td_entradas")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Entradas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Long usuarioId;

    private String descricaoEntrada;
    private BigDecimal valorEntrada;
    private CategoriaEntrada categoriaEntrada;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dataEntrada;

}
