package financeiro.privado.controller;

import financeiro.privado.dto.GastosRequest;
import financeiro.privado.model.Gastos;
import financeiro.privado.service.GastosService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("gastos")
@RestController
@RequiredArgsConstructor
public class GastosController {

    private final GastosService gastosService;

    private Long getUsuarioId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return (Long) auth.getPrincipal();
    }

    @PostMapping
    public Gastos cadastrarGastos(@RequestBody @Valid GastosRequest gastosRequest) {
        return gastosService.novoGastos(gastosRequest, getUsuarioId());
    }

    @GetMapping
    public List<Gastos> listarGastos() {
        return gastosService.listarGastos(getUsuarioId());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarGastos(@PathVariable Long id) {
        gastosService.deletarGastos(id, getUsuarioId());
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Gastos> atualizarGastos(
            @PathVariable Long id,
            @RequestBody @Valid GastosRequest gastosRequest) {

        return ResponseEntity.ok(
                gastosService.atualizarGasto(id, gastosRequest, getUsuarioId())
        );
    }
}