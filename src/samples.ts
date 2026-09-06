export interface Sample {
  name: string;
  source: string;
}

export const SAMPLES: Sample[] = [
  {
    name: "Register A nullen",
    source: `; Dieses Programm nullt das Register A

whileA: isz A ; Ist A=0?
jmp decA      ; Nein, weiter bei decA
jmp done      ; Ja, Sprung zum Ende
decA: dec A   ; A um eins verringern
jmp whileA    ; Sprung zum Anfang, wieder testen.

done:
stp           ; Fertig.`,
  },
  {
    name: "Register A nach Register B kopieren",
    source: `; Dieses Programm kopiert das Register A nach B
; Es benutzt dabei das Register X und zerstört den Wert, der
; dort gespeichert sein könnte.

; Zuerst wird B ausgenullt.
whileB: isz B ; Ist B=0?
jmp decB      ; Nein, weiter bei decB
jmp clearX    ; Ja, Sprung zum nächsten Abschnitt
decB: dec B   ; B um eins verringern
jmp whileB    ; Sprung zum Anfang, wieder testen.

; Dann wird das temporär genutzte Register
; X genullt.
clearX:
isz X
jmp decX
jmp processA
decX:
dec X
jmp clearX

; Wir kopieren den Wert aus A nach X und C
processA:
isz A
jmp inc
jmp restoreA
inc:
dec A
inc B
inc X
jmp processA

; Wir restaurieren den Wert in A aus X.
restoreA:
isz X
jmp incA
jmp done
incA:
inc A
dec X
jmp restoreA

done:
stp           ; Fertig.`,
  },
  {
    name: "C=A+B",
    source: `; Dieses Programm addiert die Werte in Register A und B und
; speichert das Ergebnis in Register C. Es benutzt dabei das Register X
; und zerstört den Wert, der dort gespeichert sein könnte.

; Im ersten Schritt wird das Zielregister C ausgenullt.
clearC:
isz C
jmp decC
jmp clearX
decC:
dec C
jmp clearC

; Dann wird X genullt.
clearX:
isz X
jmp decX
jmp processA
decX:
dec X
jmp clearX

; Wir kopieren den Wert aus A nach X und C
processA:
isz A
jmp inc
jmp restoreA
inc:
dec A
inc X
inc C
jmp processA

; Jetzt steht A in X und C, aber A=0
; Wir restaurieren den Wert in A aus X.
restoreA:
isz X
jmp incA
jmp processB
incA:
inc A
dec X
jmp restoreA

; Jetzt kopieren wir den Wert aus B nach X und C
; X ist 0, wird also wieder eine Sicherheitskopie.
; Und in C steht nachher die Summe.
processB:
isz B
jmp inc2
jmp restoreB
inc2:
dec B
inc X
inc C
jmp processB

; Wir restaurieren den Wert in B aus X.
restoreB:
isz X
jmp incB
jmp done
incB:
inc B
dec X
jmp restoreB

; Fertig.
done: stp;`,
  },
  {
    name: "C=A-B",
    source: `; Dieses Programm berechnet die Differenz von A und B und
; speichert sie in Register C. Ist B größer als A, so ist
; das Ergebnis 0. Es benutzt dabei das Register X
; und zerstört den Wert, der dort gespeichert sein könnte.

; Im ersten Schritt wird das Zielregister C ausgenullt.
clearC:
isz C
jmp decC
jmp clearX
decC:
dec C
jmp clearC

; Dann wird X genullt.
clearX:
isz X
jmp decX
jmp processA
decX:
dec X
jmp clearX

; Wir kopieren den Wert aus A nach X und C
processA:
isz A
jmp inc
jmp restoreA
inc:
dec A
inc X
inc C
jmp processA

; Jetzt steht A in X und C, aber A=0
; Wir restaurieren den Wert in A aus X.
restoreA:
isz X
jmp incA
jmp processB
incA:
inc A
dec X
jmp restoreA

; Jetzt kopieren wir den Wert aus B nach X und
; verringern dabei C. X startet bei 0, wird also
; wieder eine Sicherheitskopie. Und in C steht
; nachher die Differenz.
processB:
isz B
jmp checkC
jmp restoreB
checkC:
isz C
jmp dec
jmp restoreB
dec:
dec B
inc X
dec C
jmp processB

; Wir restaurieren den Wert in B aus X.
restoreB:
isz X
jmp incB
jmp done
incB:
inc B
dec X
jmp restoreB

; Fertig.
done: stp;`,
  },
];