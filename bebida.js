class ProdutoFlyweight {
    constructor(nome, preco) {
      this.nome = nome;
      this.preco = preco;
    }
  }
  
  class ProdutoFactory {
    constructor() {
      this.produtos = {};
    }
  
    getProduto(nome, preco) {
      if (!this.produtos[nome]) {
        this.produtos[nome] = new ProdutoFlyweight(nome, preco);
      }
      return this.produtos[nome];
    }
  }
  
  const produtoFactory = new ProdutoFactory();
  
  let estoque = {
    "Coca Cola 350ml": { preco: 7.00, quantidade: 10 },
    "Coca Cola 2L": { preco: 15.00, quantidade: 10 },
    "Coca Cola Zero 350ml": { preco: 7.00, quantidade: 10 },
    "Coca Cola Zero 2L": { preco: 15.00, quantidade: 10 },
    "Guarana 350ml": { preco: 7.00, quantidade: 10 },
    "Guarana 2L": { preco: 15.00, quantidade: 10 },
    "Cerveja Skol 350ml": { preco: 8.00, quantidade: 10 },
    "Suco DelValle 1L": { preco: 18.00, quantidade: 10 },
    "Agua Mineral 1,5L": { preco: 6.00, quantidade: 10 },
  };
  
  let carrinho = [];
  
  function adicionarProduto(nome) {
    if (estoque[nome].quantidade > 0) {
      const qtd = 1;
      const preco = estoque[nome].preco;
      const produto = produtoFactory.getProduto(nome, preco);
  
      const itemCarrinhoIndex = carrinho.findIndex(item => item.produto.nome === produto.nome);
      if (itemCarrinhoIndex !== -1) {
        carrinho[itemCarrinhoIndex].quantidade += qtd;
      } else {
        carrinho.push({ produto: produto, quantidade: qtd });
      }
  
      estoque[nome].quantidade--;
      atualizarCarrinho();
      atualizarEstoque();
    } else {
      alert("Este produto está sem estoque.");
    }
  }
  
  function removerProduto(nome) {
    carrinho = carrinho.filter(item => item.produto.nome !== nome);
    estoque[nome].quantidade++;
    atualizarCarrinho();
    atualizarEstoque();
  }
  
  function atualizarCarrinho() {
    const carrinhoCorpo = document.getElementById("carrinho-corpo");
    carrinhoCorpo.innerHTML = "";
    let total = 0;
    carrinho.forEach(item => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${item.produto.nome}</td>
        <td>R$ ${item.produto.preco.toFixed(2)}</td>
        <td>${item.quantidade}</td>
        <td><button class="btn" onclick="removerProduto('${item.produto.nome}')">Remover</button></td>
      `;
      carrinhoCorpo.appendChild(tr);
      total += item.produto.preco * item.quantidade;
    });
    document.getElementById("total").textContent = total.toFixed(2);
  }
  
  function atualizarEstoque() {
    const produtosCorpo = document.getElementById("produtos-corpo");
    Object.keys(estoque).forEach(nome => {
      const tr = produtosCorpo.querySelector(`#${nome.replace(/\s+/g, '')}`);
      const estoqueStatus = estoque[nome].quantidade > 0 ? estoque[nome].quantidade : "---";
      tr.cells[2].textContent = estoqueStatus;
      if (estoqueStatus === "---") {
        tr.classList.add("sem-estoque");
      } else {
        tr.classList.remove("sem-estoque");
      }
    });
  }
  
  // Adiciona os produtos na tabela de produtos disponíveis
  const produtosCorpo = document.getElementById("produtos-corpo");
  Object.keys(estoque).forEach(nome => {
    const tr = document.createElement("tr");
    tr.id = nome.replace(/\s+/g, '');
    tr.innerHTML = `
      <td>${nome}</td>
      <td>R$ ${estoque[nome].preco.toFixed(2)}</td>
      <td>${estoque[nome].quantidade}</td>
      <td><button class="btn" onclick="adicionarProduto('${nome}')">Adicionar</button></td>
    `;
    produtosCorpo.appendChild(tr);
  });
  