library(plyr)

g1 <- read.csv("~/mba/tcc/rodada_final/ceps_copa_botafogo_aps_para_clusterizar.csv", header=TRUE)
g2 <- read.csv("~/mba/tcc/rodada_final/ceps_copa_botafogo_aps_para_clusterizar_agrupado.csv", header=TRUE)
g3 <- join(g1, g2, by=c("Latitude", "Longitude"))
View(g3)
#write.csv(g3, file = "~/mba/tcc/rodada_final/ceps_copa_botafogo_aps_centroids.csv")
