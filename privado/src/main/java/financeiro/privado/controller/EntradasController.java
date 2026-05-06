package financeiro.privado.controller;

import financeiro.privado.dto.EntradasRequest;
import financeiro.privado.model.Entradas;
import financeiro.privado.service.EntradasService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("entradas")
@RequiredArgsConstructor
public class EntradasController {

    private final EntradasService entradasService;

    private Long getUsuarioIdLogado() {
        return (Long) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
    }

    @PostMapping
    public Entradas cadastrarEntradas(@RequestBody @Valid EntradasRequest entradasRequest) {
        Long usuarioId = getUsuarioIdLogado();
        return entradasService.novaEntrada(entradasRequest, usuarioId);
    }

    @GetMapping
    public List<Entradas> listarEntradas() {
        Long usuarioId = getUsuarioIdLogado();
        return entradasService.listaEntradas(usuarioId);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarEntradas(@PathVariable Long id) {
        Long usuarioId = getUsuarioIdLogado();
        entradasService.deleteEntradas(id, usuarioId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Entradas> atualizarEntradas(
            @PathVariable Long id,
            @RequestBody @Valid EntradasRequest entradasRequest
    ) {
        Long usuarioId = getUsuarioIdLogado();
        return ResponseEntity.ok(
                entradasService.atualizarEntradas(id, entradasRequest, usuarioId)
        );
    }
}