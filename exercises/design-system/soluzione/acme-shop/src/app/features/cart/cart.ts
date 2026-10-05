import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  template: `
    <section class="cart">
      <h2>Carrello</h2>
      <p>2 articoli · 49,90 €</p>
      <button class="checkout" (click)="checkout()">Vai al pagamento</button>
    </section>
  `,
  styles: `
    .cart { padding: 13px; border: 1px solid #ddd; border-radius: 6px; }
    .checkout { background: #e11d48; color: white; padding: 8px 16px; }
  `,
})
export class Cart {
  checkout() {}
}
