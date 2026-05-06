package usuario.usuario.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UsuarioRequest {

    @Email(message = "EMAIL INVALIDO")
    @NotBlank(message = "EMAIL É OBRIGATORIO")
    private String email;

    @NotBlank(message = "SENHA É OBRIGATORIA")
    @Size(min = 6, message = "SENHA DEVE TER NO MINIMO 6 CARACTERES")
    private String password;

    @NotBlank(message = "NOME É OBRIGATORIO")
    private String nome;

    @NotNull(message = "ATIVO É OBRIGATORIO")
    private Boolean ativo;
}