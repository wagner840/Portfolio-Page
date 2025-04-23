# Instruções para implementação do Modo EMO

Este conjunto de arquivos implementa a funcionalidade do "Modo EMO" para o seu portfólio. Abaixo estão as instruções para integrar os arquivos no seu projeto Next.js existente.

## Passo 1: Criar o Componente EmoToggleButton

1. Copie o arquivo `emo-toggle-button.tsx` para o diretório `src/components/` do seu projeto.

## Passo 2: Adicionar os Estilos EMO

1. Copie o conteúdo do arquivo `emo-styles.css` e adicione-o ao seu arquivo `globals.css` existente.

## Passo 3: Implementar o Efeito de Sangue (Opcional)

1. Copie o arquivo `blood-effect.tsx` para o diretório `src/components/` do seu projeto.

## Passo 4: Atualizar o Layout

1. Modifique seu arquivo `layout.tsx` para incluir o `EmoModeProvider` e o `BloodEffect`, conforme mostrado em `emo-layout.tsx`.

## Passo 5: Usar o Botão EMO

1. Em qualquer página onde você deseja adicionar o botão EMO, importe-o:

```tsx
import { EmoToggleButton, useEmoMode } from '@/components/emo-toggle-button';
```

2. Use o hook `useEmoMode` para adicionar a classe `emo-mode-active` aos elementos apropriados:

```tsx
const { isEmoMode } = useEmoMode();
const containerClass = `container mx-auto py-10 ${isEmoMode ? 'emo-mode-active' : ''}`;
```

3. Adicione o botão EMO na interface:

```tsx
<EmoToggleButton />
```

## Melhorias Futuras

1. **Persistência de Estado**: Implementar armazenamento local para manter a preferência do usuário entre sessões.
2. **Transições Suaves**: Adicionar transições CSS para mudanças de tema mais suaves.
3. **Personalização Adicional**: Expandir os estilos EMO para outros componentes específicos.
4. **Fontes Góticas**: Considerar importar fontes adequadas como "Metal Mania", "Cinzel" ou outras fontes góticas de serviços como Google Fonts.

## Observações

- O componente `BloodEffect` usa Canvas para criar o efeito de sangue pingando. Este é um efeito visual intenso e pode ser removido se não for adequado para seu público.
- Você pode ajustar as cores e estilos no arquivo CSS conforme necessário.
- Se tiver problemas de performance com o efeito de sangue, considere reduzir o número de gotas ou desabilitar em dispositivos móveis.
