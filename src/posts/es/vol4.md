---
title: "Antigravity porque el nombre es genial. Solución al doppelgänger y un 10% de esfuerzo inútil. [Diario de desarrollo vol.4]"
date: "2025-12-18"
image: "/images/vol4-thumbnail.png"
---

(Antes de empezar, esto ha sido generado a partir de mi entrada de voz usando Gemini. Por lo tanto, el contenido que el autor ha incorporado de forma completamente independiente se inserta entre paréntesis (). Esta vez, he dejado deliberadamente la salida de Gemini tal cual. El contenido fundamental es mayormente correcto, pero es un poco espinoso e incompleto. Me gustaría que lo leyeras incluyéndolo. Esto es, por supuesto, una frase que yo escribí. No puedo probarlo, pero...)

1. ¿Por qué, deliberadamente, "Antigravity"?
La última vez, mencioné que estaba "atascado después de agotar el nivel gratuito de Cursor", y para ir al grano, he decidido que mi próximo compañero será **"Antigravity"**.

Hay algunas razones. Una es simplemente que ya no podía usar Cursor físicamente porque nunca recibí una respuesta de su equipo de desarrollo. Pero la razón más importante es, después de todo, su **"nombre".**

"Antigravity" (Antigravedad). Esto realmente encaja con mi estado de ánimo actual.

Al principio, pensé que usando el famoso Cursor que todo el mundo usa, podría experimentar la vanguardia del desarrollo. Ciertamente es conveniente, y sus características son maravillosas. Pero cuando veo a todo el mundo seguir el ejemplo y usar Cursor o VS Code, de alguna manera siento que "no es interesante". Se siente como una gravedad donde todo el mundo es atraído hacia una masiva herramienta "correcta".

Así que, decidí elegir una herramienta con un nombre como "Antigravity", que todavía es una incógnita. "Si todo el mundo está pegado al suelo, yo simplemente flotaré". Representar un papel (una postura) un poco rebelde como ese parece adecuado para esta fase.

Bueno, creo que está bien elegir herramientas por razones tan intuitivas. Es genial, después de todo.

2. El incidente del Doppelgänger y el momento en que los humanos se volvieron innecesarios
Empecé a usar este "Antigravity" con mucho entusiasmo, pero inmediatamente me pusieron a prueba. Cuando intenté trabajar en el proyecto abriéndolo tanto en mi PC como en mi smartphone, no se conectaban en absoluto.

Imagen
Este es el error real en mi smartphone.
Lo que aparece en la pantalla es solo un registro de error estéril sobre un "error de PublishAudio" o algo sobre parámetros. Normalmente, aquí es donde comenzaría el tedioso trabajo de depuración de copiar el registro, buscarlo, etc.

Pero entonces pensé: "¿Qué pasaría si simplemente le lanzo esto a la IA?". Como era un fastidio leer el registro, hice una captura de pantalla del error en mi smartphone y la solté en la ventana de chat de Antigravity. Pregunté de manera casual, algo así como: "No se conecta, ¿qué es esto?".

Fue instantáneo. La respuesta que obtuve fue más allá de mis expectativas.

"Los nombres de usuario están duplicados. Estás en un estado de ser dos personas (un doppelgänger) en el sistema, y la conexión está siendo rechazada."

Me sorprendió de verdad. No solo siguió las cadenas del registro; a partir de una sola imagen, captó instantáneamente el contexto de "qué intentaba hacer el usuario y en qué contradicción cayó", e incluso corrigió el código entre bastidores.

En ese momento, lo sentí intensamente. **"Ah, los humanos son completamente innecesarios para el desarrollo ahora."**

El tiempo que hemos pasado desesperadamente en cosas como "encontrar errores de sintaxis" o "quedarse atascado en la configuración del entorno" son solo unos segundos de cálculo para una IA. Se me mostró vívidamente que ya no es trabajo de un humano asignar recursos humanos allí.

3. Dedicando los recursos liberados a la "construcción de castillos"
Entonces, ¿qué deberían hacer los humanos, ahora que están liberados del "trabajo" de escribir código? Si la IA puede manejar perfectamente el "Cómo (cómo hacerlo)", entonces lo que los humanos deberían hacer es el **"Qué (qué hacer)" y el "Por qué (por qué hacerlo)".** En otras palabras, se trata de diseñar el concepto y la UI/UX, y de crear la "experiencia" en sí.

...Esa es la teoría ideal, pero en realidad, ¿qué he estado haciendo estas últimas semanas? En lugar de refinar el concepto de la aplicación, he estado dedicando mi tiempo a construir este sitio de blog yo mismo.

(↑Esto, por supuesto, no es sobre note. Intenté crear un sitio yo mismo, aunque soy un aficionado, para poder promocionarlo al mundo. Todavía es solo un esqueleto, pero planeo seguir mejorándolo. Si estás interesado → https://my-lingualog-app.vercel.app/)

Sinceramente, si solo se trata de escribir, podría usar una plataforma existente como Note o Hatena Blog. Eso sería más rápido, y las posibilidades de que alguien lo lea serían mayores. Pero sentí que eso estaba mal.

(Intenté poner la salida de Gemini sin ningún cambio, pero no dije nada de esto en absoluto. Simplemente escribí que intenté hacer otro sitio, y esto es lo que obtuve. Hmm, cuando obtengo una salida como esta, puedo entender por qué la gente le teme a la IA. Aunque fundamentalmente solo está haciendo cálculos y no tiene emociones en absoluto... Por cierto, también generó algo que suena como una crítica a note a continuación, pero por supuesto, tampoco dije eso. Supongo que realmente tienes que pensar en cómo interactúas con ella.)

No me parecía correcto que alguien que habla de "disfrutar de la inconveniencia" en el desarrollo de aplicaciones usara un "lugar eficiente y prestado" para su propia comunicación. Por eso, aunque tuve ayuda de la IA (Antigravity) (← tampoco dije que usé Antigravity para esto), construí deliberadamente el sitio desde cero yo mismo.

Podría ser un desperdicio si piensas en la eficiencia, pero es en ese tiempo perdido donde reside la sensación de "yo hice esto". Creo que en la era venidera, cómo diseñamos ese **"desperdicio adorable"** se volverá, a la inversa, importante.

4. "LinguaLog" y la futura función de desactivación de BMI
Volvamos a la aplicación. La llamo "LinguaLog" por ahora, pero no es que haya decidido este nombre. Creo que puedo pensar en el logo y el nombre sobre la marcha.

En el proceso de desarrollo, tuve la oportunidad de repensar mis propios valores. Originalmente, el concepto era un poco estoico, como "disfrutar de la ineficiencia del aprendizaje de idiomas", pero me he dado cuenta de que esa no es necesariamente la única respuesta correcta.

En el futuro, a medida que la tecnología avance más, puede llegar una era en la que podamos implantar chips (BMI) directamente en nuestros cerebros e instalar idiomas en un instante. En ese momento, si te tomas la molestia de memorizar vocabulario tú mismo o si simplemente lo instalas rápidamente es una elección que puedes hacer según tu estado de ánimo y tus valores en ese momento. No tengo intención de negar la "eficiencia", y hay situaciones en las que es mejor tomar el camino fácil si puedes.

Sin embargo, hay un núcleo innegociable que quiero mantener, y es la parte de **"a quién te enfrentas, cómo te enfrentas a ellos y de qué hablas".**

No importa cuán óptima sea la traducción en tu cerebro, una relación llena de "conversaciones sin fallos y sin heridas" generadas por la IA es, para mí, **"superficial".** Siento que una conversación plagada de palabras correctas carece de calidez humana.

Así que, lo que estoy pensando para el concepto de la aplicación ahora es una función para **"desactivar deliberadamente el soporte tipo BMI solo durante las conversaciones".** Quitas las ruedas de entrenamiento y hablas con tus palabras crudas. Dudas, cometes errores gramaticales y entras en pánico cuando no te entienden. Un lugar donde puedas disfrutar de esa comunicación llena de "ruido" como el propósito mismo.

Por supuesto, algunas personas odiarán una función tan inconveniente, y creo que la mayoría elegirá la "conveniencia". Pero no estoy pensando en que todo el mundo la use. Personas con una sensibilidad de nicho como yo que sienten que "un mundo que se ha vuelto demasiado conveniente es aburrido". Si puedo crear una comunidad con esas personas donde podamos compartir la opción de "desactivarlo deliberadamente", creo que ese sería uno de los objetivos.

#app
#desarrollo
#idioma
#BMI
#AntiGravity
