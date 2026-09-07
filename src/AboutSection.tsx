// AboutSection.tsx
export function AboutSection() {
  return (
    <>
      <h2>Was ist das?</h2>
      <p>
        Der Know-how-Computer oder{" "}
        <a href="https://web.archive.org/web/20010331082121/http://www.wdrcc.de/khc.phtml">
          WDR-Papiercomputer
        </a>{" "}
        besteht aus bedrucktem Papier. Er hat einen "Programmspeicher" in den man
        schriftlich ein Programm in einer fiktiven Assemblersprache aus nur fünf
        Befehlen eintragen kann.
      </p>
      <p>
        Zur Ausführung des Programms verwendet man einen Kugelschreiber als
        Programmzeiger und Streichhölzer in "Registern" auf dem Papier um die
        aktuellen Werte darzustellen.
      </p>
      <p>
        Mit diesem Spielzeug kann man programmiererisch denken lernen, ohne
        einen elektronischen Computer zur Verfügung zu haben. Somit diente
        dieser "Computer" als pädagogische Hilfe im Bereich der Informatik.
      </p>
      <p>
        Der Computer wurde von Wolfgang Back und Ulrich Rohde entwickelt und in
        der Fernsehsendung WDR Computerclub im Jahre 1983 erstmals vorgestellt.
        Eine abgeleitete Version des Papier-Computers wird als{" "}
        <a href="https://web.archive.org/web/20140523212937/http://edunet-namibia.org/?page_id=293">
          Know How Computer
        </a>{" "}
        in Namibia im Schulunterricht verwendet.
      </p>
      <p>
        <a href="/occ_know_how.jpg" target="_blank" rel="noreferrer">
          <img
            src="/occ_know_how.jpg"            
            alt="Der originale WDR Know-how-Computer aus Papier"
            className="about-image"
          />
        </a>
      </p>
      <p>
        Diese Seite nimmt das Konzept und stellt es vollkommen auf den Kopf.
        Unter Verwendung von modernen Rechnern mit graphischen Displays führen
        wir ein Programm in einer Umgebung aus, die dutzende von Schichten
        entfernt vom Assembler der zugrundeliegenden CPU ist. Mit diesen
        Mitteln stellen wir den Papiercomputer dar und erlauben die
        automatische Ausführung der mechanischen Schritte. Dabei erhalten wir
        die Optik von Papier-Layout, Kugelschreiber und Streichholz-Registern.
      </p>

      <h2>Architektur und Sprache</h2>
      <p>
        Der Papiercomputer (im Folgenden "PC" genannt) verfügt über einen
        konzeptionell unbegrenzt großen Programmspeicher, danke Alan. Die
        Zellen des Programmspeichers sind von 0..n durchnumeriert und jede
        Zelle nimmt genau einen Befehl in der PC-Assemblersprache auf.
      </p>
      <p>
        Ein Programmablauf beginnt immer an der Adresse 0. Die Registerinhalte
        werden beim Reset nicht verändert, man kann sie also zur Eingabe von
        Daten verwenden. Man darf aber auch nicht voraussetzen, daß sie
        irgendwie initialisiert wären. Der PC hat kein RAM, zur Speicherung
        stehen nur die Register zur Verfügung.
      </p>
      <p>PC-Assembler besteht aus genau fünf Befehlen:</p>
      <table>
        <thead>
          <tr>
            <th>Mnemonic</th>
            <th>Befehl</th>
            <th>Erklärung</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span className="code">jmp&nbsp;[addr]</span></td>
            <td>Jump&nbsp;to&nbsp;address</td>
            <td>Setzt den Programmzeiger auf die angegebene Adresse.</td>
          </tr>
          <tr>
            <td><span className="code">isz&nbsp;[register]</span></td>
            <td>Is&nbsp;zero</td>
            <td>
              Prüft den Inhalt des angegebenen Registers auf Null. Enthält es
              Null wird der Programmzeiger um zwei erhöht, sonst nur um eins.
              Bei einer Null wird also der folgende Befehl übersprungen.
            </td>
          </tr>
          <tr>
            <td><span className="code">inc&nbsp;[register]</span></td>
            <td>Increment</td>
            <td>
              Erhöht das angegebene Register um eins und den Programmzeiger um
              eins.
            </td>
          </tr>
          <tr>
            <td><span className="code">dec&nbsp;[register]</span></td>
            <td>Decrement</td>
            <td>
              Verringert das angebene Register um eins und erhöht den
              Programmzeiger um eins. Weil in einem Register nicht weniger als
              Null Streichhölzer liegen können, wird der Wert dann unverändert
              gelassen.
            </td>
          </tr>
          <tr>
            <td><span className="code">stp</span></td>
            <td>Stop</td>
            <td>Hält den Papiercomputer an. Das Programm ist beendet.</td>
          </tr>
        </tbody>
      </table>

      <h2>Programmierung</h2>
      <p>
        Der PC kann direkt in seinem Programmspeicher programmiert werden.
        Dazu gibt man die Befehle einfach direkt in die Zellen ein während der
        PC steht. Auf diese Weise kann man sogar ein Programm während des
        Betriebs verändern, wenn man den PC so lange anhält. Davon wird aber
        abgeraten...
      </p>

      <h2>Bedienung</h2>
      <p>
        Der PC hat Schaltflächen mit denen man ihn einen einzelnen Schritt
        ausführen oder das Programm automatisch bis zum Ende oder einem
        Fehler ablaufen lassen kann.
      </p>
      <p>
        Er zeigt seinen aktuellen Status in Form der Kugelschreiber-Position
        am Programmspeicher und der Streichhölzer in den Registern an. Wenn er
        wegen eines Fehlers oder einer <span className="code">stp</span>
        -Anweisung anhält zeigt er dies in einem Statusdisplay an.
      </p>
      <p>
        Wird als Schrittzeit 0 eingegeben und Run geklickt, so läuft der PC so
        schnell er kann.
      </p>
      <p>
        Die Reset-Taste setzt den PC zurück, so daß als nächstes der Befehl an
        Programmspeicher-Position 0 ausgeführt wird. Programmspeicher und
        Registerinhalte bleiben dabei unangetastet.
      </p>

      <h2>Der Computer</h2>
    </>
  );
}