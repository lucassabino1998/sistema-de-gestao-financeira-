package financeiro.privado.dto;

import financeiro.privado.model.Categoria;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class GastosRequest {
    @NotNull(message = "CATEGORIA É OBRIGATORIO")
    private Categoria categoria;
    @NotNull(message = "DATA É OBRIGATORIA")
    private LocalDate data;
    @NotNull(message = "VALOR É OBRIGATORIO")
    @Positive(message = "O VALOR TEM QUE SER POSITIVO")
    private BigDecimal valor;
    @NotNull(message = "A DESCRIÇÃO É OBRIGATORIA")
    private String descricao;

}
