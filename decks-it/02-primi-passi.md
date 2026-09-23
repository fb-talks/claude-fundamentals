---
marp: true
title: Primi passi
section: Primi passi
---

# Primi passi

Il primo prompt, il diff, il piano

---

## Il primo prompt

```text
Apri @src/App.tsx: togli tutto il contenuto di esempio di Vite — i due loghi,
il contatore, lo stato, i link — e lascia solo un <h1>Hello Workshop</h1>.

Togli gli import e le regole CSS che restano inutilizzati.
Non toccare src/main.tsx.
```

- **`@file`** dice a Claude *quale* file guardare, invece di lasciarglielo cercare
- chiedere di **togliere** codice è un ottimo primo test
- nota l'ultima riga: un divieto **scritto nel prompt**. Ci torniamo fra poco

Note: "Non toccare src/main.tsx" è il gancio per il CLAUDE.md. Se domani chiedi un'altra cosa, quel divieto va riscritto. È esattamente il problema che risolve il passo dopo.

---

## Guarda lo schermo, non aspettare

Mentre Claude lavora vedi tre cose:

1. **quali file apre**: dovrebbero essere quelli che ti aspetti, e nient'altro
2. **il diff che propone**, rosso e verde, prima di scrivere
3. **la richiesta di conferma**, che accetti o rifiuti

<div class="box">

Se propone di toccare file che non c'entrano, **di' di no**. Non è un incidente raro: è il motivo per cui il diff te lo fa vedere prima.

</div>

---

## L'abitudine che vale tutto il resto

```bash
git diff --stat        # quanti file, quante righe
git diff               # il diff completo
git status --short -u  # anche i file NUOVI, che git diff non vede
```

> Claude sbaglia come sbaglia un collega veloce: **raramente, e mai dove guardi**.
> Il `git diff` costa cinque secondi.

Poi `git commit`. Ogni passo si chiude con un commit: è il punto da cui ripartire, e il riferimento per misurare cosa cambia dopo.

Note: git diff mostra solo i file che git conosce già. Quando Claude crea file nuovi serve git status. È un errore frequente: "non ha fatto niente" e invece ha creato tre file.

---

## Plan mode: pensare prima di scrivere

Una modalità in cui Claude **non tocca niente**: legge, ragiona, propone un piano. Approvi tu, e solo allora scrive.

<div class="cols">
<div class="col">

**Come si entra**

- `shift+tab` finché compare *plan mode*
- oppure `/plan`

</div>
<div class="col">

**Prova con la stessa richiesta**

> Aggiungi un sistema di temi alla libreria, chiaro e scuro.

Prima **senza** piano, poi **con**. Confronta.

</div>
</div>

Note: nell'esercizio si lascia partire senza piano, lo si ferma con Esc, si butta tutto con git checkout . && git clean -fd, e si rifà in plan mode. Il confronto è l'esercizio: cosa aveva capito, cosa aveva deciso da solo.

---

## Quando serve davvero

**Non sempre.** Per aggiungere un `Badge` è tempo perso.

Serve quando:

- la modifica **tocca più file**
- non sei sicuro di **aver spiegato bene** cosa vuoi
- vuoi **ragionare** insieme: pro e contro, rischi, alternative

<div class="box">

Il piano è il posto più economico dove scoprire che vi eravate capiti male: cambiarlo costa **una frase**, cambiare il codice costa **mezz'ora**.

</div>
