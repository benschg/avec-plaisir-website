import { Container, Typography, Box, Paper } from '@mui/material'

const AGBs = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8, mt: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, md: 6 },
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: 2,
          color: '#000000',
          '& *': { color: '#000000 !important' },
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            color: '#000000',
            fontWeight: 'bold',
            mb: 4,
          }}
        >
          Allgemeine Geschäftsbedingungen (AGB)
        </Typography>

        <Typography variant="h4" gutterBottom sx={{ color: '#000000', mb: 4 }}>
          Blumenfachgeschäft (avec plaisir GmbH)
        </Typography>

        <Box sx={{ '& > *': { mb: 3 } }}>
          <Box>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ color: '#000000', mt: 3 }}
            >
              1. Geltungsbereich
            </Typography>
            <Typography variant="body1" paragraph>
              1.1 Für sämtliche Geschäftsbeziehungen (einschliesslich Beratungen
              und sonstiger Leistungen) zwischen dem Geschäft und dem Kunden
              gelten die nachfolgenden Allgemeinen Geschäftsbedingungen
              (nachfolgend „AGB") in ihrer zum Zeitpunkt der Bestellung gültigen
              Fassung. Abweichende Bedingungen gelten nur, wenn und soweit sie
              schriftlich bestätigt worden sind.
            </Typography>
            <Typography variant="body1" paragraph>
              1.2 Die jeweils aktuelle und verbindliche Fassung der AGB wird
              unter www.avecplaisir-zuerich.ch publiziert.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: '#000000' }}>
              2. Vertragsschluss
            </Typography>
            <Typography variant="body1" paragraph>
              Die Angebote auf der Website www.avecplaisir-zuerich.ch sind rein
              informativ und daher unverbindlich. Preis- und
              Sortimentsänderungen bleiben vorbehalten. Blumen sind
              Saisonprodukte, daher ist nicht immer die ganze Auswahl
              erhältlich. Ein Vertrag zwischen dem Geschäft und dem Kunden kommt
              nach dessen Bestellung (persönlich, per Fax, per E-Mail, per
              Telefon, per Internet) erst durch die Lieferung der Ware oder die
              gleichlautende Auftragsbestätigung durch das Geschäft zustande.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: '#000000' }}>
              3. Preis
            </Typography>
            <Typography variant="body1" paragraph>
              3.1 Alle angezeigten Preise sind Bruttopreise,also inkl. MWST.
            </Typography>
            <Typography variant="body1" paragraph>
              3.2 Preisanpassungen für Produkte und Leistungen sind jederzeit
              möglich, da Blumenpreise naturgemäss saisonalen und regionalen
              Schwankungen unterliegen. Es gelten ausschliesslich die in der
              Auftragsbestätigung oder im Geschäft genannten Preise. Bei
              Änderungen bzw. Annullationen von Bestellungen durch den Kunden
              können allf. Kosten hierfür belastet werden.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: '#000000' }}>
              4. Zahlung
            </Typography>
            <Typography variant="body1" paragraph>
              4.1 Zahlungen per Rechnung sind innerhalb von zehn (10) Tagen ab
              Rechnungsdatum rein netto zu begleichen. Das Geschäft behält sich
              vor, Lieferungen an neue Kunden oder im begründeten Einzelfalle
              gegen Nachnahme oder Vorkasse durchzuführen.
            </Typography>
            <Typography variant="body1" paragraph>
              4.2 Bei Zahlungsverzug oder Stundung ist das Geschäft berechtigt,
              Zinsen in gesetzlicher Höhe, mindestens aber 5% p.a. sowie
              Mahngebühren von CHF 30.- pro Fall zu berechnen; die
              Geltendmachung weiterer Kosten bleibt vorbehalten. Abhängig von
              Bonität, Vertragsgegenstand und Vertragsvolumen behält sich das
              Geschäft vor, eine davon abweichende Zahlungsweise oder eine
              zusätzliche Absicherung der Vorleistung zu erbitten. Bei grösseren
              Aufträgen ab CHF 2'000.00 kann das Geschäft eine Anzahlung von
              mind. 50 % verlangen.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: '#000000' }}>
              5. Lieferung
            </Typography>
            <Typography variant="body1" paragraph>
              5.1 Die Lieferung erfolgt grundsätzlich am gewünschten Tag. Wird
              durch den Kunden kein bestimmtes Lieferdatum angegeben, erfolgt
              die Lieferung innerhalb von 4 bis 5 Tagen ab Bestellung.
            </Typography>
            <Typography variant="body1" paragraph>
              5.2 Eine termingerechte und auftragsgemässe Lieferung bedingt,
              dass der Kunde korrekte Adressangaben liefert. Jegliche Haftung
              für allfällige Verspätungen oder Nicht Lieferungen infolge
              unvollständiger oder unrichtiger Adressen ist ausgeschlossen. Bei
              Krankenhauslieferungen sind nach Möglichkeit u.a. Abteilung und
              Zimmernummer anzugeben, bei Hotellieferungen Zimmernummer und
              Name.
            </Typography>
            <Typography variant="body1" paragraph>
              5.3 Wenn der Empfänger an der Lieferadresse nicht anzutreffen ist,
              ist das Geschäft ermächtigt, die Lieferung bei einer Drittperson,
              die für die Weiterleitung an den Empfänger geeignet scheint,
              abzugeben.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: '#000000' }}>
              6. Beschaffungsprobleme
            </Typography>
            <Typography variant="body1" paragraph>
              Im Falle unvorhergesehener Nichtverfügbarkeit der bestellten Ware
              behält sich das Geschäft vor, gleichwertige andere Ware zu
              liefern.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: '#000000' }}>
              7. Lieferungen für Anlässe/Events
            </Typography>
            <Typography variant="body1" paragraph>
              Bei Lieferungen für besondere Anlässe erfolgt diese gem.
              jeweiliger Auftragsbestätigung. Sofern keine andere Vereinbarung
              getroffen wird, gehört zur Dienstleistung des Geschäftes auch das
              Abräumen und der Abtransport der Dekoration, soweit der Kunde
              diese nicht selbst mitnehmen will.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: '#000000' }}>
              8. Gewährleistung
            </Typography>
            <Typography variant="body1" paragraph>
              Das Geschäft garantiert für die frischen Schnittblumen eine
              Mindesthaltbarkeit von 4 Tagen, sofern der Kunde den Schnittblumen
              die richtige Pflege zukommen lässt und diese mit ausreichend
              Wasser versorgt. Für andere Lieferungen wird jede Haftung
              ausgeschlossen.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: '#000000' }}>
              9. Gerichtsstand und anwendbares Recht
            </Typography>
            <Typography variant="body1" paragraph>
              Anwendbar ist Schweizer Recht. Gerichtsstand ist der Sitz des
              Geschäftes.
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}

export default AGBs
