import { Container, Typography, Box, Paper } from '@mui/material'
import Footer from '../components/Footer'

const Datenschutz = () => {
  return (
    <Box>
      <Container maxWidth="md" sx={{ py: 8, mt: 8 }}>
        <Paper
        elevation={3}
        sx={{
          p: { xs: 3, md: 6 },
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: 2,
          color: '#000000',
          '& *': { color: '#000000 !important' }
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            color: '#000000',
            fontWeight: 'bold',
            mb: 4
          }}
        >
          Datenschutzerklärung
        </Typography>

        <Box sx={{ '& > *': { mb: 3 } }}>
          <Box>
            <Typography variant="body1" paragraph>
              Verantwortliche Stelle im Sinne der Datenschutzgesetze, insbesondere der EU-Datenschutzgrundverordnung (DSGVO), ist:<br />
              avec plaisir GmbH
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: '#000000' }}>
              Kontaktadressen
            </Typography>
            <Typography variant="body1" paragraph>
              avec plaisir GmbH<br />
              Aemtlerstrsse 205<br />
              8003 Zürich<br />
              +41 44 492 21 18<br />
              info@avecplaisir-zuerich.ch
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: '#000000' }}>
              Allgemeiner Hinweis
            </Typography>
            <Typography variant="body1" paragraph>
              Gestützt auf Artikel 13 der schweizerischen Bundesverfassung und den datenschutzrechtlichen Bestimmungen des Bundes (Datenschutzgesetz, DSG) hat jede Person Anspruch auf Schutz ihrer Privatsphäre sowie auf Schutz vor Missbrauch ihrer persönlichen Daten. Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </Typography>
            <Typography variant="body1" paragraph>
              In Zusammenarbeit mit unseren Hosting-Providern bemühen wir uns, die Datenbanken so gut wie möglich vor fremden Zugriffen, Verlusten, Missbrauch oder vor Fälschung zu schützen.
            </Typography>
            <Typography variant="body1" paragraph>
              Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.
            </Typography>
            <Typography variant="body1" paragraph>
              Durch die Nutzung dieser Website erklären Sie sich mit der Erhebung, Verarbeitung und Nutzung von Daten gemäss der nachfolgenden Beschreibung einverstanden. Diese Website kann grundsätzlich ohne Registrierung besucht werden. Dabei werden Daten wie beispielsweise aufgerufene Seiten bzw. Namen der abgerufenen Datei, Datum und Uhrzeit zu statistischen Zwecken auf dem Server gespeichert, ohne dass diese Daten unmittelbar auf Ihre Person bezogen werden. Personenbezogene Daten, insbesondere Name, Adresse oder E-Mail-Adresse werden soweit möglich auf freiwilliger Basis erhoben. Ohne Ihre Einwilligung erfolgt keine Weitergabe der Daten an Dritte.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: '#000000' }}>
              Bearbeitung von Personendaten
            </Typography>
            <Typography variant="body1" paragraph>
              Personendaten sind alle Angaben, die sich auf eine bestimmte oder bestimmbare Person beziehen. Eine betroffene Person ist eine Person, über die Personendaten bearbeitet werden. Bearbeiten umfasst jeden Umgang mit Personendaten, unabhängig von den angewandten Mitteln und Verfahren, insbesondere das Aufbewahren, Bekanntgeben, Beschaffen, Löschen, Speichern, Verändern, Vernichten und Verwenden von Personendaten.
            </Typography>
            <Typography variant="body1" paragraph>
              Wir bearbeiten Personendaten im Einklang mit dem schweizerischen Datenschutzrecht. Im Übrigen bearbeiten wir – soweit und sofern die EU-DSGVO anwendbar ist – Personendaten gemäss folgenden Rechtsgrundlagen im Zusammenhang mit Art. 6 Abs. 1 DSGVO:
            </Typography>
            <Typography variant="body1" paragraph>
              Einwilligung (Art. 6 Abs. 1 S. 1 lit. a. DSGVO) – Die betroffene Person hat ihre Einwilligung in die Verarbeitung der sie betreffenden personenbezogenen Daten für einen spezifischen Zweck oder mehrere bestimmte Zwecke gegeben.
            </Typography>
            <Typography variant="body1" paragraph>
              Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1 S. 1 lit. b. DSGVO) – Die Verarbeitung ist für die Erfüllung eines Vertrags, dessen Vertragspartei die betroffene Person ist, oder zur Durchführung vorvertraglicher Massnahmen erforderlich, die auf Anfrage der betroffenen Person erfolgen.
            </Typography>
            <Typography variant="body1" paragraph>
              Rechtliche Verpflichtung (Art. 6 Abs. 1 S. 1 lit. c. DSGVO) – Die Verarbeitung ist zur Erfüllung einer rechtlichen Verpflichtung erforderlich, der der Verantwortliche unterliegt.
            </Typography>
            <Typography variant="body1" paragraph>
              Schutz lebenswichtiger Interessen (Art. 6 Abs. 1 S. 1 lit. d. DSGVO) – Die Verarbeitung ist erforderlich, um lebenswichtige Interessen der betroffenen Person oder einer anderen natürlichen Person zu schützen.
            </Typography>
            <Typography variant="body1" paragraph>
              Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f. DSGVO) – Die Verarbeitung ist zur Wahrung der berechtigten Interessen des Verantwortlichen oder eines Dritten erforderlich, sofern nicht die Interessen oder Grundrechte und Grundfreiheiten der betroffenen Person, die den Schutz personenbezogener Daten erfordern, überwiegen.
            </Typography>
            <Typography variant="body1" paragraph>
              Wir bearbeiten Personendaten für jene Dauer, die für den jeweiligen Zweck oder die jeweiligen Zwecke erforderlich ist. Bei länger dauernden Aufbewahrungspflichten aufgrund von gesetzlichen und sonstigen Pflichten, denen wir unterliegen, schränken wir die Bearbeitung entsprechend ein.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: '#000000' }}>
              Massgebliche Rechtsgrundlagen
            </Typography>
            <Typography variant="body1" paragraph>
              Nach Massgabe des Art. 13 DSGVO teilen wir Ihnen die Rechtsgrundlagen unserer Datenverarbeitungen mit. Sofern die Rechtsgrundlage in der Datenschutzerklärung nicht genannt wird, gilt Folgendes: Die Rechtsgrundlage für die Einholung von Einwilligungen ist Art. 6 Abs. 1 lit. a und Art. 7 DSGVO, die Rechtsgrundlage für die Verarbeitung zur Erfüllung unserer Leistungen und Durchführung vertraglicher Massnahmen sowie Beantwortung von Anfragen ist Art. 6 Abs. 1 lit. b DSGVO, die Rechtsgrundlage für die Verarbeitung zur Erfüllung unserer rechtlichen Verpflichtungen ist Art. 6 Abs. 1 lit. c DSGVO, und die Rechtsgrundlage für die Verarbeitung zur Wahrung unserer berechtigten Interessen ist Art. 6 Abs. 1 lit. f DSGVO. Für den Fall, dass lebenswichtige Interessen der betroffenen Person oder einer anderen natürlichen Person eine Verarbeitung personenbezogener Daten erforderlich machen, dient Art. 6 Abs. 1 lit. d DSGVO als Rechtsgrundlage.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: '#000000' }}>
              Sicherheitsmassnahmen
            </Typography>
            <Typography variant="body1" paragraph>
              Wir treffen nach Massgabe der gesetzlichen Vorgaben unter Berücksichtigung des Stands der Technik, der Implementierungskosten und der Art, des Umfangs, der Umstände und der Zwecke der Verarbeitung sowie der unterschiedlichen Eintrittswahrscheinlichkeiten und des Ausmasses der Bedrohung der Rechte und Freiheiten natürlicher Personen geeignete technische und organisatorische Massnahmen, um ein dem Risiko angemessenes Schutzniveau zu gewährleisten.
            </Typography>
            <Typography variant="body1" paragraph>
              Zu den Massnahmen gehören insbesondere die Sicherung der Vertraulichkeit, Integrität und Verfügbarkeit von Daten durch Kontrolle des physischen und elektronischen Zugangs zu den Daten als auch des sie betreffenden Zugriffs, der Eingabe, der Weitergabe, der Sicherung der Verfügbarkeit und ihrer Trennung. Des Weiteren haben wir Verfahren eingerichtet, die eine Wahrnehmung von Betroffenenrechten, die Löschung von Daten und Reaktionen auf die Gefährdung der Daten gewährleisten. Ferner berücksichtigen wir den Schutz personenbezogener Daten bereits bei der Entwicklung bzw. Auswahl von Hardware, Software sowie Verfahren entsprechend dem Prinzip des Datenschutzes, durch Technikgestaltung und durch datenschutzfreundliche Voreinstellungen.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: '#000000' }}>
              Übermittlung von personenbezogenen Daten
            </Typography>
            <Typography variant="body1" paragraph>
              Im Rahmen unserer Verarbeitung von personenbezogenen Daten kommt es vor, dass die Daten an andere Stellen, Unternehmen, rechtlich selbstständige Organisationseinheiten oder Personen übermittelt oder sie ihnen gegenüber offengelegt werden. Zu den Empfängern dieser Daten können z.B. mit IT-Aufgaben beauftragte Dienstleister oder Anbieter von Diensten und Inhalten, die in eine Webseite eingebunden werden, gehören. In solchen Fall beachten wir die gesetzlichen Vorgaben und schliessen insbesondere entsprechende Verträge bzw. Vereinbarungen, die dem Schutz Ihrer Daten dienen, mit den Empfängern Ihrer Daten ab.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: '#000000' }}>
              Datenverarbeitung in Drittländern
            </Typography>
            <Typography variant="body1" paragraph>
              Sofern wir Daten in einem Drittland (d.h., ausserhalb der Europäischen Union (EU), des Europäischen Wirtschaftsraums (EWR)) verarbeiten oder die Verarbeitung im Rahmen der Inanspruchnahme von Diensten Dritter oder der Offenlegung bzw. Übermittlung von Daten an andere Personen, Stellen oder Unternehmen stattfindet, erfolgt dies nur im Einklang mit den gesetzlichen Vorgaben.
            </Typography>
            <Typography variant="body1" paragraph>
              Vorbehaltlich ausdrücklicher Einwilligung oder vertraglich oder gesetzlich erforderlicher Übermittlung, verarbeiten wir die Daten nur in Drittländern mit einem anerkannten Datenschutzniveau, vertraglicher Verpflichtung durch sogenannte Standardschutzklauseln der EU-Kommission, beim Vorliegen von Zertifizierungen oder verbindlichen internen Datenschutzvorschriften (Art. 44 bis 49 DSGVO, Informationsseite der EU-Kommission: https://ec.europa.eu/info/law/law-topic/data-protection/international-dimension-data-protection_de).
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: '#000000' }}>
              Datenschutzerklärung für Cookies
            </Typography>
            <Typography variant="body1" paragraph>
              Diese Website verwendet Cookies. Cookies sind Textdateien, die Daten von besuchten Websites oder Domains enthalten und von einem Browser auf dem Computer des Benutzers gespeichert werden. Ein Cookie dient in erster Linie dazu, die Informationen über einen Benutzer während oder nach seinem Besuch innerhalb eines Onlineangebotes zu speichern. Zu den gespeicherten Angaben können z.B. die Spracheinstellungen auf einer Webseite, der Loginstatus, ein Warenkorb oder die Stelle, an der ein Video geschaut wurde, gehören. Zu dem Begriff der Cookies zählen wir ferner andere Technologien, die die gleichen Funktionen wie Cookies erfüllen (z.B. wenn Angaben der Nutzer anhand pseudonymer Onlinekennzeichnungen gespeichert werden, auch als „Nutzer-IDs" bezeichnet)
            </Typography>
            <Typography variant="body1" paragraph>
              Die folgenden Cookie-Typen und Funktionen werden unterschieden:
            </Typography>
            <Typography variant="body1" paragraph>
              Temporäre Cookies (auch: Session- oder Sitzungs-Cookies): Temporäre Cookies werden spätestens gelöscht, nachdem ein Nutzer ein Online-Angebot verlassen und seinen Browser geschlossen hat.
            </Typography>
            <Typography variant="body1" paragraph>
              Permanente Cookies: Permanente Cookies bleiben auch nach dem Schliessen des Browsers gespeichert. So kann beispielsweise der Login-Status gespeichert oder bevorzugte Inhalte direkt angezeigt werden, wenn der Nutzer eine Website erneut besucht. Ebenso können die Interessen von Nutzern, die zur Reichweitenmessung oder zu Marketingzwecken verwendet werden, in einem solchen Cookie gespeichert werden.
            </Typography>
            <Typography variant="body1" paragraph>
              First-Party-Cookies: First-Party-Cookies werden von uns selbst gesetzt.
            </Typography>
            <Typography variant="body1" paragraph>
              Third-Party-Cookies (auch: Drittanbieter-Cookies): Drittanbieter-Cookies werden hauptsächlich von Werbetreibenden (sog. Dritten) verwendet, um Benutzerinformationen zu verarbeiten.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: '#000000' }}>
              Datenschutzerklärung für SSL-/TLS-Verschlüsselung
            </Typography>
            <Typography variant="body1" paragraph>
              Diese Website nutzt aus Gründen der Sicherheit und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel der Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL-/TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
            </Typography>
            <Typography variant="body1" paragraph>
              Wenn die SSL bzw. TLS Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: '#000000' }}>
              Datenschutzerklärung für Server-Log-Files
            </Typography>
            <Typography variant="body1" paragraph>
              Der Provider dieser Website erhebt und speichert automatisch Informationen in sogenannten Server-Log Files, die Ihr Browser automatisch an uns übermittelt. Dies sind:
            </Typography>
            <Typography variant="body1" paragraph>
              Browsertyp und Browserversion
            </Typography>
            <Typography variant="body1" paragraph>
              verwendetes Betriebssystem
            </Typography>
            <Typography variant="body1" paragraph>
              Referrer URL
            </Typography>
            <Typography variant="body1" paragraph>
              Hostname des zugreifenden Rechners
            </Typography>
            <Typography variant="body1" paragraph>
              Uhrzeit der Serveranfrage
            </Typography>
            <Typography variant="body1" paragraph>
              Diese Daten sind nicht bestimmten Personen zuordenbar. Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Wir behalten uns vor, diese Daten nachträglich zu prüfen, wenn uns konkrete Anhaltspunkte für eine rechtswidrige Nutzung bekannt werden.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: '#000000' }}>
              Dienste von Dritten
            </Typography>
            <Typography variant="body1" paragraph>
              Diese Website verwenden allenfalls Google Maps für das Einbetten von Karten, Google Invisible reCAPTCHA für den Schutz gegen Bots und Spam sowie YouTube für das Einbetten von Videos.
            </Typography>
            <Typography variant="body1" paragraph>
              Diese Dienste der amerikanischen Google LLC verwenden unter anderem Cookies und infolgedessen werden Daten an Google in den USA übertragen, wobei wir davon ausgehen, dass in diesem Rahmen kein personenbezogenes Tracking allein durch die Nutzung unserer Website stattfindet.
            </Typography>
            <Typography variant="body1" paragraph>
              Google hat sich verpflichtet, einen angemessenen Datenschutz gemäss dem amerikanisch-europäischen und dem amerikanisch-schweizerischen Privacy Shield zu gewährleisten.
            </Typography>
            <Typography variant="body1" paragraph>
              Weitere Informationen finden sich in der Datenschutzerklärung von Google.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: '#000000' }}>
              Datenschutzerklärung für Kontaktformular
            </Typography>
            <Typography variant="body1" paragraph>
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: '#000000' }}>
              Datenschutzerklärung für Newsletter Daten
            </Typography>
            <Typography variant="body1" paragraph>
              Wenn Sie den auf dieser Website angebotenen Newsletter beziehen möchten, benötigen wir von Ihnen eine E-Mail-Adresse sowie Informationen, welche uns die Überprüfung gestatten, dass Sie der Inhaber der angegebenen E-Mail-Adresse sind und mit dem Empfang des Newsletters einverstanden sind. Weitere Daten werden nicht erhoben. Diese Daten verwenden wir ausschliesslich für den Versand der angeforderten Informationen und geben sie nicht an Dritte weiter.
            </Typography>
            <Typography variant="body1" paragraph>
              Die erteilte Einwilligung zur Speicherung der Daten, der E-Mail-Adresse sowie deren Nutzung zum Versand des Newsletters können Sie jederzeit widerrufen, etwa über den «Austragen-Link» im Newsletter.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: '#000000' }}>
              Rechte betroffener Personen
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ color: '#000000', mt: 2 }}>
              Recht auf Bestätigung
            </Typography>
            <Typography variant="body1" paragraph>
              Jede betroffene Person hat das Recht, vom Betreiber der Website eine Bestätigung darüber zu verlangen, ob betroffene Personen betreffende, personenbezogene Daten verarbeitet werden. Möchten Sie dieses Bestätigungsrecht in Anspruch nehmen, können Sie sich hierzu jederzeit an den Datenschutzbeauftragten wenden.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ color: '#000000', mt: 2 }}>
              Recht auf Auskunft
            </Typography>
            <Typography variant="body1" paragraph>
              Jede von der Verarbeitung betroffene Person mit personenbezogenen Daten hat das Recht, jederzeit vom Betreiber dieser Website unentgeltliche Auskunft über die zu ihrer Person gespeicherten personenbezogenen Daten und eine Kopie dieser Auskunft zu erhalten.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ color: '#000000', mt: 2 }}>
              Recht auf Berichtigung
            </Typography>
            <Typography variant="body1" paragraph>
              Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das Recht, die unverzügliche Berichtigung sie betreffender unrichtiger personenbezogener Daten zu verlangen.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ color: '#000000', mt: 2 }}>
              Recht auf Löschung (Recht auf Vergessen werden)
            </Typography>
            <Typography variant="body1" paragraph>
              Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das Recht, von dem Verantwortlichen dieser Website zu verlangen, dass die sie betreffenden personenbezogenen Daten unverzüglich gelöscht werden, sofern einer der folgenden Gründe zutrifft und soweit die Verarbeitung nicht erforderlich ist.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ color: '#000000', mt: 2 }}>
              Recht auf Einschränkung der Verarbeitung
            </Typography>
            <Typography variant="body1" paragraph>
              Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das Recht, von dem Verantwortlichen dieser Website die Einschränkung der Verarbeitung zu verlangen, wenn eine der gesetzlichen Voraussetzungen gegeben ist.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ color: '#000000', mt: 2 }}>
              Recht auf Datenübertragbarkeit
            </Typography>
            <Typography variant="body1" paragraph>
              Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das Recht, die sie betreffenden personenbezogenen Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ color: '#000000', mt: 2 }}>
              Recht auf Widerspruch
            </Typography>
            <Typography variant="body1" paragraph>
              Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das Recht, aus Gründen, die sich aus ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung sie betreffender personenbezogener Daten, Widerspruch einzulegen.
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ color: '#000000', mt: 2 }}>
              Recht auf Widerruf einer datenschutzrechtlichen Einwilligung
            </Typography>
            <Typography variant="body1" paragraph>
              Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das Recht, eine abgegebene Einwilligung zur Verarbeitung personenbezogener Daten jederzeit zu widerrufen.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: '#000000' }}>
              Datenschutzerklärung für Widerspruch Werbe-Mails
            </Typography>
            <Typography variant="body1" paragraph>
              Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-E-Mails, vor.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: '#000000' }}>
              Kostenpflichtige Leistungen
            </Typography>
            <Typography variant="body1" paragraph>
              Zur Erbringung kostenpflichtiger Leistungen werden von uns zusätzliche Daten erfragt, wie z.B. Zahlungsangaben, um Ihre Bestellung resp. Ihren Auftrag ausführen zu können. Wir speichern diese Daten in unseren Systemen oder Systemen Dritter, bis die gesetzlichen Aufbewahrungsfristen abgelaufen sind.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: '#000000' }}>
              Verwendung von Google Maps
            </Typography>
            <Typography variant="body1" paragraph>
              Diese Website nutzt das Angebot von Google Maps. Dadurch können wir Ihnen interaktive Karten direkt in der Website anzeigen und ermöglichen Ihnen die komfortable Nutzung der Karten-Funktion. Durch den Besuch auf der Website erhält Google die Information, dass Sie die entsprechende Unterseite unserer Website aufgerufen haben. Dies erfolgt unabhängig davon, ob Google ein Nutzerkonto bereitstellt, über das Sie eingeloggt sind, oder ob kein Nutzerkonto besteht. Wenn Sie bei Google eingeloggt sind, werden Ihre Daten direkt Ihrem Konto zugeordnet. Wenn Sie die Zuordnung mit Ihrem Profil bei Google nicht wünschen, müssen Sie sich vor Aktivierung des Buttons ausloggen. Google speichert Ihre Daten als Nutzungsprofile und nutzt sie für Zwecke der Werbung, Marktforschung und/oder bedarfsgerechten Gestaltung seiner Website. Ihnen steht ein Widerspruchsrecht zu gegen die Bildung dieser Nutzerprofile, wobei Sie sich zur Ausübung dessen an Google richten müssen. Weitere Informationen zu Zweck und Umfang der Datenerhebung und ihrer Verarbeitung durch Google erhalten Sie unter: www.google.de/intl/de/policies/privacy.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: '#000000' }}>
              Google Ads
            </Typography>
            <Typography variant="body1" paragraph>
              Diese Website nutzt das Google Conversion-Tracking. Sind Sie über eine von Google geschaltete Anzeige auf unsere WebSite gelangt, wird von Google Ads ein Cookie auf Ihrem Rechner gesetzt. Das Cookie für Conversion-Tracking wird gesetzt, wenn ein Nutzer auf eine von Google geschaltete Anzeige klickt. Diese Cookies verlieren nach 30 Tagen ihre Gültigkeit und dienen nicht der persönlichen Identifizierung. Besucht der Nutzer bestimmte Seiten unserer Website und das Cookie ist noch nicht abgelaufen, können wir und Google erkennen, dass der Nutzer auf die Anzeige geklickt hat und zu dieser Seite weitergeleitet wurde.
            </Typography>
            <Typography variant="body1" paragraph>
              Möchten Sie nicht am Tracking teilnehmen, können Sie das hierfür erforderliche Setzen eines Cookies ablehnen – etwa per Browser-Einstellung, die das automatische Setzen von Cookies generell deaktiviert oder Ihren Browser so einstellen, dass Cookies von der Domain «googleleadservices.com» blockiert werden.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: '#000000' }}>
              Verwendung von Google reCAPTCHA
            </Typography>
            <Typography variant="body1" paragraph>
              Wir nutzen «Google reCAPTCHA» (im Folgenden «reCAPTCHA») auf unseren Websites. Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland, nachfolgend «Google». Mit reCAPTCHA soll überprüft werden, ob die Dateneingabe auf unseren Websites (z. B. in einem Kontaktformular) durch einen Menschen oder durch ein automatisiertes Programm erfolgt. Hierzu analysiert reCAPTCHA das Verhalten des Websitebesuchers anhand verschiedener Merkmale. Diese Analyse beginnt automatisch, sobald der Websitebesucher die Website betritt. Die reCAPTCHA-Analysen laufen vollständig im Hintergrund. Websitebesucher werden nicht darauf hingewiesen, dass eine Analyse stattfindet.
            </Typography>
            <Typography variant="body1" paragraph>
              Die Datenverarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse daran, seine Webangebote vor missbräuchlicher automatisierter Ausspähung und vor SPAM zu schützen. Weitere Informationen zu Google reCAPTCHA sowie die Datenschutzerklärung von Google entnehmen Sie folgenden Links: https://www.google.com/intl/de/policies/privacy/ und https://policies.google.com/terms?hl=de.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: '#000000' }}>
              Datenschutzerklärung für Google Analytics
            </Typography>
            <Typography variant="body1" paragraph>
              Diese Website benutzt Google Analytics, einen Webanalysedienst der Google Ireland Limited. Über die gewonnenen Statistiken können wir unser Angebot verbessern und für Sie als Nutzer interessanter ausgestalten. Diese Website verwendet Google Analytics zudem für eine geräteübergreifende Analyse von Besucherströmen, die über eine User-ID durchgeführt wird. Sofern Sie über ein Google-Benutzerkonto verfügen, können Sie in den dortigen Einstellungen unter «Meine Daten», «persönliche Daten» die geräteübergreifende Analyse Ihrer Nutzung deaktivieren.
            </Typography>
            <Typography variant="body1" paragraph>
              Rechtsgrundlage für die Nutzung von Google Analytics ist Art. 6 Abs. 1 S. 1 lit. f DS-GVO. Die im Rahmen von Google Analytics von Ihrem Browser übermittelte IP-Adresse wird nicht mit anderen Daten von Google zusammengeführt. Wir weisen Sie darauf hin, dass auf dieser Website Google Analytics um den Code «_anonymizeIp();» erweitert wurde, um eine anonymisierte Erfassung von IP-Adressen zu gewährleisten. Dadurch werden IP-Adressen gekürzt weiterverarbeitet, eine Personenbeziehbarkeit kann damit ausgeschlossen werden.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: '#000000' }}>
              Datenschutzerklärung für Instagram
            </Typography>
            <Typography variant="body1" paragraph>
              Auf unserer Website sind Funktionen des Dienstes Instagram eingebunden. Diese Funktionen werden angeboten durch die Instagram Inc., 1601 Willow Road, Menlo Park, CA, 94025, USA integriert. Wenn Sie in Ihrem Instagram-Account eingeloggt sind können Sie durch Anklicken des Instagram-Buttons die Inhalte unserer Seiten mit Ihrem Instagram-Profil verlinken. Dadurch kann Instagram den Besuch unserer Seiten Ihrem Benutzerkonto zuordnen. Wir weisen darauf hin, dass wir als Anbieter der Seiten keine Kenntnis vom Inhalt der übermittelten Daten sowie deren Nutzung durch Instagram erhalten.
            </Typography>
            <Typography variant="body1" paragraph>
              Weitere Informationen hierzu finden Sie in der Datenschutzerklärung von Instagram: http://instagram.com/about/legal/privacy/
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: '#000000' }}>
              Externe Zahlungsdienstleister
            </Typography>
            <Typography variant="body1" paragraph>
              Diese Website setzt externe Zahlungsdienstleister ein, über deren Plattformen die Nutzer und wir Zahlungstransaktionen vornehmen können. Zum Beispiel über PostFinance, Visa, Mastercard, American Express, Paypal, Twint, und weitere.
            </Typography>
            <Typography variant="body1" paragraph>
              Im Rahmen der Erfüllung von Verträgen setzen wir die Zahlungsdienstleister auf Grundlage der schweizerischen Datenschutzverordnung sowie, soweit nötig, des Art. 6 Abs. 1 lit. b. EU-DSGVO ein. Im Übrigen setzen wir externe Zahlungsdienstleister auf Grundlage unserer berechtigten Interessen gemäß der schweizerischen Datenschutzverordnung sowie und soweit nötig, gem. Art. 6 Abs. 1 lit. f. EU-DSGVO ein, um unseren Nutzern eine effektive und sichere Zahlungsmöglichkeit zu bieten.
            </Typography>
            <Typography variant="body1" paragraph>
              Zu den durch die Zahlungsdienstleister verarbeiteten Daten gehören Bestandsdaten, wie z.B. der Name und die Adresse, Bankdaten, wie u.a. Kontonummern oder Kreditkartennummern, Passwörter, TANs und Prüfsummen sowie die Vertrags-, Summen und empfängerbezogenen Angaben. Die Angaben sind erforderlich, um die Transaktionen durchzuführen. Die eingegebenen Daten werden jedoch nur durch die Zahlungsdienstleister verarbeitet und bei diesen gespeichert. Wir als Betreiber erhalten keinerlei Informationen zu (Bank-) Konto oder Kreditkarte, sondern lediglich Informationen zur Bestätigung (Annahme) oder Ablehnung der Zahlung.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: '#000000' }}>
              Urheberrechte
            </Typography>
            <Typography variant="body1" paragraph>
              Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien auf der Website, gehören ausschliesslich dem Betreiber dieser Website oder den speziell genannten Rechteinhabern. Für die Reproduktion von sämtlichen Dateien ist die schriftliche Zustimmung des Urheberrechtsträgers im Voraus einzuholen.
            </Typography>
            <Typography variant="body1" paragraph>
              Wer ohne Einwilligung des jeweiligen Rechteinhabers eine Urheberrechtsverletzung begeht, kann sich strafbar machen und allenfalls schadenersatzpflichtig machen.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: '#000000' }}>
              Allgemeiner Haftungsausschluss
            </Typography>
            <Typography variant="body1" paragraph>
              Alle Angaben unseres Internetangebotes wurden sorgfältig geprüft. Wir bemühen uns, unser Informationsangebot aktuell, inhaltlich richtig und vollständig anzubieten. Trotzdem kann das Auftreten von Fehlern nicht völlig ausgeschlossen werden, womit wir keine Garantie für Vollständigkeit, Richtigkeit und Aktualität von Informationen auch journalistisch-redaktioneller Art übernehmen können. Haftungsansprüche aus Schäden materieller oder ideeller Art, die durch die Nutzung der angebotenen Informationen verursacht wurden, sind ausgeschlossen, sofern kein nachweislich vorsätzliches oder grob fahrlässiges Verschulden vorliegt.
            </Typography>
            <Typography variant="body1" paragraph>
              Der Herausgeber kann nach eigenem Ermessen und ohne Ankündigung Texte verändern oder löschen und ist nicht verpflichtet, Inhalte dieser Website zu aktualisieren. Die Benutzung bzw. der Zugang zu dieser Website geschieht auf eigene Gefahr des Besuchers. Der Herausgeber, seine Auftraggeber oder Partner sind nicht verantwortlich für Schäden, wie direkte, indirekte, zufällige, vorab konkret zu bestimmende oder Folgeschäden, die angeblich durch den Besuch dieser Website entstanden sind und übernehmen hierfür folglich keine Haftung.
            </Typography>
            <Typography variant="body1" paragraph>
              Der Herausgeber übernimmt ebenfalls keine Verantwortung und Haftung für die Inhalte und die Verfügbarkeit von Website Dritter, die über externe Links dieser Website erreichbar sind. Für den Inhalt der verlinkten Seiten sind ausschliesslich deren Betreiber verantwortlich. Der Herausgeber distanziert sich damit ausdrücklich von allen Inhalten Dritter, die möglicherweise straf- oder haftungsrechtlich relevant sind oder gegen die guten Sitten verstossen.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: '#000000' }}>
              Änderungen
            </Typography>
            <Typography variant="body1" paragraph>
              Wir können diese Datenschutzerklärung jederzeit ohne Vorankündigung anpassen. Es gilt die jeweils aktuelle, auf unserer Website publizierte Fassung. Soweit die Datenschutzerklärung Teil einer Vereinbarung mit Ihnen ist, werden wir Sie im Falle einer Aktualisierung über die Änderung per E-Mail oder auf andere geeignete Weise informieren.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: '#000000' }}>
              Fragen an den Datenschutzbeauftragten
            </Typography>
            <Typography variant="body1" paragraph>
              Wenn Sie Fragen zum Datenschutz haben, schreiben Sie uns bitte eine E-Mail oder wenden Sie sich direkt an die für den Datenschutz zu Beginn der Datenschutzerklärung aufgeführten, verantwortlichen Person in unserer Organisation.
            </Typography>
          </Box>

          <Box>
            <Typography variant="body2" sx={{ mt: 4, fontStyle: 'italic' }}>
              Stand: August 2024<br />
              avec plaisir GmbH, Zürich
            </Typography>
          </Box>
          </Box>
        </Paper>
      </Container>
      <Footer />
    </Box>
  )
}

export default Datenschutz