# Matematica
# Prova direttamente [qui](https://matematica.filippodude.cc/)
Semplice sito fatto in React Typescript per scuola

CODICE PRINCIPALE DENTRO "pages/main/mainPage.tsx"
    
    const valutaFunzione = (x: number): number | null => {
        if(espressione == null)return null
        try {
            const parser = new Parser();
            if (!/^[\d+\-*/().x\s^]+$/.test(espressione)) {throw new Error();}
            const expr = parser.parse(espressione);
            const variables = expr.variables();
            if (variables.some((v) => v !== "x")) {throw new Error();}
            const value = expr.evaluate({ x: x });
            console.log(value)
            return value;
        } catch (error) {
            return null;
        }

    };
    
    const elaboraFunzione = () => {
        var n1, n2; 
        n1 = valutaFunzione(intervallo.min);
        n2 = valutaFunzione(intervallo.max);

        if (n1 && n2 && n1 * n2 < 0) {
            setListaOperazioni([]);

            let ultimoMax = intervallo.max;
            for (let i = 0; i < iterazioni; i++) {
                let puntoMedio = parseFloat(((intervallo.min + ultimoMax) / 2).toFixed(precisione));
                setListaOperazioni(prev => [...prev, puntoMedio]);
    
                // Controllo se già siamo a 0
                if (valutaFunzione(puntoMedio) == 0) {
                    setRisultato(puntoMedio);
                    return;
                }
                // Assegna il nuovo ultimoMax o min
                n1 = valutaFunzione(puntoMedio);
                n2 = valutaFunzione(intervallo.min);
                if (n1 && n2 && n1 * n2 < 0) {
                    ultimoMax = puntoMedio;
                } else {
                    intervallo.min = puntoMedio; 
                }
            }
            setRisultato(ultimoMax);
        } else {
            if(n1 == null || n2 == null){
                setTitoloPopUp("ERRORE!");
                setTestoPopUp("Espressione non valida!");
                popUp.current?.showModal();
            } else {
                setTitoloPopUp("ERRORE!");
                setTestoPopUp("I numeri che hai impostato non assumono valori di segno opposto!");
                popUp.current?.showModal();
            }
        }
    }
