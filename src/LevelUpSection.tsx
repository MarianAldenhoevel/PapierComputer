// Mehr beschreibender Text.
export function LevelUpSection() {
  return (
    <>
      <h2>Level Up</h2>
      <p>
        Der virtuelle Papiercomputer kann eine Ebene höher als der
        Papier-Papiercomputer programmiert werden. Er verfügt nämlich über
        einen Assembler (das Programm, nicht die Sprache).
      </p>
      <p>
        Eingabe für den Assembler ist Text in seinem Eingabefeld, die Ausgabe
        erfolgt direkt in den Programmspeicher des PC. Zusätzlich zu den fünf
        PC-Assemblerbefehlen kann das Assemblerprogramm auch noch folgende
        Konstrukte verstehen und "übersetzen":
      </p>
      <table>
        <thead>
          <tr>
            <th>Konstrukt</th>
            <th>Funktion</th>
            <th>Erklärung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Leerzeilen</td>
            <td>No&nbsp;Operation</td>
            <td>
              Leerzeilen im Text werden vom Assemblerprogramm einfach
              ignoriert. Man kann sie also verwenden um den Programmtext in
              Abschnitte zu gliedern.
            </td>
          </tr>
          <tr>
            <td><span className="code">;[kommentar]</span></td>
            <td>Kommentar</td>
            <td>
              Text von einem Semikolon bis zum Ende der Zeile ist ein
              Kommentar und wird vom Assemblerprogramm ignoriert. Wenn die
              Zeile ausschließlich aus Kommentar besteht, siehe Leerzeile.
            </td>
          </tr>
          <tr>
            <td><span className="code">[label]:</span></td>
            <td>Label</td>
            <td>
              Weil es schwierig ist, in einem Programm mit Leerzeilen und
              Kommentaren Sprungziele als Adressen anzugeben, kann das
              Assemblerprogramm symbolische Namen durch die richtigen
              Adressen ersetzen.
              <br />
              Ein solches Label wird am Anfang einer Zeile deklariert und kann
              dann anstelle einer numerischen Adresse in{" "}
              <span className="code">jmp</span>-Befehlen verwendet werden.
              Labelnamen sind Worte ohne Leerzeichen die nicht mit einem
              Registernamen oder einer Zahl verwechselt werden können.
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}