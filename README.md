# Job Tracker

Μια full-stack εφαρμογή για την καταγραφή και παρακολούθηση αιτήσεων εργασίας. Παρουσιάζει συνοπτικά την πορεία των αιτήσεων και επιτρέπει την οργάνωσή τους από ένα απλό web περιβάλλον.

## Δυνατότητες

- Dashboard με συνολικό αριθμό αιτήσεων και καταμέτρηση ανά κατάσταση.
- Προβολή των τριών πιο πρόσφατων αιτήσεων.
- Προσθήκη, επεξεργασία και διαγραφή αιτήσεων.
- Αναζήτηση με βάση την εταιρεία ή τη θέση και φιλτράρισμα ανά κατάσταση.
- Responsive περιβάλλον χρήσης.

Κάθε αίτηση περιλαμβάνει εταιρεία, θέση και κατάσταση: `Applied`, `Interview`, `Rejected` ή `Offer`.

## Τεχνολογίες

- **Frontend:** React, Vite, React Router
- **Backend:** Node.js, Express
- **Βάση δεδομένων:** MongoDB με Mongoose

## Τοπική εκτέλεση

Απαιτούνται Node.js και npm, καθώς και διαθέσιμη MongoDB (τοπικά ή μέσω MongoDB Atlas).

### 1. Ρύθμιση backend

Δημιουργήστε το αρχείο `server/.env` με τις δικές σας τιμές:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Έπειτα, σε ένα terminal:

```powershell
cd server
npm install
npm run dev
```

Το API ξεκινά συνήθως στη διεύθυνση `http://localhost:5000`.

### 2. Ρύθμιση frontend

Σε δεύτερο terminal:

```powershell
cd client
npm install
npm run dev
```

Ανοίξτε τη διεύθυνση που θα εμφανίσει το Vite (συνήθως `http://localhost:5173`). Από προεπιλογή, το frontend επικοινωνεί με το API στο `http://localhost:5000`. Για διαφορετική διεύθυνση API, ορίστε τη μεταβλητή `VITE_API_URL` στο περιβάλλον του frontend.

## API

Η βασική διαδρομή είναι `/api/applications`:

- `GET /` — λίστα αιτήσεων
- `POST /` — δημιουργία αίτησης
- `PUT /:id` — ενημέρωση αίτησης
- `DELETE /:id` — διαγραφή αίτησης

Υπάρχει επίσης το `GET /api/health` για έλεγχο διαθεσιμότητας του server.

## Έλεγχοι frontend

Από τον φάκελο `client`:

```powershell
npm run lint
npm run build
```

## Ασφάλεια ρυθμίσεων

Το `server/.env` περιέχει το MongoDB connection string και δεν πρέπει να προστεθεί στο Git. Χρησιμοποιήστε τοπικές μεταβλητές περιβάλλοντος στο deployment και μην ανεβάζετε credentials στο repository.
