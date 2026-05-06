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
@Table(name = "tb_gastos")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Gastos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Long usuarioId;

    private String descricao;
    private BigDecimal valor;
    private Categoria categoria;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate data;

}
