package financeiro.privado.service;

import financeiro.privado.dto.EntradasRequest;
import financeiro.privado.model.Entradas;
import financeiro.privado.repository.EntradasRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EntradasService {

    private final EntradasRepository entradasRepository;

    private Entradas transformarParaResponse(Entradas e) {
        return Entradas.builder()
                .id(e.getId())
                .valorEntrada(e.getValorEntrada())
                .dataEntrada(e.getDataEntrada())
                .descricaoEntrada(e.getDescricaoEntrada())
                .categoriaEntrada(e.getCategoriaEntrada())
                .usuarioId(e.getUsuarioId())
                .build();
    }

    public Entradas novaEntrada(EntradasRequest entradasRequest, Long usuarioId) {
        Entradas novasEntradas = Entradas.builder()
                .categoriaEntrada(entradasRequest.getCategoriaEntrada())
                .dataEntrada(entradasRequest.getDataEntrada())
                .descricaoEntrada(entradasRequest.getDescricaoEntrada())
                .valorEntrada(entradasRequest.getValorEntrada())
                .usuarioId(usuarioId)
                .build();

        Entradas entradaSalva = entradasRepository.save(novasEntradas);

        return transformarParaResponse(entradaSalva);
    }

    public List<Entradas> listaEntradas(Long usuarioId) {
        List<Entradas> listaEntradas = entradasRepository.findByUsuarioId(usuarioId);

        return listaEntradas.stream()
                .map(this::transformarParaResponse)
                .collect(Collectors.toList());
    }

    public void deleteEntradas(Long id, Long usuarioId) {
        Entradas entrada = entradasRepository.findByIdAndUsuarioId(id, usuarioId)
                .orElseThrow(() -> new RuntimeException("TRANSAÇÃO NÃO ENCONTRADA"));

        entradasRepository.delete(entrada);
    }

    public Entradas atualizarEntradas(Long id, EntradasRequest entradasRequest, Long usuarioId) {
        Entradas entradasExistente = entradasRepository.findByIdAndUsuarioId(id, usuarioId)
                .orElseThrow(() -> new RuntimeException("TRANSAÇÃO NÃO ENCONTRADA"));

        entradasExistente.setDescricaoEntrada(entradasRequest.getDescricaoEntrada());
        entradasExistente.setValorEntrada(entradasRequest.getValorEntrada());
        entradasExistente.setDataEntrada(entradasRequest.getDataEntrada());
        entradasExistente.setCategoriaEntrada(entradasRequest.getCategoriaEntrada());

        Entradas entradaAtualizada = entradasRepository.save(entradasExistente);

        return transformarParaResponse(entradaAtualizada);
    }
}