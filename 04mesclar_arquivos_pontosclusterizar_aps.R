library(plyr)

#mescla arquivos com coordenadas e aps utilizando o CEP
df1 <- read.csv("~/mba/tcc/rodada_final/ceps_copa_botafogo_aps_para_clusterizar.csv")
df2 <- read.csv("~/mba/tcc/rodada_final/agencias_copa_botafogo.csv", sep=";")
df3 <- join(df1, df2, by=c("aps"))
write.csv(df3[,c('cep', 'aps','Latitude', 'Longitude', 'lat_aps', 'long_aps')], file = "~/mba/tcc/rodada_final/ceps_copa_botafogo_aps_para_clusterizar_final.csv")
