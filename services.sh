# Habilita o serviço Google Cloud Run, que permite executar contêineres de forma escalável e gerenciada no Google Cloud.
gcloud services enable run.googleapis.com

# Habilita o serviço Google Cloud Build, que é utilizado para automatizar o processo de construção de contêineres e outras tarefas de integração contínua.
gcloud services enable cloudbuild.googleapis.com

# Habilita o serviço Google Artifact Registry, que é uma plataforma para armazenar, gerenciar e distribuir artefatos de software como contêineres Docker, pacotes Maven, etc.
gcloud services enable artifactregistry.googleapis.com
