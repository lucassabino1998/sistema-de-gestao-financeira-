package financeiro.privado.dto;

import financeiro.privado.model.CategoriaEntrada;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class EntradasRequest {

    //DESCRIÇÃO DA ENTRADA (NOTNULL)-> NAO PODE SER NULO
    @NotNull(message = "DESCRIÇÃO OBRIGATORIA")
    private String descricaoEntrada;

    //VALOR DA ENTRADA (NOTNULL)-> NAO PODE SER NULO (POSITVE)->VALOR SO PODE SER POSITIVO
    @NotNull(message = "VALOR OBRIGATORIO")
    @Positive(message = "VALOR TEM QUE SER POSITIVO")
    private BigDecimal valorEntrada;

    //CATEGORIA DA ENTRADA (NOTNULL)->NAO PODE SER NULO
    @NotNull(message = "CATEGORIA OBRIGATORIA")
    private CategoriaEntrada categoriaEntrada;
    //RESPONSAVEL PELA DATA (NOTNULL)->NAO PODE SER NULO
    @NotNull(message = "DATA OBRIGATORIA")
    private LocalDate dataEntrada;

}
