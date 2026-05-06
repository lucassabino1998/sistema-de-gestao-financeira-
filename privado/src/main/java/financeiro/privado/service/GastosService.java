package financeiro.privado.service;

import financeiro.privado.dto.GastosRequest;
import financeiro.privado.model.Gastos;
import financeiro.privado.repository.GastosRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GastosService {

    private final GastosRepository gastosRepository;

    public Gastos novoGastos(GastosRequest gastosRequest, Long usuarioId) {
        Gastos novoGasto = Gastos.builder()
                .valor(gastosRequest.getValor())
                .descricao(gastosRequest.getDescricao())
                .data(gastosRequest.getData())
                .categoria(gastosRequest.getCategoria())
                .usuarioId(usuarioId)
                .build();

        Gastos gastoSalvo = gastosRepository.save(novoGasto);

        return transformarParaResponse(gastoSalvo);
    }

    private Gastos transformarParaResponse(Gastos g) {
        return Gastos.builder()
                .id(g.getId())
                .data(g.getData())
                .valor(g.getValor())
                .descricao(g.getDescricao())
                .categoria(g.getCategoria())
                .usuarioId(g.getUsuarioId())
                .build();
    }

    public List<Gastos> listarGastos(Long usuarioId) {
        List<Gastos> gastos = gastosRepository.findByUsuarioId(usuarioId);

        return gastos.stream()
                .map(this::transformarParaResponse)
                .collect(Collectors.toList());
    }

    public void deletarGastos(Long id, Long usuarioId) {
        Gastos gasto = gastosRepository.findByIdAndUsuarioId(id, usuarioId)
                .orElseThrow(() -> new RuntimeException("TRANSAÇÃO NÃO ENCONTRADA COM O ID: " + id));

        gastosRepository.delete(gasto);
    }

    public Gastos atualizarGasto(Long id, GastosRequest gastosRequest, Long usuarioId) {
        Gastos gastosExistente = gastosRepository.findByIdAndUsuarioId(id, usuarioId)
                .orElseThrow(() -> new RuntimeException("TRANSAÇÃO NÃO ENCONTRADA"));

        gastosExistente.setDescricao(gastosRequest.getDescricao());
        gastosExistente.setValor(gastosRequest.getValor());
        gastosExistente.setCategoria(gastosRequest.getCategoria());
        gastosExistente.setData(gastosRequest.getData());

        Gastos gastosAtualizado = gastosRepository.save(gastosExistente);

        return transformarParaResponse(gastosAtualizado);
    }
}