import React from "react";
import { Typography, Box, Button, Card, CardContent, CardMedia, Grid } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info"; // Ícono para darle más interactividad
import SchoolIcon from "@mui/icons-material/School"; // Ícono relacionado con la educación
import logoSena from "../../assets/images/logoSena.png"; // Importa la imagen

export default function MasInformacion() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h1" color="primary" align="center">
        Más información
      </Typography>
      
      {/* Card principal con imagen y contenido */}
      <Card sx={{ display: 'flex', mt: 4, boxShadow: 3, }}>
        <CardMedia
          component="img"
          sx={{ width: 300 }}
          image={logoSena} // Usamos la imagen importada
          alt="Logo del SENA"
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
              Servicio Nacional de Aprendizaje (SENA)
            </Typography>
            <Typography variant="body1" color="secondary" sx={{ mt: 2 }}>
              El SENA es una institución pública colombiana, que se enfoca en la formación técnica y tecnológica para el desarrollo económico, social y tecnológico del país. Ofrece programas gratuitos en áreas como tecnología, salud, industria, y negocios.
            </Typography>
            <Typography variant="body1" color="secondary" sx={{ mt: 2 }}>
              Su misión es mejorar la calidad de vida de los colombianos a través de la educación y la formación continua, permitiendo a millones de personas acceder a oportunidades laborales y de emprendimiento.
            </Typography>
          </CardContent>
        </Box>
      </Card>

      {/* Sección adicional con íconos y detalles */}
      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid item xs={12} sm={6}>
          <InfoIcon color="primary" sx={{ fontSize: 40 }} />
          <Typography variant="h6" sx={{ mt: 1 }}>
            Formación Técnica Gratuita
          </Typography>
          <Typography variant="body1">
            El SENA ofrece programas de formación técnica y tecnológica totalmente gratuitos, accesibles para todos los colombianos.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <SchoolIcon color="primary" sx={{ fontSize: 40 }} />
          <Typography variant="h6" sx={{ mt: 1 }}>
            Innovación y Desarrollo
          </Typography>
          <Typography variant="body1">
            La institución fomenta la innovación y el desarrollo de proyectos tecnológicos, ayudando a mejorar la competitividad del país.
          </Typography>
        </Grid>
      </Grid>

      {/* Botón interactivo */}
      <Button variant="contained" color="primary" sx={{ mt: 4, display: 'block', mx: 'auto' }}>
        Leer más
      </Button>
    </Box>
  );
}
