var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// shared/const.ts
var COOKIE_NAME, ONE_YEAR_MS, AXIOS_TIMEOUT_MS, UNAUTHED_ERR_MSG, NOT_ADMIN_ERR_MSG;
var init_const = __esm({
  "shared/const.ts"() {
    "use strict";
    COOKIE_NAME = "app_session_id";
    ONE_YEAR_MS = 1e3 * 60 * 60 * 24 * 365;
    AXIOS_TIMEOUT_MS = 3e4;
    UNAUTHED_ERR_MSG = "Please login (10001)";
    NOT_ADMIN_ERR_MSG = "You do not have required permission (10002)";
  }
});

// drizzle/schema.ts
var schema_exports = {};
__export(schema_exports, {
  appSettings: () => appSettings,
  backupHistory: () => backupHistory,
  backupSchedules: () => backupSchedules,
  bgpPeers: () => bgpPeers,
  ceoBandejas: () => ceoBandejas,
  ceoSplitterVias: () => ceoSplitterVias,
  ceoSplitters: () => ceoSplitters,
  ceoTubes: () => ceoTubes,
  ceoViaAssociations: () => ceoViaAssociations,
  ceoVias: () => ceoVias,
  ceos: () => ceos,
  connections: () => connections,
  ctoAlertConfig: () => ctoAlertConfig,
  ctoAlerts: () => ctoAlerts,
  ctoTubes: () => ctoTubes,
  ctoViaAssociations: () => ctoViaAssociations,
  ctoVias: () => ctoVias,
  ctos: () => ctos,
  dgoPortFiberLinks: () => dgoPortFiberLinks,
  dgoPortLinks: () => dgoPortLinks,
  dgoSlotCableLinks: () => dgoSlotCableLinks,
  equipmentInterfaces: () => equipmentInterfaces,
  equipmentSlots: () => equipmentSlots,
  equipmentTypeEnum: () => equipmentTypeEnum,
  equipments: () => equipments,
  fiberColorEnum: () => fiberColorEnum,
  fibers: () => fibers,
  ipAddresses: () => ipAddresses,
  ipAuditLog: () => ipAuditLog,
  ipBlocks: () => ipBlocks,
  maintenanceHistory: () => maintenanceHistory,
  mapDgoElements: () => mapDgoElements,
  mapDgoGroups: () => mapDgoGroups,
  mapElementGroups: () => mapElementGroups,
  mapElements: () => mapElements,
  mapGroups: () => mapGroups,
  mapOltElements: () => mapOltElements,
  mapOltGroups: () => mapOltGroups,
  mapPoiGroups: () => mapPoiGroups,
  mapPois: () => mapPois,
  mapPoleGroups: () => mapPoleGroups,
  mapPoles: () => mapPoles,
  mapReserveGroups: () => mapReserveGroups,
  mapRouteGroups: () => mapRouteGroups,
  mapRoutes: () => mapRoutes,
  mapTechnicalReserves: () => mapTechnicalReserves,
  networkPortReadings: () => networkPortReadings,
  networkSnmpAlerts: () => networkSnmpAlerts,
  networkSnmpConfig: () => networkSnmpConfig,
  networkSnmpPorts: () => networkSnmpPorts,
  networkSnmpReadings: () => networkSnmpReadings,
  oltPortFiberLinks: () => oltPortFiberLinks,
  ports: () => ports,
  powerSources: () => powerSources,
  racks: () => racks,
  rooms: () => rooms,
  routeExtraTubes: () => routeExtraTubes,
  sgpConfig: () => sgpConfig,
  sgpLinkHistory: () => sgpLinkHistory,
  snmpAlerts: () => snmpAlerts,
  snmpReadings: () => snmpReadings,
  sshCommands: () => sshCommands,
  sshCredentials: () => sshCredentials,
  sshDeviceCommands: () => sshDeviceCommands,
  sshDevices: () => sshDevices,
  sshExecutionLog: () => sshExecutionLog,
  sshExecutions: () => sshExecutions,
  sshQuickCommands: () => sshQuickCommands,
  systemSettings: () => systemSettings,
  topologyLayouts: () => topologyLayouts,
  tuyaAccounts: () => tuyaAccounts,
  tuyaDevices: () => tuyaDevices,
  tuyaReadings: () => tuyaReadings,
  users: () => users
});
import {
  int,
  bigint,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
  float,
  double,
  boolean
} from "drizzle-orm/mysql-core";
var users, rooms, equipmentTypeEnum, equipments, equipmentSlots, ports, fiberColorEnum, fibers, connections, maintenanceHistory, ceos, ceoTubes, ceoVias, backupSchedules, backupHistory, systemSettings, ipBlocks, ipAddresses, ipAuditLog, equipmentInterfaces, powerSources, snmpAlerts, tuyaDevices, tuyaAccounts, tuyaReadings, topologyLayouts, snmpReadings, racks, ctos, mapElements, mapRoutes, routeExtraTubes, sgpConfig, ctoAlerts, ctoAlertConfig, ctoTubes, ctoVias, mapGroups, mapElementGroups, mapRouteGroups, mapPoleGroups, mapReserveGroups, appSettings, sgpLinkHistory, ceoBandejas, ceoSplitters, ceoSplitterVias, ceoViaAssociations, sshCredentials, sshCommands, sshExecutionLog, sshDevices, sshQuickCommands, sshExecutions, bgpPeers, sshDeviceCommands, networkSnmpConfig, networkSnmpPorts, networkSnmpReadings, networkPortReadings, networkSnmpAlerts, mapOltElements, oltPortFiberLinks, dgoPortFiberLinks, ctoViaAssociations, mapPoles, mapTechnicalReserves, mapPois, mapPoiGroups, mapOltGroups, mapDgoElements, dgoSlotCableLinks, dgoPortLinks, mapDgoGroups;
var init_schema = __esm({
  "drizzle/schema.ts"() {
    "use strict";
    users = mysqlTable("users", {
      id: int("id").autoincrement().primaryKey(),
      openId: varchar("openId", { length: 64 }).notNull().unique(),
      name: text("name"),
      email: varchar("email", { length: 320 }),
      loginMethod: varchar("loginMethod", { length: 64 }),
      role: mysqlEnum("role", ["user", "admin", "operator"]).default("user").notNull(),
      passwordHash: varchar("passwordHash", { length: 255 }),
      // Login mobile por senha
      mustChangePassword: boolean("mustChangePassword").default(false).notNull(),
      // Forçar troca de senha no primeiro acesso
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
      lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull()
    });
    rooms = mysqlTable("rooms", {
      id: int("id").autoincrement().primaryKey(),
      name: varchar("name", { length: 128 }).notNull(),
      type: mysqlEnum("room_type", ["datacenter", "noc", "pop", "cabinet", "outdoor", "other"]).default("pop").notNull(),
      description: text("description"),
      location: varchar("location", { length: 128 }),
      address: text("address"),
      floor: varchar("floor", { length: 32 }),
      city: varchar("city", { length: 128 }),
      state: varchar("state", { length: 32 }),
      notes: text("notes"),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    equipmentTypeEnum = mysqlEnum("equipment_type", [
      "switch",
      "olt",
      "dgo",
      "splitter",
      "router",
      "server",
      "patch_panel",
      "amplifier",
      "other"
    ]);
    equipments = mysqlTable("equipments", {
      id: int("id").autoincrement().primaryKey(),
      name: varchar("name", { length: 128 }).notNull(),
      type: equipmentTypeEnum.notNull(),
      model: varchar("model", { length: 128 }),
      manufacturer: varchar("manufacturer", { length: 128 }),
      serialNumber: varchar("serialNumber", { length: 128 }),
      roomId: int("roomId"),
      rack: varchar("rack", { length: 64 }),
      rackPosition: varchar("rackPosition", { length: 32 }),
      rackUnits: int("rackUnits").default(1),
      // Altura em U (unidades de rack)
      ipAddress: varchar("ipAddress", { length: 64 }),
      macAddress: varchar("macAddress", { length: 32 }),
      totalPorts: int("totalPorts").default(0),
      imageUrl: text("imageUrl"),
      // URL da imagem do equipamento (S3)
      powerType: mysqlEnum("power_type", ["ac", "dc"]),
      // Tipo de energia: AC ou DC
      powerSource: mysqlEnum("power_source", ["rectifier", "inverter", "ups", "grid", "other"]),
      // Fonte de alimentação (legado)
      powerSourceLabel: varchar("powerSourceLabel", { length: 128 }),
      // Identificação da fonte (legado)
      powerSourceId: int("powerSourceId"),
      // FK para power_sources cadastradas
      voltage: float("voltage"),
      // Tensão de operação (V)
      powerConsumptionW: float("powerConsumptionW"),
      // Consumo elétrico (W)
      notes: text("notes"),
      // Campos de rede
      vlan: int("vlan"),
      // VLAN ID (ex: 100)
      interfaceIp: varchar("interfaceIp", { length: 64 }),
      // IP da interface de gerência (ex: 10.0.0.1/24)
      ipBlockId: int("ipBlockId"),
      // FK para ip_blocks (bloco IP associado)
      serviceDescription: varchar("serviceDescription", { length: 255 }),
      // Descrição do serviço (ex: "Core MPLS", "Acesso cliente")
      status: mysqlEnum("status", ["active", "inactive", "maintenance"]).default("active").notNull(),
      // Campos SSH (para o módulo SSH Commander)
      sshUser: varchar("sshUser", { length: 64 }),
      // Utilizador SSH (ex: admin)
      sshPasswordEnc: text("sshPasswordEnc"),
      // Password SSH encriptada (AES-256)
      sshPort: int("sshPort").default(22),
      // Porta SSH (default: 22)
      // Campo óptico — potência TX usada no balanço óptico estimado via DGO
      txPowerDbm: float("txPowerDbm"),
      // Potência TX óptica em dBm (ex: 5.0 para OLT GPON)
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    equipmentSlots = mysqlTable("equipment_slots", {
      id: int("id").autoincrement().primaryKey(),
      equipmentId: int("equipmentId").notNull(),
      slotNumber: varchar("slotNumber", { length: 16 }).notNull(),
      // ex: "A", "B", "1", "2"
      label: varchar("label", { length: 64 }),
      // ex: "Slot A — LC 12 portas"
      portType: mysqlEnum("slot_port_type", ["sc", "lc", "fc", "st", "rj45", "sfp", "sfp_plus", "qsfp", "qsfp28", "qsfp_dd", "cfp", "cfp2", "cfp4", "gpon", "xgspon", "dag", "other"]).default("lc"),
      speed: mysqlEnum("slot_speed", ["1g", "10g", "25g", "40g", "100g", "400g", "other"]),
      totalPorts: int("totalPorts").default(0),
      notes: text("notes"),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    ports = mysqlTable("ports", {
      id: int("id").autoincrement().primaryKey(),
      equipmentId: int("equipmentId").notNull(),
      portNumber: varchar("portNumber", { length: 32 }).notNull(),
      label: varchar("label", { length: 64 }),
      slotId: int("slotId"),
      // null = porta sem slot
      type: mysqlEnum("port_type", ["sc", "lc", "fc", "st", "rj45", "sfp", "sfp_plus", "qsfp", "qsfp28", "qsfp_dd", "cfp", "cfp2", "cfp4", "gpon", "xgspon", "dag", "other"]).default("lc").notNull(),
      speed: mysqlEnum("port_speed", ["1g", "10g", "25g", "40g", "100g", "400g", "other"]),
      status: mysqlEnum("port_status", ["free", "occupied", "reserved", "faulty"]).default("free").notNull(),
      notes: text("notes"),
      sortOrder: int("sortOrder").default(0).notNull(),
      connectedToEquipmentId: int("connectedToEquipmentId"),
      // Equipamento da porta vinculada
      connectedToPortId: int("connectedToPortId"),
      // Porta vinculada (patch/conexão direta)
      txPowerDbm: float("txPowerDbm"),
      // Override da potência TX desta porta (null = usa txPowerDbm do equipamento)
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    fiberColorEnum = mysqlEnum("fiber_color", [
      "blue",
      "orange",
      "green",
      "brown",
      "slate",
      "white",
      "red",
      "black",
      "yellow",
      "violet",
      "rose",
      "aqua"
    ]);
    fibers = mysqlTable("fibers", {
      id: int("id").autoincrement().primaryKey(),
      name: varchar("name", { length: 128 }).notNull(),
      originEquipmentId: int("originEquipmentId"),
      originPortId: int("originPortId"),
      destinationEquipmentId: int("destinationEquipmentId"),
      destinationPortId: int("destinationPortId"),
      color: fiberColorEnum,
      type: mysqlEnum("fiber_type", ["single_mode", "multi_mode", "armored", "aerial", "underground"]).default("single_mode").notNull(),
      lengthMeters: float("lengthMeters"),
      cableId: varchar("cableId", { length: 64 }),
      tubeColor: varchar("tubeColor", { length: 32 }),
      attenuation: float("attenuation"),
      status: mysqlEnum("fiber_status", ["active", "inactive", "reserved", "faulty"]).default("active").notNull(),
      notes: text("notes"),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    connections = mysqlTable("connections", {
      id: int("id").autoincrement().primaryKey(),
      name: varchar("name", { length: 128 }),
      sourcePortId: int("sourcePortId").notNull(),
      targetPortId: int("targetPortId").notNull(),
      fiberId: int("fiberId"),
      type: mysqlEnum("connection_type", ["direct", "spliced", "patch", "cross_connect"]).default("direct").notNull(),
      status: mysqlEnum("connection_status", ["active", "inactive", "testing"]).default("active").notNull(),
      notes: text("notes"),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    maintenanceHistory = mysqlTable("maintenance_history", {
      id: int("id").autoincrement().primaryKey(),
      entityType: mysqlEnum("entity_type", ["equipment", "fiber", "port", "connection", "room"]).notNull(),
      entityId: int("entityId").notNull(),
      action: mysqlEnum("action", ["created", "updated", "deleted", "maintenance", "repaired", "inspected"]).notNull(),
      description: text("description").notNull(),
      performedBy: varchar("performedBy", { length: 128 }),
      userId: int("userId"),
      previousState: text("previousState"),
      newState: text("newState"),
      createdAt: timestamp("createdAt").defaultNow().notNull()
    });
    ceos = mysqlTable("ceos", {
      id: int("id").autoincrement().primaryKey(),
      name: varchar("name", { length: 128 }).notNull(),
      location: varchar("location", { length: 256 }),
      roomId: int("roomId"),
      notes: text("notes"),
      status: mysqlEnum("ceo_status", ["active", "inactive", "maintenance"]).default("active").notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    ceoTubes = mysqlTable("ceo_tubes", {
      id: int("id").autoincrement().primaryKey(),
      ceoId: int("ceoId").notNull(),
      bandejaId: int("bandejaId"),
      // FK ceo_bandejas.id (null = tubo sem bandeja, compatibilidade)
      type: mysqlEnum("ceo_tube_type", ["tube", "splitter"]).default("tube").notNull(),
      identifier: varchar("identifier", { length: 32 }).notNull(),
      // ex: "TUBO 1", "SPLITTER 1*8"
      totalVias: int("totalVias").default(12).notNull(),
      color: varchar("color", { length: 32 }),
      notes: text("notes"),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    ceoVias = mysqlTable("ceo_vias", {
      id: int("id").autoincrement().primaryKey(),
      tubeId: int("tubeId").notNull(),
      ceoId: int("ceoId").notNull(),
      viaNumber: int("viaNumber").notNull(),
      // 1, 2, 3...
      label: varchar("label", { length: 64 }),
      // etiqueta opcional
      fusedToViaId: int("fusedToViaId"),
      // id da via destino da fusão (tubo→tubo)
      fusedToTubeId: int("fusedToTubeId"),
      // id do tubo destino
      fusedToSplitterId: int("fusedToSplitterId"),
      // id do splitter destino (tubo→splitter)
      fusedToSplitterViaId: int("fusedToSplitterViaId"),
      // id da via do splitter destino
      fiberId: int("fiberId"),
      // fibra óptica associada a esta via
      notes: text("notes"),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    backupSchedules = mysqlTable("backup_schedules", {
      id: int("id").autoincrement().primaryKey(),
      enabled: boolean("enabled").default(false).notNull(),
      frequency: mysqlEnum("frequency", ["daily", "weekly", "monthly"]).default("weekly").notNull(),
      hour: int("hour").default(2).notNull(),
      // hora do dia (0-23) para executar
      dayOfWeek: int("dayOfWeek"),
      // 0=Dom..6=Sáb (para weekly)
      dayOfMonth: int("dayOfMonth"),
      // 1-28 (para monthly)
      retentionDays: int("retentionDays").default(30).notNull(),
      // dias para manter backups
      nextRunAt: timestamp("nextRunAt"),
      lastRunAt: timestamp("lastRunAt"),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    backupHistory = mysqlTable("backup_history", {
      id: int("id").autoincrement().primaryKey(),
      filename: varchar("filename", { length: 256 }).notNull(),
      fileUrl: text("fileUrl"),
      // URL S3 do arquivo
      fileKey: varchar("fileKey", { length: 512 }),
      // chave S3
      localPath: varchar("localPath", { length: 512 }),
      // caminho local (quando sem S3)
      fileSizeBytes: int("fileSizeBytes"),
      totalRecords: int("totalRecords"),
      status: mysqlEnum("backup_status", ["success", "error"]).default("success").notNull(),
      trigger: mysqlEnum("backup_trigger", ["manual", "scheduled"]).default("manual").notNull(),
      errorMessage: text("errorMessage"),
      createdAt: timestamp("createdAt").defaultNow().notNull()
    });
    systemSettings = mysqlTable("system_settings", {
      id: int("id").autoincrement().primaryKey(),
      key: varchar("key", { length: 64 }).notNull().unique(),
      value: text("value"),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    ipBlocks = mysqlTable("ip_blocks", {
      id: int("id").autoincrement().primaryKey(),
      name: varchar("name", { length: 128 }).notNull(),
      cidr: varchar("cidr", { length: 43 }).notNull(),
      // ex: 192.168.1.0/24
      networkAddress: varchar("networkAddress", { length: 39 }).notNull(),
      // primeiro IP
      broadcastAddress: varchar("broadcastAddress", { length: 39 }).notNull(),
      // último IP
      totalHosts: int("totalHosts").notNull(),
      gateway: varchar("gateway", { length: 39 }),
      dns1: varchar("dns1", { length: 39 }),
      dns2: varchar("dns2", { length: 39 }),
      vlan: int("vlan"),
      type: mysqlEnum("ip_block_type", ["infrastructure", "clients", "management", "transit", "loopback", "reserved", "other"]).default("other").notNull(),
      status: mysqlEnum("ip_block_status", ["active", "inactive", "reserved"]).default("active").notNull(),
      description: text("description"),
      roomId: int("roomId").references(() => rooms.id, { onDelete: "set null" }),
      notes: text("notes"),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    ipAddresses = mysqlTable("ip_addresses", {
      id: int("id").autoincrement().primaryKey(),
      blockId: int("blockId").notNull().references(() => ipBlocks.id, { onDelete: "cascade" }),
      address: varchar("address", { length: 39 }).notNull(),
      // ex: 192.168.1.10
      status: mysqlEnum("ip_address_status", ["free", "allocated", "reserved", "dhcp"]).default("free").notNull(),
      hostname: varchar("hostname", { length: 255 }),
      description: text("description"),
      equipmentId: int("equipmentId").references(() => equipments.id, { onDelete: "set null" }),
      macAddress: varchar("macAddress", { length: 17 }),
      owner: varchar("owner", { length: 128 }),
      // cliente ou setor
      lastSeen: timestamp("lastSeen"),
      notes: text("notes"),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    ipAuditLog = mysqlTable("ip_audit_log", {
      id: int("id").autoincrement().primaryKey(),
      blockId: int("blockId").notNull().references(() => ipBlocks.id, { onDelete: "cascade" }),
      addressId: int("addressId"),
      // null se o IP foi deletado
      address: varchar("address", { length: 39 }).notNull(),
      // snapshot do IP no momento
      action: mysqlEnum("ip_audit_action", ["allocated", "released", "updated", "deleted", "imported"]).notNull(),
      previousStatus: varchar("previousStatus", { length: 32 }),
      newStatus: varchar("newStatus", { length: 32 }),
      hostname: varchar("hostname", { length: 255 }),
      owner: varchar("owner", { length: 128 }),
      equipmentId: int("equipmentId"),
      equipmentName: varchar("equipmentName", { length: 128 }),
      // snapshot do nome
      performedBy: varchar("performedBy", { length: 128 }),
      userId: int("userId"),
      notes: text("notes"),
      createdAt: timestamp("createdAt").defaultNow().notNull()
    });
    equipmentInterfaces = mysqlTable("equipment_interfaces", {
      id: int("id").autoincrement().primaryKey(),
      equipmentId: int("equipmentId").notNull().references(() => equipments.id, { onDelete: "cascade" }),
      name: varchar("name", { length: 64 }).notNull(),
      // ex: eth0, GigabitEthernet0/1
      vlan: int("vlan"),
      // VLAN ID 1-4094
      ipAddress: varchar("ipAddress", { length: 43 }),
      // ex: 192.168.1.1/24
      macAddress: varchar("macAddress", { length: 17 }),
      ipBlockId: int("ipBlockId").references(() => ipBlocks.id, { onDelete: "set null" }),
      serviceDescription: varchar("serviceDescription", { length: 255 }),
      // ex: "Core MPLS", "Clientes"
      isPrimary: boolean("isPrimary").default(false).notNull(),
      // true = interface principal
      notes: text("notes"),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    powerSources = mysqlTable("power_sources", {
      id: int("id").autoincrement().primaryKey(),
      name: varchar("name", { length: 128 }).notNull(),
      // ex: "Retificadora R1 - Huawei ETP48100"
      type: mysqlEnum("ps_type", ["rectifier", "inverter", "ups", "grid", "generator", "other"]).notNull().default("rectifier"),
      manufacturer: varchar("manufacturer", { length: 128 }),
      // ex: "Huawei", "APC", "Powerware"
      model: varchar("model", { length: 128 }),
      // ex: "ETP48100-B1", "Smart-UPS 3000"
      roomId: int("roomId").references(() => rooms.id, { onDelete: "set null" }),
      location: varchar("location", { length: 255 }),
      // Localização física dentro da sala
      outputVoltage: float("outputVoltage"),
      // Tensão de saída em Volts (ex: 48.0)
      outputCurrentMax: float("outputCurrentMax"),
      // Corrente máxima em Amperes
      notes: text("notes"),
      // ─── Configuração SNMP ────────────────────────────────────────────────────
      snmpEnabled: boolean("snmpEnabled").default(false).notNull(),
      snmpHost: varchar("snmpHost", { length: 128 }),
      // IP ou hostname de gerência
      snmpPort: int("snmpPort").default(161),
      snmpVersion: mysqlEnum("snmp_version", ["v1", "v2c", "v3"]).default("v2c"),
      snmpCommunity: varchar("snmpCommunity", { length: 128 }),
      // Community string (v1/v2c)
      // SNMPv3
      snmpV3User: varchar("snmpV3User", { length: 128 }),
      snmpV3AuthProto: mysqlEnum("snmpv3_auth_proto", ["MD5", "SHA"]),
      snmpV3AuthKey: varchar("snmpV3AuthKey", { length: 255 }),
      snmpV3PrivProto: mysqlEnum("snmpv3_priv_proto", ["DES", "AES"]),
      snmpV3PrivKey: varchar("snmpV3PrivKey", { length: 255 }),
      // OIDs configuráveis
      oidOutputVoltage: varchar("oidOutputVoltage", { length: 128 }),
      // ex: 1.3.6.1.4.1.2011.6.199.1.2.1.1.0
      oidOutputCurrent: varchar("oidOutputCurrent", { length: 128 }),
      oidTemperature: varchar("oidTemperature", { length: 128 }),
      oidAlarmStatus: varchar("oidAlarmStatus", { length: 128 }),
      oidBatteryLevel: varchar("oidBatteryLevel", { length: 128 }),
      oidLoadPercent: varchar("oidLoadPercent", { length: 128 }),
      snmpPollInterval: int("snmpPollInterval").default(300),
      // Intervalo em segundos
      // Divisores de escala para conversão dos valores brutos SNMP
      snmpVoltageDivisor: float("snmpVoltageDivisor").default(1),
      // ex: 10 para valores em 0.1V
      snmpCurrentDivisor: float("snmpCurrentDivisor").default(1),
      // ex: 100 para valores em 0.01A
      snmpTempDivisor: float("snmpTempDivisor").default(1),
      // ex: 10 para valores em 0.1°C
      snmpBatteryDivisor: float("snmpBatteryDivisor").default(1),
      // ex: 10 para tensão bateria em 0.1V
      // Último valor coletado (cache)
      lastPollAt: timestamp("lastPollAt"),
      lastVoltage: float("lastVoltage"),
      lastCurrent: float("lastCurrent"),
      lastTemperature: float("lastTemperature"),
      lastAlarmStatus: varchar("lastAlarmStatus", { length: 64 }),
      lastBatteryLevel: float("lastBatteryLevel"),
      lastLoadPercent: float("lastLoadPercent"),
      lastPollError: text("lastPollError"),
      // ─── Thresholds de alerta ─────────────────────────────────────────────────
      alertsEnabled: boolean("alertsEnabled").default(false).notNull(),
      alertTempMax: float("alertTempMax"),
      // °C — acima dispara alerta
      alertVoltageMin: float("alertVoltageMin"),
      // V — abaixo dispara alerta
      alertVoltageMax: float("alertVoltageMax"),
      // V — acima dispara alerta
      alertBatteryMin: float("alertBatteryMin"),
      // V ou % — abaixo dispara alerta
      alertBatteryMax: float("alertBatteryMax"),
      // V ou % — acima dispara alerta
      alertCurrentMax: float("alertCurrentMax"),
      // A — acima dispara alerta
      alertLoadMax: float("alertLoadMax"),
      // % — acima dispara alerta
      alertAcFailEnabled: boolean("alertAcFailEnabled").default(false).notNull(),
      // monitorar falta de AC
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    snmpAlerts = mysqlTable("snmp_alerts", {
      id: int("id").autoincrement().primaryKey(),
      powerSourceId: int("powerSourceId").notNull().references(() => powerSources.id, { onDelete: "cascade" }),
      alertType: mysqlEnum("alert_type", [
        "temp_high",
        // Temperatura acima do limite
        "voltage_low",
        // Tensão de saída abaixo do mínimo
        "voltage_high",
        // Tensão de saída acima do máximo
        "battery_low",
        // Bateria abaixo do mínimo
        "battery_high",
        // Bateria acima do máximo (sobrecarga)
        "current_high",
        // Corrente acima do máximo
        "load_high",
        // Carga acima do máximo
        "ac_fail",
        // Falha na rede AC (tensão = 0 ou alarme ativo)
        "snmp_unreachable"
        // Equipamento não responde ao SNMP
      ]).notNull(),
      severity: mysqlEnum("alert_severity", ["warning", "critical"]).notNull().default("warning"),
      message: text("message").notNull(),
      currentValue: float("currentValue"),
      // Valor coletado que disparou o alerta
      thresholdValue: float("thresholdValue"),
      // Threshold configurado
      // Ciclo de vida do alerta
      acknowledgedAt: timestamp("acknowledgedAt"),
      acknowledgedBy: varchar("acknowledgedBy", { length: 128 }),
      resolvedAt: timestamp("resolvedAt"),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    tuyaDevices = mysqlTable("tuya_devices", {
      id: int("id").autoincrement().primaryKey(),
      name: varchar("name", { length: 128 }).notNull(),
      deviceId: varchar("deviceId", { length: 128 }).notNull().unique(),
      // ID do dispositivo na plataforma Tuya
      type: mysqlEnum("type", [
        "temperature_humidity",
        // Sensor de temperatura e umidade
        "temperature",
        // Sensor de temperatura
        "humidity",
        // Sensor de umidade
        "co2",
        // Sensor de CO₂
        "smoke",
        // Sensor de fumaça
        "motion",
        // Sensor de presença/movimento
        "door",
        // Sensor de porta/janela
        "power_meter",
        // Medidor de energia (tomada inteligente)
        "other"
        // Outro tipo
      ]).notNull().default("temperature_humidity"),
      tuyaAccountId: int("tuyaAccountId").references(() => tuyaAccounts.id, { onDelete: "set null" }),
      roomId: int("roomId").references(() => rooms.id, { onDelete: "set null" }),
      powerSourceId: int("powerSourceId").references(() => powerSources.id, { onDelete: "set null" }),
      notes: text("notes"),
      // Polling
      pollInterval: int("pollInterval").default(300).notNull(),
      // segundos
      lastPolledAt: timestamp("lastPolledAt"),
      lastPollError: text("lastPollError"),
      // Últimos valores coletados (cache)
      lastTemperature: float("lastTemperature"),
      lastHumidity: float("lastHumidity"),
      lastCo2: float("lastCo2"),
      lastPower: float("lastPower"),
      // W
      lastVoltage: float("lastVoltage"),
      // V
      lastCurrent: float("lastCurrent"),
      // A
      lastRawData: text("lastRawData"),
      // JSON com todos os DPs coletados
      // Status
      status: mysqlEnum("status", ["online", "offline", "unknown"]).default("unknown").notNull(),
      // Thresholds de alerta
      alertsEnabled: boolean("alertsEnabled").default(false).notNull(),
      alertTempMax: float("alertTempMax"),
      alertTempMin: float("alertTempMin"),
      alertHumidityMax: float("alertHumidityMax"),
      alertHumidityMin: float("alertHumidityMin"),
      alertCo2Max: float("alertCo2Max"),
      alertPowerMax: float("alertPowerMax"),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    tuyaAccounts = mysqlTable("tuya_accounts", {
      id: int("id").autoincrement().primaryKey(),
      name: varchar("name", { length: 128 }).notNull(),
      // Ex: "Conta Principal", "Cliente ABC"
      accessId: varchar("accessId", { length: 128 }).notNull(),
      // Client ID do projeto Tuya
      accessSecret: varchar("accessSecret", { length: 256 }).notNull(),
      // Client Secret
      region: mysqlEnum("region", ["us", "eu", "cn", "in"]).notNull().default("us"),
      notes: text("notes"),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    tuyaReadings = mysqlTable("tuya_readings", {
      id: int("id").autoincrement().primaryKey(),
      deviceId: int("deviceId").notNull().references(() => tuyaDevices.id, { onDelete: "cascade" }),
      temperature: float("temperature"),
      humidity: float("humidity"),
      co2: float("co2"),
      power: float("power"),
      voltage: float("voltage"),
      current: float("current"),
      rawData: text("rawData"),
      // JSON com todos os DPs coletados
      collectedAt: timestamp("collectedAt").defaultNow().notNull()
    });
    topologyLayouts = mysqlTable("topology_layouts", {
      id: int("id").autoincrement().primaryKey(),
      userId: int("userId").notNull(),
      // FK para users.id
      roomFilter: varchar("roomFilter", { length: 32 }).notNull().default("all"),
      // "all" ou roomId
      nodePositions: text("nodePositions").notNull(),
      // JSON: { [equipmentId]: { x, y } }
      ctrlPoints: text("ctrlPoints").notNull().default("{}"),
      // JSON: { "eqA-eqB": { x, y } }
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    snmpReadings = mysqlTable("snmp_readings", {
      id: int("id").autoincrement().primaryKey(),
      powerSourceId: int("powerSourceId").notNull().references(() => powerSources.id, { onDelete: "cascade" }),
      voltage: float("voltage"),
      current: float("current"),
      temperature: float("temperature"),
      batteryLevel: float("batteryLevel"),
      loadPercent: float("loadPercent"),
      alarmStatus: varchar("alarmStatus", { length: 64 }),
      collectedAt: timestamp("collectedAt").defaultNow().notNull()
    });
    racks = mysqlTable("racks", {
      id: int("id").autoincrement().primaryKey(),
      name: varchar("name", { length: 64 }).notNull(),
      // Ex: "RACK-01", "RACK-02"
      roomId: int("roomId").references(() => rooms.id, { onDelete: "cascade" }),
      totalUnits: int("totalUnits").default(44),
      // Altura total em U
      description: text("description"),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    ctos = mysqlTable("ctos", {
      id: int("id").autoincrement().primaryKey(),
      name: varchar("name", { length: 128 }).notNull(),
      address: varchar("address", { length: 256 }),
      capacity: int("capacity").default(8),
      // Total de portas
      usedPorts: int("usedPorts").default(0),
      // Portas usadas
      status: varchar("status", { length: 32 }).default("active"),
      // active | maintenance | inactive
      lat: double("lat"),
      // Latitude
      lng: double("lng"),
      // Longitude
      notes: text("notes"),
      sgpId: int("sgpId"),
      // ID da CTO no SGP (para sincronização)
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    mapElements = mysqlTable("map_elements", {
      id: int("id").autoincrement().primaryKey(),
      type: varchar("type", { length: 8 }).notNull(),
      // "ceo" | "cto"
      referenceId: int("referenceId").notNull(),
      // ID do CEO ou CTO
      lat: double("lat").notNull(),
      lng: double("lng").notNull(),
      color: varchar("color", { length: 16 }),
      // Cor personalizada do marcador (null = cor padrão por status)
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    mapRoutes = mysqlTable("map_routes", {
      id: int("id").autoincrement().primaryKey(),
      name: varchar("name", { length: 128 }),
      fromElementId: int("fromElementId"),
      // FK map_elements.id (null = cabo livre sem vínculo)
      toElementId: int("toElementId"),
      // FK map_elements.id (null = cabo livre sem vínculo)
      fromTubeId: int("fromTubeId"),
      // FK ceo_tubes.id ou cto_tubes.id (tubo de entrada na origem)
      toTubeId: int("toTubeId"),
      // FK ceo_tubes.id ou cto_tubes.id (tubo de entrada no destino)
      fiberCount: int("fiberCount").default(12),
      cableType: varchar("cableType", { length: 64 }).default("FO"),
      // FO, Metálico, etc.
      color: varchar("color", { length: 16 }).default("#22d3ee"),
      // Cor da linha no mapa
      path: text("path"),
      // JSON: [{lat, lng}] pontos intermediários
      notes: text("notes"),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    routeExtraTubes = mysqlTable("route_extra_tubes", {
      id: int("id").autoincrement().primaryKey(),
      routeId: int("routeId").notNull(),
      // FK map_routes.id
      elementId: int("elementId").notNull(),
      // FK map_elements.id (CEO ou CTO)
      tubeId: int("tubeId").notNull(),
      // FK ceo_tubes.id ou cto_tubes.id
      side: mysqlEnum("route_extra_tube_side", ["from", "to"]).notNull(),
      // Origem ou destino
      notes: text("notes"),
      createdAt: timestamp("createdAt").defaultNow().notNull()
    });
    sgpConfig = mysqlTable("sgp_config", {
      id: int("id").autoincrement().primaryKey(),
      baseUrl: varchar("baseUrl", { length: 256 }).notNull(),
      // Ex: https://empresa.tsmx.net.br
      token: varchar("token", { length: 512 }).notNull(),
      app: varchar("app", { length: 128 }).notNull(),
      active: boolean("active").default(true),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    ctoAlerts = mysqlTable("cto_alerts", {
      id: int("id").autoincrement().primaryKey(),
      ctoId: int("ctoId").notNull().references(() => ctos.id, { onDelete: "cascade" }),
      occupancyPct: int("occupancyPct").notNull(),
      // % de ocupação que disparou o alerta
      threshold: int("threshold").notNull().default(80),
      // Threshold configurado
      severity: mysqlEnum("cto_alert_severity", ["warning", "critical"]).notNull().default("warning"),
      message: text("message").notNull(),
      acknowledgedAt: timestamp("acknowledgedAt"),
      acknowledgedBy: varchar("acknowledgedBy", { length: 128 }),
      resolvedAt: timestamp("resolvedAt"),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    ctoAlertConfig = mysqlTable("cto_alert_config", {
      id: int("id").autoincrement().primaryKey(),
      enabled: boolean("enabled").default(false),
      warningThreshold: int("warningThreshold").default(80),
      // % para aviso
      criticalThreshold: int("criticalThreshold").default(90),
      // % para crítico
      checkIntervalMinutes: int("checkIntervalMinutes").default(60),
      // Verificar a cada N minutos
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    ctoTubes = mysqlTable("cto_tubes", {
      id: int("id").autoincrement().primaryKey(),
      ctoId: int("ctoId").notNull(),
      type: mysqlEnum("cto_tube_type", ["tube", "splitter"]).default("tube").notNull(),
      identifier: varchar("identifier", { length: 32 }).notNull(),
      // ex: "TUBO 1", "SPLITTER 1*8"
      totalVias: int("totalVias").default(12).notNull(),
      splitterType: mysqlEnum("cto_splitter_type", ["balanced", "unbalanced"]).default("balanced"),
      ratio: varchar("ratio", { length: 32 }),
      // ex: "1:8", "1:16", "1:2_90/10"
      color: varchar("color", { length: 32 }),
      notes: text("notes"),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    ctoVias = mysqlTable("cto_vias", {
      id: int("id").autoincrement().primaryKey(),
      tubeId: int("tubeId").notNull(),
      ctoId: int("ctoId").notNull(),
      viaNumber: int("viaNumber").notNull(),
      // 1, 2, 3...
      label: varchar("label", { length: 64 }),
      // etiqueta opcional
      fusedToViaId: int("fusedToViaId"),
      // id da via destino da fusão
      fusedToTubeId: int("fusedToTubeId"),
      // id do tubo destino
      fiberId: int("fiberId"),
      // fibra óptica associada a esta via
      notes: text("notes"),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    mapGroups = mysqlTable("map_groups", {
      id: int("id").autoincrement().primaryKey(),
      name: varchar("name", { length: 128 }).notNull(),
      color: varchar("color", { length: 16 }).default("#6366f1").notNull(),
      description: text("description"),
      parentId: int("parentId"),
      sortOrder: int("sortOrder").default(0).notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    mapElementGroups = mysqlTable("map_element_groups", {
      id: int("id").autoincrement().primaryKey(),
      elementId: int("elementId").notNull(),
      groupId: int("groupId").notNull()
    });
    mapRouteGroups = mysqlTable("map_route_groups", {
      id: int("id").autoincrement().primaryKey(),
      routeId: int("routeId").notNull(),
      groupId: int("groupId").notNull()
    });
    mapPoleGroups = mysqlTable("map_pole_groups", {
      id: int("id").autoincrement().primaryKey(),
      poleId: int("pole_id").notNull(),
      groupId: int("group_id").notNull()
    });
    mapReserveGroups = mysqlTable("map_reserve_groups", {
      id: int("id").autoincrement().primaryKey(),
      reserveId: int("reserve_id").notNull(),
      groupId: int("group_id").notNull()
    });
    appSettings = mysqlTable("app_settings", {
      id: int("id").autoincrement().primaryKey(),
      key: varchar("key", { length: 128 }).notNull().unique(),
      value: text("value"),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    sgpLinkHistory = mysqlTable("sgp_link_history", {
      id: int("id").autoincrement().primaryKey(),
      ctoId: int("ctoId").notNull().references(() => ctos.id, { onDelete: "cascade" }),
      ctoName: varchar("ctoName", { length: 128 }).notNull(),
      sgpId: int("sgpId"),
      // null quando desvinculado
      action: mysqlEnum("sgp_link_action", ["linked", "unlinked"]).notNull(),
      performedBy: varchar("performedBy", { length: 128 }),
      // nome/email do utilizador
      createdAt: timestamp("createdAt").defaultNow().notNull()
    });
    ceoBandejas = mysqlTable("ceo_bandejas", {
      id: int("id").autoincrement().primaryKey(),
      ceoId: int("ceoId").notNull(),
      number: int("number").notNull(),
      // número da bandeja (1, 2, 3...)
      label: varchar("label", { length: 64 }),
      // etiqueta opcional (ex: "Bandeja 1 - Entrada")
      notes: text("notes"),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    ceoSplitters = mysqlTable("ceo_splitters", {
      id: int("id").autoincrement().primaryKey(),
      ceoId: int("ceoId").notNull(),
      bandejaId: int("bandejaId").notNull(),
      // FK ceo_bandejas.id
      identifier: varchar("identifier", { length: 64 }).notNull(),
      // ex: "SPLITTER 1:8 #1"
      splitterType: mysqlEnum("ceo_splitter_type", ["balanced", "unbalanced"]).default("balanced").notNull(),
      ratio: varchar("ratio", { length: 32 }).notNull(),
      // ex: "1:8" ou "1:2_90/10"
      notes: text("notes"),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    ceoSplitterVias = mysqlTable("ceo_splitter_vias", {
      id: int("id").autoincrement().primaryKey(),
      splitterId: int("splitterId").notNull(),
      // FK ceo_splitters.id
      ceoId: int("ceoId").notNull(),
      viaNumber: int("viaNumber").notNull(),
      // 0=entrada, 1,2,...=saídas
      label: varchar("label", { length: 64 }),
      lossDb: float("lossDb"),
      // perda estimada em dB
      notes: text("notes"),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    ceoViaAssociations = mysqlTable("ceo_via_associations", {
      id: int("id").autoincrement().primaryKey(),
      ceoId: int("ceoId").notNull(),
      sourceType: mysqlEnum("ceo_assoc_source_type", ["tube", "splitter"]).notNull(),
      sourceViaId: int("sourceViaId").notNull(),
      // FK ceo_vias.id ou ceo_splitter_vias.id
      targetType: mysqlEnum("ceo_assoc_target_type", ["tube", "splitter"]).notNull(),
      targetViaId: int("targetViaId").notNull(),
      // FK ceo_vias.id ou ceo_splitter_vias.id
      notes: text("notes"),
      createdAt: timestamp("createdAt").defaultNow().notNull()
    });
    sshCredentials = mysqlTable("ssh_credentials", {
      id: int("id").autoincrement().primaryKey(),
      equipmentId: int("equipmentId").notNull().unique(),
      // FK equipments.id
      sshUser: varchar("sshUser", { length: 128 }).notNull(),
      sshPasswordEnc: text("sshPasswordEnc").notNull(),
      // AES-256-GCM encriptado
      sshPort: int("sshPort").notNull().default(22),
      notes: text("notes"),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    sshCommands = mysqlTable("ssh_commands", {
      id: int("id").autoincrement().primaryKey(),
      equipmentId: int("equipmentId").notNull(),
      // FK equipments.id
      name: varchar("name", { length: 128 }).notNull(),
      description: text("description"),
      commandLines: text("commandLines").notNull(),
      // JSON: string[]
      sleepMs: int("sleepMs").notNull().default(300),
      // sleep entre linhas (ms)
      confirmMode: mysqlEnum("ssh_confirm_mode", ["none", "auto_y", "auto_n", "manual"]).notNull().default("none"),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    sshExecutionLog = mysqlTable("ssh_execution_log", {
      id: int("id").autoincrement().primaryKey(),
      equipmentId: int("equipmentId").notNull(),
      commandId: int("commandId"),
      // null se executado ad-hoc
      commandName: varchar("commandName", { length: 128 }).notNull(),
      params: text("params"),
      // JSON: {key: value}
      output: text("output").notNull(),
      success: boolean("success").notNull().default(true),
      executedBy: varchar("executedBy", { length: 128 }),
      executedAt: timestamp("executedAt").defaultNow().notNull()
    });
    sshDevices = mysqlTable("ssh_devices", {
      id: int("id").autoincrement().primaryKey(),
      name: varchar("name", { length: 100 }).notNull(),
      host: varchar("host", { length: 255 }).notNull(),
      port: int("port").notNull().default(22),
      username: varchar("username", { length: 100 }).notNull(),
      authType: mysqlEnum("ssh_auth_type", ["password", "key"]).notNull().default("password"),
      password: text("password"),
      privateKey: text("private_key"),
      deviceType: varchar("device_type", { length: 50 }).default("generic"),
      notes: text("notes"),
      createdAt: timestamp("ssh_device_created_at").defaultNow().notNull(),
      updatedAt: timestamp("ssh_device_updated_at").defaultNow().onUpdateNow().notNull()
    });
    sshQuickCommands = mysqlTable("ssh_quick_commands", {
      id: int("id").autoincrement().primaryKey(),
      name: varchar("name", { length: 100 }).notNull(),
      description: text("description"),
      command: text("command").notNull(),
      category: varchar("category", { length: 50 }).default("diagnostico"),
      deviceType: varchar("device_type", { length: 50 }).default("generic"),
      isDangerous: int("is_dangerous").default(0),
      color: varchar("color", { length: 20 }).default("#3B82F6"),
      createdAt: timestamp("ssh_qcmd_created_at").defaultNow().notNull()
    });
    sshExecutions = mysqlTable("ssh_executions", {
      id: int("id").autoincrement().primaryKey(),
      deviceId: int("device_id").notNull(),
      commandName: varchar("command_name", { length: 100 }),
      commandText: text("command_text").notNull(),
      output: text("output"),
      status: mysqlEnum("ssh_exec_status", ["success", "error", "timeout"]).default("success"),
      durationMs: int("duration_ms"),
      executedBy: int("executed_by"),
      executedAt: timestamp("ssh_executed_at").defaultNow().notNull()
    });
    bgpPeers = mysqlTable("bgp_peers", {
      id: int("id").autoincrement().primaryKey(),
      deviceId: int("device_id").notNull(),
      peerIp: varchar("peer_ip", { length: 45 }).notNull(),
      remoteAs: int("remote_as").notNull(),
      description: varchar("description", { length: 200 }),
      peerType: mysqlEnum("bgp_peer_type", ["ebgp", "ibgp"]).default("ebgp"),
      localAs: int("local_as"),
      activateScript: text("activate_script"),
      deactivateScript: text("deactivate_script"),
      // IPv6 — campos independentes dos scripts IPv4
      peerIpv6: varchar("peer_ipv6", { length: 64 }),
      // Endereço IPv6 do peer
      activateScriptV6: text("activate_script_v6"),
      // Script de activação IPv6
      deactivateScriptV6: text("deactivate_script_v6"),
      // Script de desactivação IPv6
      notes: text("notes"),
      createdAt: timestamp("bgp_peer_created_at").defaultNow().notNull(),
      updatedAt: timestamp("bgp_peer_updated_at").defaultNow().onUpdateNow().notNull()
    });
    sshDeviceCommands = mysqlTable("ssh_device_commands", {
      id: int("id").autoincrement().primaryKey(),
      deviceId: int("device_id").notNull(),
      // FK sshDevices.id
      name: varchar("name", { length: 100 }).notNull(),
      description: text("description"),
      command: text("command").notNull(),
      category: varchar("category", { length: 50 }).default("diagnostico"),
      isDangerous: int("is_dangerous").default(0),
      color: varchar("color", { length: 20 }).default("#3B82F6"),
      sortOrder: int("sort_order").default(0),
      createdAt: timestamp("ssh_dcmd_created_at").defaultNow().notNull(),
      updatedAt: timestamp("ssh_dcmd_updated_at").defaultNow().onUpdateNow().notNull()
    });
    networkSnmpConfig = mysqlTable("network_snmp_config", {
      id: int("id").autoincrement().primaryKey(),
      equipmentId: int("equipmentId").notNull().unique().references(() => equipments.id, { onDelete: "cascade" }),
      enabled: boolean("enabled").default(false).notNull(),
      snmpHost: varchar("snmpHost", { length: 128 }),
      // IP ou hostname de gerência
      snmpPort: int("snmpPort").default(161),
      snmpVersion: mysqlEnum("net_snmp_version", ["v1", "v2c", "v3"]).default("v2c"),
      snmpCommunity: varchar("snmpCommunity", { length: 128 }),
      // Community string (v1/v2c)
      // SNMPv3
      snmpV3User: varchar("snmpV3User", { length: 128 }),
      snmpV3AuthProto: mysqlEnum("net_snmpv3_auth_proto", ["MD5", "SHA"]),
      snmpV3AuthKey: varchar("snmpV3AuthKey", { length: 255 }),
      snmpV3PrivProto: mysqlEnum("net_snmpv3_priv_proto", ["DES", "AES"]),
      snmpV3PrivKey: varchar("snmpV3PrivKey", { length: 255 }),
      pollInterval: int("pollInterval").default(300),
      // Intervalo em segundos
      // Alertas
      alertsEnabled: boolean("alertsEnabled").default(false).notNull(),
      alertCpuMax: float("alertCpuMax"),
      // % CPU — acima dispara alerta
      alertMemMax: float("alertMemMax"),
      // % Memória — acima dispara alerta
      alertTempMax: float("alertTempMax"),
      // °C — acima dispara alerta
      // Último poll
      lastPollAt: timestamp("lastPollAt"),
      lastPollError: text("lastPollError"),
      // Últimos valores coletados (cache)
      lastCpuPercent: float("lastCpuPercent"),
      lastMemPercent: float("lastMemPercent"),
      lastTemperature: float("lastTemperature"),
      lastUptimeSeconds: int("lastUptimeSeconds"),
      lastPortCount: int("lastPortCount"),
      createdAt: timestamp("net_snmp_created_at").defaultNow().notNull(),
      updatedAt: timestamp("net_snmp_updated_at").defaultNow().onUpdateNow().notNull()
    });
    networkSnmpPorts = mysqlTable("network_snmp_ports", {
      id: int("id").autoincrement().primaryKey(),
      equipmentId: int("equipmentId").notNull().references(() => equipments.id, { onDelete: "cascade" }),
      ifIndex: int("ifIndex").notNull(),
      // SNMP ifIndex
      ifName: varchar("ifName", { length: 64 }),
      // ex: GigabitEthernet0/1
      ifAlias: varchar("ifAlias", { length: 128 }),
      // Descrição/alias configurado
      ifSpeed: bigint("ifSpeed", { mode: "number" }),
      // Velocidade em bps (0xFFFFFFFF = desconhecido)
      ifType: varchar("ifType", { length: 32 }),
      // ethernetCsmacd, opticalChannel, etc.
      // Último estado coletado
      ifOperStatus: mysqlEnum("if_oper_status", ["up", "down", "testing", "unknown", "dormant", "notPresent", "lowerLayerDown"]).default("unknown"),
      ifAdminStatus: mysqlEnum("if_admin_status", ["up", "down", "testing"]).default("up"),
      // Tráfego (bytes/s calculado entre polls)
      lastInBps: float("lastInBps"),
      // bps de entrada
      lastOutBps: float("lastOutBps"),
      // bps de saída
      lastInOctets: bigint("lastInOctets", { mode: "number" }),
      // contador bruto entrada (32/64-bit)
      lastOutOctets: bigint("lastOutOctets", { mode: "number" }),
      // contador bruto saída (32/64-bit)
      // GBIC / Óptica (DOM — Digital Optical Monitoring)
      gbicEnabled: boolean("gbicEnabled").default(false).notNull(),
      lastRxPowerDbm: float("lastRxPowerDbm"),
      // Potência RX em dBm
      lastTxPowerDbm: float("lastTxPowerDbm"),
      // Potência TX em dBm
      lastGbicTemp: float("lastGbicTemp"),
      // Temperatura do GBIC em °C
      lastGbicVoltage: float("lastGbicVoltage"),
      // Tensão do GBIC em V
      // Alertas de sinal óptico
      alertRxMin: float("alertRxMin"),
      // dBm mínimo para RX
      alertRxMax: float("alertRxMax"),
      // dBm máximo para RX
      // Threshold de tráfego
      alertBpsMax: float("alertBpsMax"),
      // bps máximo para alerta de tráfego
      lastPollAt: timestamp("net_port_last_poll_at"),
      createdAt: timestamp("net_port_created_at").defaultNow().notNull(),
      updatedAt: timestamp("net_port_updated_at").defaultNow().onUpdateNow().notNull()
    });
    networkSnmpReadings = mysqlTable("network_snmp_readings", {
      id: int("id").autoincrement().primaryKey(),
      equipmentId: int("equipmentId").notNull().references(() => equipments.id, { onDelete: "cascade" }),
      cpuPercent: float("cpuPercent"),
      memPercent: float("memPercent"),
      temperature: float("temperature"),
      uptimeSeconds: int("uptimeSeconds"),
      collectedAt: timestamp("net_reading_collected_at").defaultNow().notNull()
    });
    networkPortReadings = mysqlTable("network_port_readings", {
      id: int("id").autoincrement().primaryKey(),
      portId: int("portId").notNull().references(() => networkSnmpPorts.id, { onDelete: "cascade" }),
      equipmentId: int("equipmentId").notNull(),
      inBps: float("inBps"),
      // bps de entrada
      outBps: float("outBps"),
      // bps de saída
      rxPowerDbm: float("rxPowerDbm"),
      // Potência RX em dBm
      txPowerDbm: float("txPowerDbm"),
      // Potência TX em dBm
      gbicTemp: float("gbicTemp"),
      collectedAt: timestamp("net_port_reading_at").defaultNow().notNull()
    });
    networkSnmpAlerts = mysqlTable("network_snmp_alerts", {
      id: int("id").autoincrement().primaryKey(),
      equipmentId: int("equipmentId").notNull().references(() => equipments.id, { onDelete: "cascade" }),
      portId: int("portId").references(() => networkSnmpPorts.id, { onDelete: "cascade" }),
      alertType: mysqlEnum("net_alert_type", [
        "cpu_high",
        "mem_high",
        "temp_high",
        "port_down",
        "port_up",
        "rx_power_low",
        "rx_power_high",
        "tx_power_low",
        "tx_power_high",
        "snmp_unreachable",
        "traffic_high"
      ]).notNull(),
      severity: mysqlEnum("net_alert_severity", ["info", "warning", "critical"]).notNull().default("warning"),
      message: text("message").notNull(),
      currentValue: float("currentValue"),
      thresholdValue: float("thresholdValue"),
      acknowledgedAt: timestamp("net_alert_ack_at"),
      acknowledgedBy: varchar("acknowledgedBy", { length: 128 }),
      resolvedAt: timestamp("net_alert_resolved_at"),
      createdAt: timestamp("net_alert_created_at").defaultNow().notNull(),
      updatedAt: timestamp("net_alert_updated_at").defaultNow().onUpdateNow().notNull()
    });
    mapOltElements = mysqlTable("map_olt_elements", {
      id: int("id").autoincrement().primaryKey(),
      equipmentId: int("equipmentId").notNull().references(() => equipments.id, { onDelete: "cascade" }),
      lat: double("lat").notNull(),
      lng: double("lng").notNull(),
      defaultTxPowerDbm: float("defaultTxPowerDbm").default(5),
      // Potência TX padrão em dBm (ex: +5.0)
      fiberAttenuationDbPerKm: float("fiberAttenuationDbPerKm").default(0.35),
      // Atenuação da fibra em dB/km
      fusionLossDb: float("fusionLossDb").default(0.1),
      // Perda por fusão/conector em dB
      notes: text("notes"),
      createdAt: timestamp("olt_map_created_at").defaultNow().notNull(),
      updatedAt: timestamp("olt_map_updated_at").defaultNow().onUpdateNow().notNull()
    });
    oltPortFiberLinks = mysqlTable("olt_port_fiber_links", {
      id: int("id").autoincrement().primaryKey(),
      oltElementId: int("oltElementId").notNull().references(() => mapOltElements.id, { onDelete: "cascade" }),
      portId: int("portId").notNull().references(() => ports.id, { onDelete: "cascade" }),
      txPowerDbm: float("txPowerDbm"),
      // Override da potência TX desta porta (null = usa defaultTxPowerDbm da OLT)
      ceoElementId: int("ceoElementId").notNull().references(() => mapElements.id, { onDelete: "cascade" }),
      tubeId: int("tubeId").notNull(),
      // FK ceo_tubes.id
      viaNumber: int("viaNumber").notNull(),
      // Número da via dentro do tubo
      notes: text("notes"),
      createdAt: timestamp("olt_link_created_at").defaultNow().notNull(),
      updatedAt: timestamp("olt_link_updated_at").defaultNow().onUpdateNow().notNull()
    });
    dgoPortFiberLinks = mysqlTable("dgo_port_fiber_links", {
      id: int("id").autoincrement().primaryKey(),
      dgoElementId: int("dgoElementId").notNull().references(() => mapDgoElements.id, { onDelete: "cascade" }),
      portId: int("portId").notNull().references(() => ports.id, { onDelete: "cascade" }),
      txPowerDbm: float("txPowerDbm"),
      // Override da potência TX desta porta (null = usa txPowerDbm do equipamento)
      ceoElementId: int("ceoElementId").notNull().references(() => mapElements.id, { onDelete: "cascade" }),
      tubeId: int("tubeId").notNull(),
      // FK ceo_tubes.id
      viaNumber: int("viaNumber").notNull(),
      // Número da via dentro do tubo
      notes: text("notes"),
      createdAt: timestamp("dgo_link_created_at").defaultNow().notNull(),
      updatedAt: timestamp("dgo_link_updated_at").defaultNow().onUpdateNow().notNull()
    });
    ctoViaAssociations = mysqlTable("cto_via_associations", {
      id: int("id").autoincrement().primaryKey(),
      ctoId: int("ctoId").notNull(),
      sourceType: mysqlEnum("cto_assoc_source_type", ["tube", "splitter"]).notNull(),
      sourceViaId: int("sourceViaId").notNull(),
      // FK cto_vias.id
      targetType: mysqlEnum("cto_assoc_target_type", ["tube", "splitter"]).notNull(),
      targetViaId: int("targetViaId").notNull(),
      // FK cto_vias.id
      notes: text("notes"),
      createdAt: timestamp("cto_assoc_created_at").defaultNow().notNull()
    });
    mapPoles = mysqlTable("map_poles", {
      id: int("id").autoincrement().primaryKey(),
      name: varchar("name", { length: 128 }).notNull(),
      reference: varchar("reference", { length: 128 }),
      // Referência/código do poste
      effort: varchar("effort", { length: 64 }),
      // Esforço (ex: "600 daN", "Simples", "Duplo")
      lat: double("lat").notNull(),
      lng: double("lng").notNull(),
      notes: text("notes"),
      createdAt: timestamp("pole_created_at").defaultNow().notNull(),
      updatedAt: timestamp("pole_updated_at").defaultNow().onUpdateNow().notNull()
    });
    mapTechnicalReserves = mysqlTable("map_technical_reserves", {
      id: int("id").autoincrement().primaryKey(),
      name: varchar("name", { length: 128 }).notNull(),
      sizeMeters: int("sizeMeters").notNull().default(0),
      // Comprimento da reserva em metros
      routeId: int("routeId"),
      // FK map_routes.id (opcional)
      lat: double("lat").notNull(),
      lng: double("lng").notNull(),
      notes: text("notes"),
      createdAt: timestamp("reserve_created_at").defaultNow().notNull(),
      updatedAt: timestamp("reserve_updated_at").defaultNow().onUpdateNow().notNull()
    });
    mapPois = mysqlTable("map_pois", {
      id: int("id").autoincrement().primaryKey(),
      name: varchar("name", { length: 128 }).notNull(),
      category: varchar("category", { length: 64 }).notNull().default("geral"),
      // ex: camera, predio, antena, geral
      lat: double("lat").notNull(),
      lng: double("lng").notNull(),
      notes: text("notes"),
      color: varchar("color", { length: 16 }).default("#6366f1"),
      createdAt: timestamp("poi_created_at").defaultNow().notNull(),
      updatedAt: timestamp("poi_updated_at").defaultNow().onUpdateNow().notNull()
    });
    mapPoiGroups = mysqlTable("map_poi_groups", {
      id: int("id").autoincrement().primaryKey(),
      poiId: int("poiId").notNull().references(() => mapPois.id, { onDelete: "cascade" }),
      groupId: int("groupId").notNull().references(() => mapGroups.id, { onDelete: "cascade" })
    });
    mapOltGroups = mysqlTable("map_olt_groups", {
      id: int("id").autoincrement().primaryKey(),
      oltId: int("oltId").notNull().references(() => mapOltElements.id, { onDelete: "cascade" }),
      groupId: int("groupId").notNull().references(() => mapGroups.id, { onDelete: "cascade" })
    });
    mapDgoElements = mysqlTable("map_dgo_elements", {
      id: int("id").autoincrement().primaryKey(),
      equipmentId: int("equipmentId").notNull().references(() => equipments.id, { onDelete: "cascade" }),
      lat: double("lat").notNull(),
      lng: double("lng").notNull(),
      notes: text("notes"),
      createdAt: timestamp("dgo_map_created_at").defaultNow().notNull(),
      updatedAt: timestamp("dgo_map_updated_at").defaultNow().onUpdateNow().notNull()
    });
    dgoSlotCableLinks = mysqlTable("dgo_slot_cable_links", {
      id: int("id").autoincrement().primaryKey(),
      dgoElementId: int("dgoElementId").notNull().references(() => mapDgoElements.id, { onDelete: "cascade" }),
      slotId: int("slotId").notNull(),
      // FK equipment_slots.id (bandeja do DGO)
      routeId: int("routeId").notNull(),
      // FK map_routes.id (cabo vinculado)
      side: mysqlEnum("dgo_link_side", ["in", "out"]).notNull(),
      // "in" = cabo entra, "out" = cabo sai
      tubeId: int("tubeId"),
      // FK ceo_tubes.id (tubo do cabo nesta bandeja, opcional)
      tubeElementId: int("tubeElementId"),
      // FK map_elements.id do CEO/CTO de onde vem o tubo (opcional)
      notes: text("notes"),
      createdAt: timestamp("dgo_link_created_at").defaultNow().notNull()
    });
    dgoPortLinks = mysqlTable("dgo_port_links", {
      id: int("id").autoincrement().primaryKey(),
      dgoElementId: int("dgoElementId").notNull(),
      // FK map_dgo_elements.id
      slotId: int("slotId").notNull(),
      // FK equipment_slots.id (bandeja)
      portNumber: int("portNumber").notNull(),
      // 1..N (porta dentro da bandeja)
      ceoElementId: int("ceoElementId"),
      // FK map_elements.id (CEO de passagem, opcional)
      portId: int("portId"),
      // FK ports.id (porta do equipamento: OLT, switch, etc.)
      notes: text("notes"),
      createdAt: timestamp("dgo_port_link_created_at").defaultNow().notNull(),
      updatedAt: timestamp("dgo_port_link_updated_at").defaultNow().onUpdateNow().notNull()
    });
    mapDgoGroups = mysqlTable("map_dgo_groups", {
      id: int("id").autoincrement().primaryKey(),
      dgoId: int("dgoId").notNull().references(() => mapDgoElements.id, { onDelete: "cascade" }),
      groupId: int("groupId").notNull().references(() => mapGroups.id, { onDelete: "cascade" })
    });
  }
});

// server/_core/env.ts
var ENV;
var init_env = __esm({
  "server/_core/env.ts"() {
    "use strict";
    ENV = {
      appId: process.env.VITE_APP_ID ?? "",
      cookieSecret: process.env.JWT_SECRET ?? "",
      databaseUrl: process.env.DATABASE_URL ?? "",
      oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
      ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
      isProduction: process.env.NODE_ENV === "production",
      forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
      forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? ""
    };
  }
});

// server/_core/tenantContext.ts
import { AsyncLocalStorage } from "async_hooks";
function runWithTenantDb(tenantDb, fn) {
  return tenantDbStorage.run(tenantDb, fn);
}
function getTenantDbFromContext() {
  return tenantDbStorage.getStore() ?? null;
}
var tenantDbStorage;
var init_tenantContext = __esm({
  "server/_core/tenantContext.ts"() {
    "use strict";
    tenantDbStorage = new AsyncLocalStorage();
  }
});

// server/db.ts
var db_exports = {};
__export(db_exports, {
  acknowledgeCtoAlert: () => acknowledgeCtoAlert,
  acknowledgeSnmpAlert: () => acknowledgeSnmpAlert,
  addDgoToGroup: () => addDgoToGroup,
  addElementToGroup: () => addElementToGroup,
  addOltToGroup: () => addOltToGroup,
  addPoiToGroup: () => addPoiToGroup,
  addPoleToGroup: () => addPoleToGroup,
  addReserveToGroup: () => addReserveToGroup,
  addRouteExtraTube: () => addRouteExtraTube,
  addRouteToGroup: () => addRouteToGroup,
  addSgpLinkHistory: () => addSgpLinkHistory,
  bulkCreatePorts: () => bulkCreatePorts,
  bulkImportEquipments: () => bulkImportEquipments,
  bulkImportFibers: () => bulkImportFibers,
  calculateOpticalBalance: () => calculateOpticalBalance,
  calculateOpticalBalanceFromDgo: () => calculateOpticalBalanceFromDgo,
  checkAndCreateCtoAlerts: () => checkAndCreateCtoAlerts,
  clearCtoViaFusion: () => clearCtoViaFusion,
  clearViaFusion: () => clearViaFusion,
  countActiveCtoAlerts: () => countActiveCtoAlerts,
  countActiveSnmpAlerts: () => countActiveSnmpAlerts,
  createBackupHistoryEntry: () => createBackupHistoryEntry,
  createCeo: () => createCeo,
  createCeoBandeja: () => createCeoBandeja,
  createCeoSplitter: () => createCeoSplitter,
  createCeoTube: () => createCeoTube,
  createConnection: () => createConnection,
  createCto: () => createCto,
  createCtoTube: () => createCtoTube,
  createCtoViaAssociation: () => createCtoViaAssociation,
  createDgoPortFiberLink: () => createDgoPortFiberLink,
  createDgoSlotCableLink: () => createDgoSlotCableLink,
  createEquipment: () => createEquipment,
  createFiber: () => createFiber,
  createMaintenanceRecord: () => createMaintenanceRecord,
  createMapDgoElement: () => createMapDgoElement,
  createMapGroup: () => createMapGroup,
  createMapOltElement: () => createMapOltElement,
  createMapPoi: () => createMapPoi,
  createMapPole: () => createMapPole,
  createMapRoute: () => createMapRoute,
  createMapTechnicalReserve: () => createMapTechnicalReserve,
  createOltPortLink: () => createOltPortLink,
  createPort: () => createPort,
  createPowerSource: () => createPowerSource,
  createRack: () => createRack,
  createRoom: () => createRoom,
  createSlot: () => createSlot,
  createSnmpAlert: () => createSnmpAlert,
  createTuyaAccount: () => createTuyaAccount,
  createTuyaDevice: () => createTuyaDevice,
  createTuyaReading: () => createTuyaReading,
  createViaAssociation: () => createViaAssociation,
  deleteBackupHistoryEntry: () => deleteBackupHistoryEntry,
  deleteCeo: () => deleteCeo,
  deleteCeoBandeja: () => deleteCeoBandeja,
  deleteCeoSplitter: () => deleteCeoSplitter,
  deleteCeoTube: () => deleteCeoTube,
  deleteConnection: () => deleteConnection,
  deleteCto: () => deleteCto,
  deleteCtoTube: () => deleteCtoTube,
  deleteCtoViaAssociation: () => deleteCtoViaAssociation,
  deleteCtoViaAssociationByVias: () => deleteCtoViaAssociationByVias,
  deleteDgoPortFiberLink: () => deleteDgoPortFiberLink,
  deleteDgoPortLink: () => deleteDgoPortLink,
  deleteDgoSlotCableLink: () => deleteDgoSlotCableLink,
  deleteEquipment: () => deleteEquipment,
  deleteFiber: () => deleteFiber,
  deleteMapDgoElement: () => deleteMapDgoElement,
  deleteMapElement: () => deleteMapElement,
  deleteMapGroup: () => deleteMapGroup,
  deleteMapOltElement: () => deleteMapOltElement,
  deleteMapPoi: () => deleteMapPoi,
  deleteMapPole: () => deleteMapPole,
  deleteMapRoute: () => deleteMapRoute,
  deleteMapTechnicalReserve: () => deleteMapTechnicalReserve,
  deleteOldBackupEntries: () => deleteOldBackupEntries,
  deleteOltPortLink: () => deleteOltPortLink,
  deletePort: () => deletePort,
  deletePowerSource: () => deletePowerSource,
  deleteRack: () => deleteRack,
  deleteRoom: () => deleteRoom,
  deleteRouteExtraTube: () => deleteRouteExtraTube,
  deleteRouteExtraTubesByRoute: () => deleteRouteExtraTubesByRoute,
  deleteSlot: () => deleteSlot,
  deleteTuyaAccount: () => deleteTuyaAccount,
  deleteTuyaDevice: () => deleteTuyaDevice,
  deleteUser: () => deleteUser,
  deleteViaAssociation: () => deleteViaAssociation,
  deleteViaAssociationByVias: () => deleteViaAssociationByVias,
  exportFullBackup: () => exportFullBackup,
  getAllDgoGroupMemberships: () => getAllDgoGroupMemberships,
  getAllElementGroupMemberships: () => getAllElementGroupMemberships,
  getAllOltGroupMemberships: () => getAllOltGroupMemberships,
  getAllPoiGroupMemberships: () => getAllPoiGroupMemberships,
  getAllPoleGroupMemberships: () => getAllPoleGroupMemberships,
  getAllPortLinks: () => getAllPortLinks,
  getAllReserveGroupMemberships: () => getAllReserveGroupMemberships,
  getAllRouteGroupMemberships: () => getAllRouteGroupMemberships,
  getAllUsers: () => getAllUsers,
  getBackupHistory: () => getBackupHistory,
  getBackupSchedule: () => getBackupSchedule,
  getBandejasByCeo: () => getBandejasByCeo,
  getCeoById: () => getCeoById,
  getCeos: () => getCeos,
  getConnectionById: () => getConnectionById,
  getConnections: () => getConnections,
  getCtoAlertConfig: () => getCtoAlertConfig,
  getCtoAlerts: () => getCtoAlerts,
  getCtoById: () => getCtoById,
  getCtos: () => getCtos,
  getDashboardStats: () => getDashboardStats,
  getDb: () => getDb,
  getDgoPortFiberLinks: () => getDgoPortFiberLinks,
  getDgoPortLinks: () => getDgoPortLinks,
  getDgoSlotCableLinks: () => getDgoSlotCableLinks,
  getDgoSlotCtoBalances: () => getDgoSlotCtoBalances,
  getElementGroups: () => getElementGroups,
  getEquipmentById: () => getEquipmentById,
  getEquipments: () => getEquipments,
  getFiberById: () => getFiberById,
  getFibers: () => getFibers,
  getGroupMembers: () => getGroupMembers,
  getLatestTuyaReadings: () => getLatestTuyaReadings,
  getMaintenanceHistory: () => getMaintenanceHistory,
  getMapDgoElementById: () => getMapDgoElementById,
  getMapDgoElements: () => getMapDgoElements,
  getMapElements: () => getMapElements,
  getMapGroups: () => getMapGroups,
  getMapOltElementById: () => getMapOltElementById,
  getMapOltElements: () => getMapOltElements,
  getMapPoiById: () => getMapPoiById,
  getMapPois: () => getMapPois,
  getMapPoleById: () => getMapPoleById,
  getMapPoles: () => getMapPoles,
  getMapRoutes: () => getMapRoutes,
  getMapTechnicalReserveById: () => getMapTechnicalReserveById,
  getMapTechnicalReserves: () => getMapTechnicalReserves,
  getMapTechnicalReservesByRoute: () => getMapTechnicalReservesByRoute,
  getOccupancyReport: () => getOccupancyReport,
  getOltPortLinks: () => getOltPortLinks,
  getPortById: () => getPortById,
  getPortsByEquipment: () => getPortsByEquipment,
  getPortsByEquipmentForDgo: () => getPortsByEquipmentForDgo,
  getPortsBySlot: () => getPortsBySlot,
  getPowerSourceById: () => getPowerSourceById,
  getPowerSources: () => getPowerSources,
  getRackById: () => getRackById,
  getRacks: () => getRacks,
  getRoomById: () => getRoomById,
  getRoomReport: () => getRoomReport,
  getRooms: () => getRooms,
  getRouteExtraTubes: () => getRouteExtraTubes,
  getRouteGroups: () => getRouteGroups,
  getRoutesOccupancy: () => getRoutesOccupancy,
  getSgpConfig: () => getSgpConfig,
  getSgpLinkHistory: () => getSgpLinkHistory,
  getSlotById: () => getSlotById,
  getSlotsByEquipment: () => getSlotsByEquipment,
  getSnmpAlerts: () => getSnmpAlerts,
  getSnmpReadings: () => getSnmpReadings,
  getSplitterViasByCeo: () => getSplitterViasByCeo,
  getSplitterViasBySplitter: () => getSplitterViasBySplitter,
  getSplittersByBandeja: () => getSplittersByBandeja,
  getSplittersByCeo: () => getSplittersByCeo,
  getSystemSettings: () => getSystemSettings,
  getTechnicalReserveExtraMeters: () => getTechnicalReserveExtraMeters,
  getTopologyData: () => getTopologyData,
  getTopologyLayout: () => getTopologyLayout,
  getTubesByCeo: () => getTubesByCeo,
  getTubesByCto: () => getTubesByCto,
  getTubesByMapElement: () => getTubesByMapElement,
  getTuyaAccountById: () => getTuyaAccountById,
  getTuyaAccounts: () => getTuyaAccounts,
  getTuyaDeviceById: () => getTuyaDeviceById,
  getTuyaDevices: () => getTuyaDevices,
  getTuyaReadingsByDevice: () => getTuyaReadingsByDevice,
  getUserByEmail: () => getUserByEmail,
  getUserById: () => getUserById,
  getUserByOpenId: () => getUserByOpenId,
  getViaAssociationsByCeo: () => getViaAssociationsByCeo,
  getViaAssociationsByCto: () => getViaAssociationsByCto,
  getViasByCeo: () => getViasByCeo,
  getViasByCto: () => getViasByCto,
  getViasByCtotube: () => getViasByCtotube,
  getViasByTube: () => getViasByTube,
  hasActiveAlertOfType: () => hasActiveAlertOfType,
  listUsersForAdmin: () => listUsersForAdmin,
  removeDgoFromGroup: () => removeDgoFromGroup,
  removeElementFromGroup: () => removeElementFromGroup,
  removeOltFromAllGroups: () => removeOltFromAllGroups,
  removeOltFromGroup: () => removeOltFromGroup,
  removePoiFromGroup: () => removePoiFromGroup,
  removePoleFromAllGroups: () => removePoleFromAllGroups,
  removePoleFromGroup: () => removePoleFromGroup,
  removeReserveFromAllGroups: () => removeReserveFromAllGroups,
  removeReserveFromGroup: () => removeReserveFromGroup,
  removeRouteFromGroup: () => removeRouteFromGroup,
  reorderMapGroups: () => reorderMapGroups,
  resolveAlertsByTypeAndSource: () => resolveAlertsByTypeAndSource,
  resolveCtoAlert: () => resolveCtoAlert,
  resolveSnmpAlert: () => resolveSnmpAlert,
  restoreFromBackup: () => restoreFromBackup,
  saveCtoAlertConfig: () => saveCtoAlertConfig,
  saveSgpConfig: () => saveSgpConfig,
  saveSnmpReading: () => saveSnmpReading,
  saveTopologyLayout: () => saveTopologyLayout,
  searchPorts: () => searchPorts,
  setCtoViaFiber: () => setCtoViaFiber,
  setCtoViaFusion: () => setCtoViaFusion,
  setSystemSetting: () => setSystemSetting,
  setSystemSettings: () => setSystemSettings,
  setUserPassword: () => setUserPassword,
  setViaFiber: () => setViaFiber,
  setViaFusion: () => setViaFusion,
  setViaFusionToSplitter: () => setViaFusionToSplitter,
  traceOtdrPath: () => traceOtdrPath,
  updateCeo: () => updateCeo,
  updateCeoBandeja: () => updateCeoBandeja,
  updateCeoSplitter: () => updateCeoSplitter,
  updateCeoSplitterVia: () => updateCeoSplitterVia,
  updateCeoTube: () => updateCeoTube,
  updateConnection: () => updateConnection,
  updateCto: () => updateCto,
  updateCtoTube: () => updateCtoTube,
  updateCtoVia: () => updateCtoVia,
  updateDgoPortFiberLink: () => updateDgoPortFiberLink,
  updateEquipment: () => updateEquipment,
  updateEquipmentImage: () => updateEquipmentImage,
  updateFiber: () => updateFiber,
  updateMapDgoElement: () => updateMapDgoElement,
  updateMapGroup: () => updateMapGroup,
  updateMapOltElement: () => updateMapOltElement,
  updateMapPoi: () => updateMapPoi,
  updateMapPole: () => updateMapPole,
  updateMapRoute: () => updateMapRoute,
  updateMapTechnicalReserve: () => updateMapTechnicalReserve,
  updateOltPortLink: () => updateOltPortLink,
  updatePort: () => updatePort,
  updatePowerSource: () => updatePowerSource,
  updatePowerSourceSnmpData: () => updatePowerSourceSnmpData,
  updateRack: () => updateRack,
  updateRoom: () => updateRoom,
  updateScheduleNextRun: () => updateScheduleNextRun,
  updateSlot: () => updateSlot,
  updateTuyaAccount: () => updateTuyaAccount,
  updateTuyaDevice: () => updateTuyaDevice,
  updateTuyaDeviceStatus: () => updateTuyaDeviceStatus,
  updateUserRole: () => updateUserRole,
  updateVia: () => updateVia,
  upsertBackupSchedule: () => upsertBackupSchedule,
  upsertDgoPortLink: () => upsertDgoPortLink,
  upsertMapElement: () => upsertMapElement,
  upsertUser: () => upsertUser
});
import { and, desc, eq, gte, inArray, isNull, like, or, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2";
function createPool() {
  const pool = mysql.createPool({
    uri: process.env.DATABASE_URL,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 3e4,
    connectTimeout: 1e4
    // Sem timezone forçado — usar timezone do servidor MySQL (consistente com timestamps guardados)
  });
  pool.on("connection", (conn) => {
    conn.on("error", (err) => {
      if (err.code === "ECONNRESET" || err.code === "PROTOCOL_CONNECTION_LOST" || err.code === "ENOTFOUND") {
        console.warn("[Database] Connection lost, pool will reconnect automatically:", err.code);
        _db = null;
        _pool = null;
      }
    });
  });
  return pool;
}
async function getDb() {
  const tenantDb = getTenantDbFromContext();
  if (tenantDb) return tenantDb;
  if (!_db && process.env.DATABASE_URL) {
    try {
      if (!_pool) {
        _pool = createPool();
      }
      _db = drizzle(_pool.promise());
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
      _pool = null;
    }
  }
  return _db;
}
async function upsertUser(user) {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) return;
  const values = { openId: user.openId };
  const updateSet = {};
  const textFields = ["name", "email", "loginMethod"];
  textFields.forEach((field) => {
    const value = user[field];
    if (value === void 0) return;
    const normalized = value ?? null;
    values[field] = normalized;
    updateSet[field] = normalized;
  });
  if (user.lastSignedIn !== void 0) {
    values.lastSignedIn = user.lastSignedIn;
    updateSet.lastSignedIn = user.lastSignedIn;
  }
  if (user.role !== void 0) {
    values.role = user.role;
    updateSet.role = user.role;
  } else if (user.openId === ENV.ownerOpenId) {
    values.role = "admin";
    updateSet.role = "admin";
  }
  if (!values.lastSignedIn) values.lastSignedIn = /* @__PURE__ */ new Date();
  if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = /* @__PURE__ */ new Date();
  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}
async function getUserByOpenId(openId) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : void 0;
}
async function getRooms() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(rooms).orderBy(rooms.name);
}
async function getRoomById(id) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select().from(rooms).where(eq(rooms.id, id)).limit(1);
  return result[0];
}
async function createRoom(data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const result = await db.insert(rooms).values(data);
  return result[0];
}
async function updateRoom(id, data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(rooms).set(data).where(eq(rooms.id, id));
}
async function deleteRoom(id) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.delete(rooms).where(eq(rooms.id, id));
}
async function getEquipments(search, type, roomId, status, ipSearch) {
  const db = await getDb();
  if (!db) return [];
  const conditions = [];
  if (search) conditions.push(or(
    like(equipments.name, `%${search}%`),
    like(equipments.model, `%${search}%`),
    like(equipments.manufacturer, `%${search}%`)
  ));
  if (ipSearch) conditions.push(or(
    like(equipments.ipAddress, `%${ipSearch}%`),
    like(equipments.interfaceIp, `%${ipSearch}%`),
    like(equipments.serviceDescription, `%${ipSearch}%`),
    sql`cast(${equipments.vlan} as char) like ${`%${ipSearch}%`}`
  ));
  if (type) conditions.push(eq(equipments.type, type));
  if (roomId) conditions.push(eq(equipments.roomId, roomId));
  if (status) conditions.push(eq(equipments.status, status));
  const query = db.select({
    id: equipments.id,
    name: equipments.name,
    type: equipments.type,
    model: equipments.model,
    manufacturer: equipments.manufacturer,
    serialNumber: equipments.serialNumber,
    roomId: equipments.roomId,
    rack: equipments.rack,
    rackPosition: equipments.rackPosition,
    ipAddress: equipments.ipAddress,
    macAddress: equipments.macAddress,
    totalPorts: equipments.totalPorts,
    notes: equipments.notes,
    status: equipments.status,
    createdAt: equipments.createdAt,
    updatedAt: equipments.updatedAt,
    roomName: rooms.name,
    imageUrl: equipments.imageUrl,
    // Campos de rede
    vlan: equipments.vlan,
    interfaceIp: equipments.interfaceIp,
    ipBlockId: equipments.ipBlockId,
    serviceDescription: equipments.serviceDescription,
    // Campos de energia
    powerType: equipments.powerType,
    powerSource: equipments.powerSource,
    powerSourceLabel: equipments.powerSourceLabel,
    powerSourceId: equipments.powerSourceId,
    // Altura em rack
    rackUnits: equipments.rackUnits,
    // Campos SSH
    sshUser: equipments.sshUser,
    sshPort: equipments.sshPort
    // Nota: sshPasswordEnc não é retornado na listagem por segurança
  }).from(equipments).leftJoin(rooms, eq(equipments.roomId, rooms.id));
  const rows = conditions.length > 0 ? await query.where(and(...conditions)).orderBy(equipments.name) : await query.orderBy(equipments.name);
  const portCounts = await db.select({
    equipmentId: ports.equipmentId,
    total: sql`count(*)`,
    occupied: sql`sum(case when ${ports.status} = 'occupied' then 1 else 0 end)`
  }).from(ports).groupBy(ports.equipmentId);
  const occMap = new Map(portCounts.map((r) => [r.equipmentId, r]));
  return rows.map((row) => {
    const occ = occMap.get(row.id);
    const total = Number(occ?.total ?? 0);
    const occupied = Number(occ?.occupied ?? 0);
    return {
      ...row,
      portOccupancy: total > 0 ? { total, occupied, rate: Math.round(occupied / total * 100) } : null
    };
  });
}
async function getEquipmentById(id) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select({
    id: equipments.id,
    name: equipments.name,
    type: equipments.type,
    model: equipments.model,
    manufacturer: equipments.manufacturer,
    serialNumber: equipments.serialNumber,
    roomId: equipments.roomId,
    rack: equipments.rack,
    rackPosition: equipments.rackPosition,
    ipAddress: equipments.ipAddress,
    macAddress: equipments.macAddress,
    totalPorts: equipments.totalPorts,
    notes: equipments.notes,
    status: equipments.status,
    createdAt: equipments.createdAt,
    updatedAt: equipments.updatedAt,
    roomName: rooms.name
  }).from(equipments).leftJoin(rooms, eq(equipments.roomId, rooms.id)).where(eq(equipments.id, id)).limit(1);
  return result[0];
}
async function createEquipment(data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const result = await db.insert(equipments).values(data);
  return result[0];
}
async function updateEquipment(id, data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(equipments).set(data).where(eq(equipments.id, id));
}
async function deleteEquipment(id) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.delete(equipments).where(eq(equipments.id, id));
}
async function getPortsByEquipment(equipmentId) {
  const db = await getDb();
  if (!db) return [];
  const portRows = await db.select({
    id: ports.id,
    equipmentId: ports.equipmentId,
    slotId: ports.slotId,
    portNumber: ports.portNumber,
    label: ports.label,
    type: ports.type,
    speed: ports.speed,
    status: ports.status,
    notes: ports.notes,
    sortOrder: ports.sortOrder,
    connectedToEquipmentId: ports.connectedToEquipmentId,
    connectedToPortId: ports.connectedToPortId,
    createdAt: ports.createdAt,
    connectedEquipmentName: equipments.name,
    connectedPortNumber: sql`connected_port.portNumber`,
    connectedPortLabel: sql`connected_port.label`,
    connectedPortSlotId: sql`connected_port.slotId`
  }).from(ports).leftJoin(equipments, eq(ports.connectedToEquipmentId, equipments.id)).leftJoin(
    sql`${ports} AS connected_port`,
    sql`connected_port.id = ${ports.connectedToPortId}`
  ).where(eq(ports.equipmentId, equipmentId));
  const slotIds = Array.from(new Set(portRows.map((p) => p.slotId).filter(Boolean)));
  const connectedSlotIds = Array.from(new Set(
    portRows.map((p) => p.connectedPortSlotId).filter(Boolean)
  ));
  const allSlotIds = Array.from(/* @__PURE__ */ new Set([...slotIds, ...connectedSlotIds]));
  let slotMap = /* @__PURE__ */ new Map();
  if (allSlotIds.length > 0) {
    const slotRows = await db.select({ id: equipmentSlots.id, slotNumber: equipmentSlots.slotNumber, label: equipmentSlots.label }).from(equipmentSlots).where(sql`${equipmentSlots.id} IN (${sql.join(allSlotIds.map((id) => sql`${id}`), sql`, `)})`);
    slotMap = new Map(slotRows.map((s) => [s.id, { slotNumber: s.slotNumber, slotLabel: s.label ?? null }]));
  }
  const rows = portRows.map((p) => {
    const connSlotId = p.connectedPortSlotId;
    const connSlot = connSlotId ? slotMap.get(connSlotId) : null;
    return {
      ...p,
      slotNumber: p.slotId ? slotMap.get(p.slotId)?.slotNumber ?? null : null,
      slotLabel: p.slotId ? slotMap.get(p.slotId)?.slotLabel ?? null : null,
      connectedPortSlotNumber: connSlot?.slotNumber ?? null,
      connectedPortSlotLabel: connSlot?.slotLabel ?? null
    };
  });
  rows.sort((a, b) => {
    const sA = a.slotNumber ?? "";
    const sB = b.slotNumber ?? "";
    const slotCmp = sA.localeCompare(sB, void 0, { numeric: true });
    if (slotCmp !== 0) return slotCmp;
    const sortCmp = (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
    if (sortCmp !== 0) return sortCmp;
    return String(a.portNumber).localeCompare(String(b.portNumber), void 0, { numeric: true });
  });
  return rows;
}
async function getPortById(id) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select().from(ports).where(eq(ports.id, id)).limit(1);
  return result[0];
}
async function createPort(data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const result = await db.insert(ports).values(data);
  return result[0];
}
async function updatePort(id, data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(ports).set(data).where(eq(ports.id, id));
}
async function deletePort(id) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.delete(ports).where(eq(ports.id, id));
}
async function searchPorts(query, limit = 50) {
  const db = await getDb();
  if (!db) return [];
  const q = `%${query}%`;
  const rows = await db.select({
    id: ports.id,
    equipmentId: ports.equipmentId,
    equipmentName: equipments.name,
    portNumber: ports.portNumber,
    label: ports.label,
    type: ports.type,
    speed: ports.speed,
    status: ports.status,
    notes: ports.notes,
    connectedToEquipmentId: ports.connectedToEquipmentId,
    connectedToPortId: ports.connectedToPortId
  }).from(ports).leftJoin(equipments, eq(ports.equipmentId, equipments.id)).where(
    or(
      like(ports.label, q),
      like(ports.notes, q),
      like(ports.portNumber, q),
      like(equipments.name, q)
    )
  ).orderBy(ports.status, equipments.name, ports.portNumber).limit(limit);
  return rows;
}
async function bulkCreatePorts(equipmentId, count, type, speed, slotId, startIndex) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const base = startIndex ?? 1;
  const portData = Array.from({ length: count }, (_, i) => ({
    equipmentId,
    portNumber: String(base + i).padStart(2, "0"),
    type,
    speed: speed ?? null,
    slotId: slotId ?? null,
    status: "free"
  }));
  await db.insert(ports).values(portData);
}
async function getSlotsByEquipment(equipmentId) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(equipmentSlots).where(eq(equipmentSlots.equipmentId, equipmentId)).orderBy(equipmentSlots.slotNumber);
}
async function getSlotById(id) {
  const db = await getDb();
  if (!db) return void 0;
  const rows = await db.select().from(equipmentSlots).where(eq(equipmentSlots.id, id)).limit(1);
  return rows[0];
}
async function createSlot(data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const result = await db.insert(equipmentSlots).values(data);
  return { id: result[0]?.insertId ?? 0 };
}
async function updateSlot(id, data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(equipmentSlots).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(equipmentSlots.id, id));
}
async function deleteSlot(id) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(ports).set({ slotId: null }).where(eq(ports.slotId, id));
  await db.delete(equipmentSlots).where(eq(equipmentSlots.id, id));
}
async function getPortsBySlot(slotId) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(ports).where(eq(ports.slotId, slotId)).orderBy(ports.portNumber);
}
async function getFibers(search, type, status) {
  const db = await getDb();
  if (!db) return [];
  const originEq = equipments;
  const destEq = { ...equipments };
  const conditions = [];
  if (search) conditions.push(or(like(fibers.name, `%${search}%`), like(fibers.cableId, `%${search}%`)));
  if (type) conditions.push(eq(fibers.type, type));
  if (status) conditions.push(eq(fibers.status, status));
  const query = db.select({
    id: fibers.id,
    name: fibers.name,
    originEquipmentId: fibers.originEquipmentId,
    originPortId: fibers.originPortId,
    destinationEquipmentId: fibers.destinationEquipmentId,
    destinationPortId: fibers.destinationPortId,
    color: fibers.color,
    type: fibers.type,
    lengthMeters: fibers.lengthMeters,
    cableId: fibers.cableId,
    tubeColor: fibers.tubeColor,
    attenuation: fibers.attenuation,
    status: fibers.status,
    notes: fibers.notes,
    createdAt: fibers.createdAt,
    updatedAt: fibers.updatedAt
  }).from(fibers);
  if (conditions.length > 0) return query.where(and(...conditions)).orderBy(fibers.name);
  return query.orderBy(fibers.name);
}
async function getFiberById(id) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select().from(fibers).where(eq(fibers.id, id)).limit(1);
  return result[0];
}
async function createFiber(data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const result = await db.insert(fibers).values(data);
  return result[0];
}
async function updateFiber(id, data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(fibers).set(data).where(eq(fibers.id, id));
}
async function deleteFiber(id) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.delete(fibers).where(eq(fibers.id, id));
}
async function getConnections() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(connections).orderBy(desc(connections.createdAt));
}
async function getConnectionById(id) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select().from(connections).where(eq(connections.id, id)).limit(1);
  return result[0];
}
async function createConnection(data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(ports).set({ status: "occupied" }).where(eq(ports.id, data.sourcePortId));
  await db.update(ports).set({ status: "occupied" }).where(eq(ports.id, data.targetPortId));
  const result = await db.insert(connections).values(data);
  return result[0];
}
async function updateConnection(id, data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(connections).set(data).where(eq(connections.id, id));
}
async function deleteConnection(id) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const conn = await getConnectionById(id);
  if (conn) {
    await db.update(ports).set({ status: "free" }).where(eq(ports.id, conn.sourcePortId));
    await db.update(ports).set({ status: "free" }).where(eq(ports.id, conn.targetPortId));
  }
  await db.delete(connections).where(eq(connections.id, id));
}
async function getTopologyData() {
  const db = await getDb();
  if (!db) return { nodes: [], edges: [] };
  const allEquipments = await db.select({
    id: equipments.id,
    name: equipments.name,
    type: equipments.type,
    model: equipments.model,
    status: equipments.status,
    rack: equipments.rack,
    rackPosition: equipments.rackPosition,
    roomId: equipments.roomId,
    totalPorts: equipments.totalPorts,
    imageUrl: equipments.imageUrl,
    powerType: equipments.powerType,
    powerSource: equipments.powerSource,
    powerSourceLabel: equipments.powerSourceLabel,
    roomName: rooms.name
  }).from(equipments).leftJoin(rooms, eq(equipments.roomId, rooms.id));
  const allConnections = await db.select({
    id: connections.id,
    name: connections.name,
    status: connections.status,
    type: connections.type,
    sourcePortId: connections.sourcePortId,
    targetPortId: connections.targetPortId
  }).from(connections);
  const allPorts = await db.select().from(ports);
  const portMap = new Map(allPorts.map((p) => [p.id, p]));
  const occupancyMap = /* @__PURE__ */ new Map();
  for (const equip of allEquipments) {
    const equipPorts = allPorts.filter((p) => p.equipmentId === equip.id);
    const total = equipPorts.length;
    const occupied = equipPorts.filter((p) => p.status === "occupied").length;
    const rate = total > 0 ? Math.round(occupied / total * 100) : 0;
    occupancyMap.set(equip.id, { total, occupied, rate });
  }
  const edges = allConnections.map((c) => {
    const srcPort = portMap.get(c.sourcePortId);
    const tgtPort = portMap.get(c.targetPortId);
    return {
      id: c.id,
      name: c.name,
      status: c.status,
      type: c.type,
      sourceEquipmentId: srcPort?.equipmentId,
      targetEquipmentId: tgtPort?.equipmentId,
      sourcePortId: c.sourcePortId,
      targetPortId: c.targetPortId
    };
  });
  const nodes = allEquipments.map((e) => ({
    ...e,
    portOccupancy: occupancyMap.get(e.id) ?? { total: 0, occupied: 0, rate: 0 }
  }));
  return { nodes, edges };
}
async function getMaintenanceHistory(entityType, entityId, limit = 50) {
  const db = await getDb();
  if (!db) return [];
  const conditions = [];
  if (entityType) conditions.push(eq(maintenanceHistory.entityType, entityType));
  if (entityId) conditions.push(eq(maintenanceHistory.entityId, entityId));
  const query = db.select().from(maintenanceHistory);
  if (conditions.length > 0) return query.where(and(...conditions)).orderBy(desc(maintenanceHistory.createdAt)).limit(limit);
  return query.orderBy(desc(maintenanceHistory.createdAt)).limit(limit);
}
async function createMaintenanceRecord(data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.insert(maintenanceHistory).values(data);
}
async function getDashboardStats() {
  const db = await getDb();
  if (!db) return null;
  const [equipmentCount] = await db.select({ count: sql`count(*)` }).from(equipments);
  const [fiberCount] = await db.select({ count: sql`count(*)` }).from(fibers);
  const [portCount] = await db.select({ count: sql`count(*)` }).from(ports);
  const [connectionCount] = await db.select({ count: sql`count(*)` }).from(connections);
  const [freePortCount] = await db.select({ count: sql`count(*)` }).from(ports).where(eq(ports.status, "free"));
  const [occupiedPortCount] = await db.select({ count: sql`count(*)` }).from(ports).where(eq(ports.status, "occupied"));
  const [activeEquipCount] = await db.select({ count: sql`count(*)` }).from(equipments).where(eq(equipments.status, "active"));
  const [activeFiberCount] = await db.select({ count: sql`count(*)` }).from(fibers).where(eq(fibers.status, "active"));
  const [roomCount] = await db.select({ count: sql`count(*)` }).from(rooms);
  const ctosAll = await db.select({ status: ctos.status, capacity: ctos.capacity, usedPorts: ctos.usedPorts }).from(ctos);
  const ctoTotal = ctosAll.length;
  const ctoActive = ctosAll.filter((c) => c.status === "active").length;
  const ctoMaintenance = ctosAll.filter((c) => c.status === "maintenance").length;
  const ctoInactive = ctosAll.filter((c) => c.status === "inactive").length;
  const ctoTotalCapacity = ctosAll.reduce((s, c) => s + (Number(c.capacity) || 0), 0);
  const ctoTotalUsed = ctosAll.reduce((s, c) => s + (Number(c.usedPorts) || 0), 0);
  const ctoOccupancyRate = ctoTotalCapacity > 0 ? Math.round(ctoTotalUsed / ctoTotalCapacity * 100) : 0;
  const equipByType = await db.select({
    type: equipments.type,
    count: sql`count(*)`
  }).from(equipments).groupBy(equipments.type);
  const recentHistory = await db.select().from(maintenanceHistory).orderBy(desc(maintenanceHistory.createdAt)).limit(5);
  const settingsRows = await db.select().from(systemSettings);
  const settingsMap = Object.fromEntries(settingsRows.map((r) => [r.key, r.value ?? ""]));
  const alertThreshold = parseInt(settingsMap.capacityAlertThreshold ?? "80", 10) || 80;
  const allEquipments = await db.select({
    id: equipments.id,
    name: equipments.name,
    type: equipments.type,
    totalPorts: equipments.totalPorts
  }).from(equipments).where(sql`${equipments.totalPorts} > 0`);
  const capacityAlerts = [];
  for (const equip of allEquipments) {
    if (!equip.totalPorts || equip.totalPorts === 0) continue;
    const [occ] = await db.select({ count: sql`count(*)` }).from(ports).where(and(eq(ports.equipmentId, equip.id), eq(ports.status, "occupied")));
    const occupiedCount = Number(occ?.count ?? 0);
    const rate = Math.round(occupiedCount / equip.totalPorts * 100);
    if (rate >= alertThreshold) {
      capacityAlerts.push({
        id: equip.id,
        name: equip.name,
        type: equip.type,
        totalPorts: equip.totalPorts,
        occupiedPorts: occupiedCount,
        occupancyRate: rate
      });
    }
  }
  capacityAlerts.sort((a, b) => b.occupancyRate - a.occupancyRate);
  const allRoutes = await db.execute(sql`SELECT path FROM map_routes`);
  const haversineKm = (a, b) => {
    const R = 6371;
    const dLat = (b.lat - a.lat) * Math.PI / 180;
    const dLng = (b.lng - a.lng) * Math.PI / 180;
    const s = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * Math.PI / 180) * Math.cos(b.lat * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
  };
  let totalNetworkKm = 0;
  const routeRows = Array.isArray(allRoutes[0]) ? allRoutes[0] : allRoutes.rows ?? allRoutes;
  const totalRoutes = routeRows.length;
  for (const r of routeRows) {
    try {
      if (!r.path) continue;
      const pts = JSON.parse(r.path);
      for (let i = 1; i < pts.length; i++) totalNetworkKm += haversineKm(pts[i - 1], pts[i]);
    } catch {
    }
  }
  return {
    totalEquipments: Number(equipmentCount?.count ?? 0),
    totalFibers: Number(fiberCount?.count ?? 0),
    totalPorts: Number(portCount?.count ?? 0),
    totalConnections: Number(connectionCount?.count ?? 0),
    freePorts: Number(freePortCount?.count ?? 0),
    occupiedPorts: Number(occupiedPortCount?.count ?? 0),
    activeEquipments: Number(activeEquipCount?.count ?? 0),
    activeFibers: Number(activeFiberCount?.count ?? 0),
    totalRooms: Number(roomCount?.count ?? 0),
    ctoStats: { total: ctoTotal, active: ctoActive, maintenance: ctoMaintenance, inactive: ctoInactive, totalCapacity: ctoTotalCapacity, totalUsed: ctoTotalUsed, occupancyRate: ctoOccupancyRate },
    equipmentByType: equipByType.map((e) => ({ type: e.type, count: Number(e.count) })),
    recentHistory,
    capacityAlerts,
    alertThreshold,
    totalNetworkKm: Math.round(totalNetworkKm * 10) / 10,
    totalRoutes
  };
}
async function bulkImportEquipments(rows, userId, performedBy) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const result = { imported: 0, skipped: 0, errors: [] };
  const allRooms = await db.select({ id: rooms.id, name: rooms.name }).from(rooms);
  const roomMap = new Map(allRooms.map((r) => [r.name.toLowerCase().trim(), r.id]));
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    try {
      const roomId = row.roomName ? roomMap.get(row.roomName.toLowerCase().trim()) : void 0;
      await db.insert(equipments).values({
        name: row.name,
        type: row.type,
        model: row.model || null,
        manufacturer: row.manufacturer || null,
        serialNumber: row.serialNumber || null,
        rack: row.rack || null,
        rackPosition: row.rackPosition || null,
        ipAddress: row.ipAddress || null,
        macAddress: row.macAddress || null,
        totalPorts: row.totalPorts ?? 0,
        status: row.status ?? "active",
        notes: row.notes || null,
        roomId: roomId ?? null
      });
      result.imported++;
    } catch (err) {
      result.errors.push({ row: i + 2, message: err?.message ?? "Erro desconhecido" });
      result.skipped++;
    }
  }
  if (result.imported > 0) {
    await createMaintenanceRecord({
      entityType: "equipment",
      entityId: 0,
      action: "created",
      description: `Importa\xE7\xE3o em massa: ${result.imported} equipamento(s) importado(s) via CSV`,
      performedBy,
      userId
    });
  }
  return result;
}
async function bulkImportFibers(rows, userId, performedBy) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const result = { imported: 0, skipped: 0, errors: [] };
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    try {
      await db.insert(fibers).values({
        name: row.name,
        type: row.type ?? "single_mode",
        color: row.color ?? null,
        lengthMeters: row.lengthMeters ?? null,
        cableId: row.cableId ?? null,
        tubeColor: row.tubeColor ?? null,
        attenuation: row.attenuation ?? null,
        status: row.status ?? "active",
        notes: row.notes ?? null
      });
      result.imported++;
    } catch (err) {
      result.errors.push({ row: i + 2, message: err?.message ?? "Erro desconhecido" });
      result.skipped++;
    }
  }
  if (result.imported > 0) {
    await createMaintenanceRecord({
      entityType: "fiber",
      entityId: 0,
      action: "created",
      description: `Importa\xE7\xE3o em massa: ${result.imported} fibra(s) importada(s) via CSV`,
      performedBy,
      userId
    });
  }
  return result;
}
async function getCeos(filters) {
  const db = await getDb();
  if (!db) return [];
  const rows = await db.select().from(ceos);
  let result = rows;
  if (filters?.roomId) result = result.filter((r) => r.roomId === filters.roomId);
  if (filters?.status) result = result.filter((r) => r.status === filters.status);
  return result.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
}
async function getCeoById(id) {
  const db = await getDb();
  if (!db) return void 0;
  const rows = await db.select().from(ceos).where(eq(ceos.id, id)).limit(1);
  return rows[0];
}
async function createCeo(data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const result = await db.insert(ceos).values(data);
  return result[0].insertId;
}
async function updateCeo(id, data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(ceos).set(data).where(eq(ceos.id, id));
}
async function deleteCeo(id) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const tubes = await db.select().from(ceoTubes).where(eq(ceoTubes.ceoId, id));
  for (const tube of tubes) {
    await db.delete(ceoVias).where(eq(ceoVias.tubeId, tube.id));
  }
  await db.delete(ceoTubes).where(eq(ceoTubes.ceoId, id));
  await db.delete(mapElements).where(and(eq(mapElements.type, "ceo"), eq(mapElements.referenceId, id)));
  await db.delete(ceos).where(eq(ceos.id, id));
}
async function getTubesByCeo(ceoId) {
  const db = await getDb();
  if (!db) return [];
  const rows = await db.select().from(ceoTubes).where(eq(ceoTubes.ceoId, ceoId));
  return rows.sort((a, b) => a.identifier.localeCompare(b.identifier, "pt-BR", { numeric: true }));
}
async function createCeoTube(data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const existing = await db.select({ id: ceoTubes.id, bandejaId: ceoTubes.bandejaId }).from(ceoTubes).where(and(eq(ceoTubes.ceoId, data.ceoId), eq(ceoTubes.identifier, data.identifier.trim())));
  if (existing.length > 0) {
    const orphan = existing.find((t2) => t2.bandejaId === null);
    if (orphan) {
      const newBandejaId = data.bandejaId ?? null;
      await db.update(ceoTubes).set({ bandejaId: newBandejaId }).where(eq(ceoTubes.id, orphan.id));
      return orphan.id;
    }
    throw new Error(`J\xE1 existe um tubo com o identificador "${data.identifier.trim()}" nesta CEO.`);
  }
  const colorVal = data.color && data.color.trim() !== "" ? data.color.trim() : "blue";
  const notesVal = data.notes && data.notes.trim() !== "" ? data.notes.trim() : void 0;
  const insertData = {
    ceoId: data.ceoId,
    bandejaId: data.bandejaId ?? null,
    type: data.type ?? "tube",
    identifier: data.identifier,
    totalVias: data.totalVias ?? 12,
    color: colorVal
  };
  if (notesVal !== void 0) insertData.notes = notesVal;
  const result = await db.insert(ceoTubes).values(insertData);
  const insertId = result[0]?.insertId ?? 0;
  const totalVias = data.totalVias ?? 0;
  if (totalVias > 0) {
    const viaRows = [];
    for (let i = 1; i <= totalVias; i++) {
      viaRows.push({ tubeId: insertId, ceoId: data.ceoId, viaNumber: i });
    }
    if (viaRows.length > 0) {
      await db.insert(ceoVias).values(viaRows);
    }
  }
  return insertId;
}
async function updateCeoTube(id, data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(ceoTubes).set(data).where(eq(ceoTubes.id, id));
}
async function deleteCeoTube(id) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(ceoVias).set({ fusedToTubeId: null, fusedToViaId: null }).where(eq(ceoVias.fusedToTubeId, id));
  await db.delete(ceoVias).where(eq(ceoVias.tubeId, id));
  await db.delete(ceoTubes).where(eq(ceoTubes.id, id));
}
async function getViasByTube(tubeId) {
  const db = await getDb();
  if (!db) return [];
  const rows = await db.select().from(ceoVias).where(eq(ceoVias.tubeId, tubeId));
  return rows.sort((a, b) => a.viaNumber - b.viaNumber);
}
async function getViasByCeo(ceoId) {
  const db = await getDb();
  if (!db) return [];
  const rows = await db.select().from(ceoVias).where(eq(ceoVias.ceoId, ceoId));
  return rows.sort((a, b) => a.viaNumber - b.viaNumber);
}
async function setViaFusion(viaId, fusedToTubeId, fusedToViaId, notes) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const originRows = await db.select().from(ceoVias).where(eq(ceoVias.id, viaId)).limit(1);
  const origin = originRows[0];
  if (!origin) throw new Error("Via de origem n\xE3o encontrada");
  await db.update(ceoVias).set({ fusedToTubeId, fusedToViaId, notes: notes ?? null }).where(eq(ceoVias.id, viaId));
  if (fusedToViaId !== null && fusedToTubeId !== null) {
    await db.update(ceoVias).set({ fusedToTubeId: origin.tubeId, fusedToViaId: viaId }).where(eq(ceoVias.id, fusedToViaId));
  }
}
async function setViaFusionToSplitter(viaId, fusedToSplitterId, fusedToSplitterViaId, notes) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(ceoVias).set({ fusedToTubeId: null, fusedToViaId: null, fusedToSplitterId, fusedToSplitterViaId, notes: notes ?? null }).where(eq(ceoVias.id, viaId));
}
async function clearViaFusion(viaId) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const rows = await db.select().from(ceoVias).where(eq(ceoVias.id, viaId)).limit(1);
  const via = rows[0];
  await db.update(ceoVias).set({ fusedToTubeId: null, fusedToViaId: null, fusedToSplitterId: null, fusedToSplitterViaId: null }).where(eq(ceoVias.id, viaId));
  if (via?.fusedToViaId) {
    await db.update(ceoVias).set({ fusedToTubeId: null, fusedToViaId: null, fusedToSplitterId: null, fusedToSplitterViaId: null }).where(eq(ceoVias.id, via.fusedToViaId));
  }
  await db.delete(ceoViaAssociations).where(
    or(
      eq(ceoViaAssociations.sourceViaId, viaId),
      eq(ceoViaAssociations.targetViaId, viaId)
    )
  );
}
async function updateVia(id, data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(ceoVias).set(data).where(eq(ceoVias.id, id));
  if (data.label !== void 0) {
    const [via] = await db.select({ fusedToViaId: ceoVias.fusedToViaId }).from(ceoVias).where(eq(ceoVias.id, id));
    if (via?.fusedToViaId) {
      await db.update(ceoVias).set({ label: data.label }).where(eq(ceoVias.id, via.fusedToViaId));
    }
  }
}
async function setViaFiber(viaId, fiberId) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(ceoVias).set({ fiberId }).where(eq(ceoVias.id, viaId));
}
async function getTubesByCto(ctoId) {
  const db = await getDb();
  if (!db) return [];
  const rows = await db.select().from(ctoTubes).where(eq(ctoTubes.ctoId, ctoId));
  return rows.sort((a, b) => a.identifier.localeCompare(b.identifier, "pt-BR", { numeric: true }));
}
async function createCtoTube(data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const colorVal = data.color && data.color.trim() !== "" ? data.color.trim() : "blue";
  const notesVal = data.notes && data.notes.trim() !== "" ? data.notes.trim() : void 0;
  const insertData = {
    ctoId: data.ctoId,
    type: data.type ?? "tube",
    identifier: data.identifier,
    totalVias: data.totalVias ?? 12,
    color: colorVal
  };
  if (notesVal !== void 0) insertData.notes = notesVal;
  if (data.splitterType) insertData.splitterType = data.splitterType;
  if (data.ratio) insertData.ratio = data.ratio;
  const result = await db.insert(ctoTubes).values(insertData);
  const insertId = result[0]?.insertId ?? 0;
  const totalVias = data.totalVias ?? 0;
  if (totalVias > 0) {
    const viaRows = [];
    const isSplitter = (data.type ?? "tube") === "splitter";
    if (isSplitter) {
      viaRows.push({ tubeId: insertId, ctoId: data.ctoId, viaNumber: 0, label: "ENT" });
    }
    for (let i = 1; i <= totalVias; i++) {
      viaRows.push({ tubeId: insertId, ctoId: data.ctoId, viaNumber: i });
    }
    if (viaRows.length > 0) await db.insert(ctoVias).values(viaRows);
  }
  return insertId;
}
async function updateCtoTube(id, data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(ctoTubes).set(data).where(eq(ctoTubes.id, id));
}
async function deleteCtoTube(id) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(ctoVias).set({ fusedToTubeId: null, fusedToViaId: null }).where(eq(ctoVias.fusedToTubeId, id));
  await db.delete(ctoVias).where(eq(ctoVias.tubeId, id));
  await db.delete(ctoTubes).where(eq(ctoTubes.id, id));
}
async function getViasByCtotube(tubeId) {
  const db = await getDb();
  if (!db) return [];
  const rows = await db.select().from(ctoVias).where(eq(ctoVias.tubeId, tubeId));
  return rows.sort((a, b) => a.viaNumber - b.viaNumber);
}
async function getViasByCto(ctoId) {
  const db = await getDb();
  if (!db) return [];
  const rows = await db.select().from(ctoVias).where(eq(ctoVias.ctoId, ctoId));
  return rows.sort((a, b) => a.viaNumber - b.viaNumber);
}
async function setCtoViaFusion(viaId, fusedToTubeId, fusedToViaId, notes) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const originRows = await db.select().from(ctoVias).where(eq(ctoVias.id, viaId)).limit(1);
  const origin = originRows[0];
  if (!origin) throw new Error("Via de origem n\xE3o encontrada");
  await db.update(ctoVias).set({ fusedToTubeId, fusedToViaId, notes: notes ?? null }).where(eq(ctoVias.id, viaId));
  if (fusedToViaId !== null && fusedToTubeId !== null) {
    await db.update(ctoVias).set({ fusedToTubeId: origin.tubeId, fusedToViaId: viaId }).where(eq(ctoVias.id, fusedToViaId));
  }
}
async function clearCtoViaFusion(viaId) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const rows = await db.select().from(ctoVias).where(eq(ctoVias.id, viaId)).limit(1);
  const via = rows[0];
  await db.update(ctoVias).set({ fusedToTubeId: null, fusedToViaId: null }).where(eq(ctoVias.id, viaId));
  if (via?.fusedToViaId) {
    await db.update(ctoVias).set({ fusedToTubeId: null, fusedToViaId: null }).where(eq(ctoVias.id, via.fusedToViaId));
  }
}
async function updateCtoVia(id, data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(ctoVias).set(data).where(eq(ctoVias.id, id));
  if (data.label !== void 0) {
    const [via] = await db.select({ fusedToViaId: ctoVias.fusedToViaId }).from(ctoVias).where(eq(ctoVias.id, id));
    if (via?.fusedToViaId) {
      await db.update(ctoVias).set({ label: data.label }).where(eq(ctoVias.id, via.fusedToViaId));
    }
  }
}
async function setCtoViaFiber(viaId, fiberId) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(ctoVias).set({ fiberId }).where(eq(ctoVias.id, viaId));
}
async function getAllUsers() {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const rows = await db.select({
    id: users.id,
    openId: users.openId,
    name: users.name,
    email: users.email,
    role: users.role,
    loginMethod: users.loginMethod,
    createdAt: users.createdAt,
    lastSignedIn: users.lastSignedIn
  }).from(users).orderBy(desc(users.createdAt));
  return rows;
}
async function updateUserRole(userId, role) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(users).set({ role }).where(eq(users.id, userId));
}
async function deleteUser(userId) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.delete(users).where(eq(users.id, userId));
}
async function exportFullBackup() {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const [
    roomRows,
    equipmentRows,
    slotRows,
    portRows,
    fiberRows,
    connectionRows,
    historyRows,
    ceoRows,
    tubeRows,
    viaRows
  ] = await Promise.all([
    db.select().from(rooms),
    db.select().from(equipments),
    db.select().from(equipmentSlots),
    db.select().from(ports),
    db.select().from(fibers),
    db.select().from(connections),
    db.select().from(maintenanceHistory),
    db.select().from(ceos),
    db.select().from(ceoTubes),
    db.select().from(ceoVias)
  ]);
  return {
    version: "1.0",
    generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
    counts: {
      rooms: roomRows.length,
      equipments: equipmentRows.length,
      equipmentSlots: slotRows.length,
      ports: portRows.length,
      fibers: fiberRows.length,
      connections: connectionRows.length,
      maintenanceHistory: historyRows.length,
      ceos: ceoRows.length,
      ceoTubes: tubeRows.length,
      ceoVias: viaRows.length
    },
    data: {
      rooms: roomRows,
      equipments: equipmentRows,
      equipmentSlots: slotRows,
      ports: portRows,
      fibers: fiberRows,
      connections: connectionRows,
      maintenanceHistory: historyRows,
      ceos: ceoRows,
      ceoTubes: tubeRows,
      ceoVias: viaRows
    }
  };
}
async function restoreFromBackup(backup) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const result = {
    restored: {},
    skipped: {},
    errors: []
  };
  const dbInstance = db;
  async function upsertRows(table, rows, label) {
    let restored = 0;
    let skipped = 0;
    for (const row of rows) {
      try {
        const { id, ...rest } = row;
        await dbInstance.insert(table).values(row).onDuplicateKeyUpdate({ set: rest });
        restored++;
      } catch (e) {
        skipped++;
        result.errors.push(`${label}#${row.id}: ${e?.message ?? e}`);
      }
    }
    result.restored[label] = restored;
    result.skipped[label] = skipped;
  }
  await upsertRows(rooms, backup.data.rooms ?? [], "rooms");
  await upsertRows(equipments, backup.data.equipments ?? [], "equipments");
  await upsertRows(equipmentSlots, backup.data.equipmentSlots ?? [], "equipmentSlots");
  await upsertRows(ports, backup.data.ports ?? [], "ports");
  await upsertRows(fibers, backup.data.fibers ?? [], "fibers");
  await upsertRows(connections, backup.data.connections ?? [], "connections");
  await upsertRows(maintenanceHistory, backup.data.maintenanceHistory ?? [], "maintenanceHistory");
  await upsertRows(ceos, backup.data.ceos ?? [], "ceos");
  await upsertRows(ceoTubes, backup.data.ceoTubes ?? [], "ceoTubes");
  await upsertRows(ceoVias, backup.data.ceoVias ?? [], "ceoVias");
  return result;
}
async function getBackupSchedule() {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const rows = await db.select().from(backupSchedules).limit(1);
  return rows[0] ?? null;
}
async function upsertBackupSchedule(data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const existing = await db.select().from(backupSchedules).limit(1);
  if (existing.length > 0) {
    await db.update(backupSchedules).set(data).where(eq(backupSchedules.id, existing[0].id));
  } else {
    await db.insert(backupSchedules).values(data);
  }
}
async function updateScheduleNextRun(id, nextRunAt, lastRunAt) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(backupSchedules).set({ nextRunAt, lastRunAt }).where(eq(backupSchedules.id, id));
}
async function getBackupHistory(limit = 50) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  return db.select().from(backupHistory).orderBy(desc(backupHistory.createdAt)).limit(limit);
}
async function createBackupHistoryEntry(data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.insert(backupHistory).values(data);
  const rows = await db.select().from(backupHistory).orderBy(desc(backupHistory.createdAt)).limit(1);
  return rows[0];
}
async function deleteBackupHistoryEntry(id) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.delete(backupHistory).where(eq(backupHistory.id, id));
}
async function deleteOldBackupEntries(olderThanDays) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const cutoff = new Date(Date.now() - olderThanDays * 24 * 60 * 60 * 1e3);
  const old = await db.select().from(backupHistory).where(
    sql`${backupHistory.createdAt} < ${cutoff}`
  );
  for (const entry of old) {
    await db.delete(backupHistory).where(eq(backupHistory.id, entry.id));
  }
  return old.length;
}
async function getSystemSettings() {
  const db = await getDb();
  if (!db) return {};
  const rows = await db.select().from(systemSettings);
  return Object.fromEntries(rows.map((r) => [r.key, r.value ?? ""]));
}
async function setSystemSetting(key, value) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.insert(systemSettings).values({ key, value }).onDuplicateKeyUpdate({ set: { value } });
}
async function setSystemSettings(settings) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  for (const [key, value] of Object.entries(settings)) {
    await db.insert(systemSettings).values({ key, value }).onDuplicateKeyUpdate({ set: { value } });
  }
}
async function updateEquipmentImage(id, imageUrl) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(equipments).set({ imageUrl }).where(eq(equipments.id, id));
}
async function getOccupancyReport(filters) {
  const db = await getDb();
  if (!db) return [];
  let equipQuery = db.select({
    id: equipments.id,
    name: equipments.name,
    type: equipments.type,
    roomId: equipments.roomId,
    totalPorts: equipments.totalPorts
  }).from(equipments);
  const allEquips = await equipQuery;
  const allRooms = await db.select({ id: rooms.id, name: rooms.name }).from(rooms);
  const roomMap = new Map(allRooms.map((r) => [r.id, r.name]));
  const filtered = allEquips.filter((e) => {
    if (filters?.equipmentId && e.id !== filters.equipmentId) return false;
    if (filters?.roomId && e.roomId !== filters.roomId) return false;
    return true;
  });
  const result = [];
  for (const equip of filtered) {
    const portRows = await db.select().from(ports).where(eq(ports.equipmentId, equip.id)).orderBy(ports.portNumber);
    const total = portRows.length;
    const free = portRows.filter((p) => p.status === "free").length;
    const occupied = portRows.filter((p) => p.status === "occupied").length;
    const reserved = portRows.filter((p) => p.status === "reserved").length;
    const faulty = portRows.filter((p) => p.status === "faulty").length;
    const rate = total > 0 ? Math.round(occupied / total * 100) : 0;
    result.push({
      equipmentId: equip.id,
      equipmentName: equip.name,
      equipmentType: equip.type,
      roomId: equip.roomId,
      roomName: equip.roomId ? roomMap.get(equip.roomId) ?? null : null,
      totalPorts: total,
      freePorts: free,
      occupiedPorts: occupied,
      reservedPorts: reserved,
      faultyPorts: faulty,
      occupancyRate: rate,
      ports: portRows.map((p) => ({
        id: p.id,
        portNumber: p.portNumber,
        label: p.label ?? null,
        type: String(p.type),
        speed: p.speed ? String(p.speed) : null,
        status: String(p.status),
        notes: p.notes ?? null
      }))
    });
  }
  return result.sort((a, b) => a.equipmentName.localeCompare(b.equipmentName, "pt-BR"));
}
async function getUserByEmail(email) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return rows[0] ?? null;
}
async function setUserPassword(userId, passwordHash) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(users).set({ passwordHash }).where(eq(users.id, userId));
}
async function getUserById(id) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return rows[0] ?? null;
}
async function listUsersForAdmin() {
  const db = await getDb();
  if (!db) return [];
  return db.select({
    id: users.id,
    name: users.name,
    email: users.email,
    role: users.role,
    hasPassword: sql`${users.passwordHash} IS NOT NULL`,
    mustChangePassword: users.mustChangePassword,
    createdAt: users.createdAt,
    lastSignedIn: users.lastSignedIn
  }).from(users).orderBy(users.name);
}
async function getRoomReport(roomId) {
  const db = await getDb();
  if (!db) return null;
  const roomRows = await db.select().from(rooms).where(eq(rooms.id, roomId)).limit(1);
  if (!roomRows.length) return null;
  const room = roomRows[0];
  const equipRows = await db.select({
    id: equipments.id,
    name: equipments.name,
    type: equipments.type,
    model: equipments.model,
    manufacturer: equipments.manufacturer,
    rack: equipments.rack,
    rackPosition: equipments.rackPosition,
    status: equipments.status,
    totalPorts: equipments.totalPorts,
    powerType: equipments.powerType,
    powerSource: equipments.powerSource,
    powerSourceLabel: equipments.powerSourceLabel
  }).from(equipments).where(eq(equipments.roomId, roomId)).orderBy(equipments.rack, equipments.rackPosition, equipments.name);
  const reportEquipments = [];
  let totalPortsAll = 0;
  let freePortsAll = 0;
  let occupiedPortsAll = 0;
  for (const equip of equipRows) {
    const portRows = await db.select().from(ports).where(eq(ports.equipmentId, equip.id)).orderBy(ports.portNumber);
    const total = portRows.length;
    const free = portRows.filter((p) => p.status === "free").length;
    const occupied = portRows.filter((p) => p.status === "occupied").length;
    const reserved = portRows.filter((p) => p.status === "reserved").length;
    const faulty = portRows.filter((p) => p.status === "faulty").length;
    const rate = total > 0 ? Math.round(occupied / total * 100) : 0;
    totalPortsAll += total;
    freePortsAll += free;
    occupiedPortsAll += occupied;
    reportEquipments.push({
      id: equip.id,
      name: equip.name,
      type: equip.type,
      model: equip.model ?? null,
      manufacturer: equip.manufacturer ?? null,
      rack: equip.rack ?? null,
      rackPosition: equip.rackPosition ?? null,
      status: equip.status ?? "active",
      powerType: equip.powerType ?? null,
      powerSource: equip.powerSource ?? null,
      powerSourceLabel: equip.powerSourceLabel ?? null,
      totalPorts: total,
      freePorts: free,
      occupiedPorts: occupied,
      reservedPorts: reserved,
      faultyPorts: faulty,
      occupancyRate: rate,
      ports: portRows.map((p) => ({
        id: p.id,
        portNumber: p.portNumber,
        label: p.label ?? null,
        type: String(p.type),
        speed: p.speed ? String(p.speed) : null,
        status: String(p.status),
        notes: p.notes ?? null
      }))
    });
  }
  const globalRate = totalPortsAll > 0 ? Math.round(occupiedPortsAll / totalPortsAll * 100) : 0;
  return {
    roomId: room.id,
    roomName: room.name,
    roomLocation: room.location ?? null,
    roomNotes: room.notes ?? null,
    totalEquipments: equipRows.length,
    totalPorts: totalPortsAll,
    freePorts: freePortsAll,
    occupiedPorts: occupiedPortsAll,
    occupancyRate: globalRate,
    equipments: reportEquipments,
    generatedAt: /* @__PURE__ */ new Date()
  };
}
async function getPowerSources() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(powerSources).orderBy(powerSources.name);
}
async function getPowerSourceById(id) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(powerSources).where(eq(powerSources.id, id)).limit(1);
  return rows[0] ?? null;
}
async function createPowerSource(data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const result = await db.insert(powerSources).values(data);
  return result[0].insertId;
}
async function updatePowerSource(id, data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(powerSources).set(data).where(eq(powerSources.id, id));
}
async function deletePowerSource(id) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(equipments).set({ powerSourceId: null }).where(eq(equipments.powerSourceId, id));
  await db.delete(powerSources).where(eq(powerSources.id, id));
}
async function updatePowerSourceSnmpData(id, data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(powerSources).set(data).where(eq(powerSources.id, id));
}
async function getSnmpAlerts(opts) {
  const db = await getDb();
  if (!db) return [];
  let q = db.select().from(snmpAlerts).$dynamic();
  const conds = [];
  if (opts?.powerSourceId) conds.push(eq(snmpAlerts.powerSourceId, opts.powerSourceId));
  if (opts?.onlyActive) conds.push(sql`${snmpAlerts.resolvedAt} IS NULL`);
  if (conds.length) q = q.where(and(...conds));
  q = q.orderBy(desc(snmpAlerts.createdAt));
  if (opts?.limit) q = q.limit(opts.limit);
  return q;
}
async function countActiveSnmpAlerts() {
  const db = await getDb();
  if (!db) return 0;
  const rows = await db.select({ count: sql`count(*)` }).from(snmpAlerts).where(sql`${snmpAlerts.resolvedAt} IS NULL`);
  return Number(rows[0]?.count ?? 0);
}
async function createSnmpAlert(data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const result = await db.insert(snmpAlerts).values(data);
  return result[0].insertId;
}
async function acknowledgeSnmpAlert(id, acknowledgedBy) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(snmpAlerts).set({ acknowledgedAt: /* @__PURE__ */ new Date(), acknowledgedBy }).where(eq(snmpAlerts.id, id));
}
async function resolveSnmpAlert(id) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(snmpAlerts).set({ resolvedAt: /* @__PURE__ */ new Date() }).where(eq(snmpAlerts.id, id));
}
async function resolveAlertsByTypeAndSource(powerSourceId, alertType) {
  const db = await getDb();
  if (!db) return;
  await db.update(snmpAlerts).set({ resolvedAt: /* @__PURE__ */ new Date() }).where(and(
    eq(snmpAlerts.powerSourceId, powerSourceId),
    eq(snmpAlerts.alertType, alertType),
    sql`${snmpAlerts.resolvedAt} IS NULL`
  ));
}
async function hasActiveAlertOfType(powerSourceId, alertType) {
  const db = await getDb();
  if (!db) return false;
  const rows = await db.select({ id: snmpAlerts.id }).from(snmpAlerts).where(and(
    eq(snmpAlerts.powerSourceId, powerSourceId),
    eq(snmpAlerts.alertType, alertType),
    sql`${snmpAlerts.resolvedAt} IS NULL`
  )).limit(1);
  return rows.length > 0;
}
async function getTuyaDevices() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(tuyaDevices).orderBy(tuyaDevices.name);
}
async function getTuyaDeviceById(id) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(tuyaDevices).where(eq(tuyaDevices.id, id)).limit(1);
  return rows[0] ?? null;
}
async function createTuyaDevice(data) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const result = await db.insert(tuyaDevices).values(data);
  return result[0]?.insertId ?? 0;
}
async function updateTuyaDevice(id, data) {
  const db = await getDb();
  if (!db) return;
  await db.update(tuyaDevices).set(data).where(eq(tuyaDevices.id, id));
}
async function deleteTuyaDevice(id) {
  const db = await getDb();
  if (!db) return;
  await db.delete(tuyaDevices).where(eq(tuyaDevices.id, id));
}
async function updateTuyaDeviceStatus(id, data) {
  const db = await getDb();
  if (!db) return;
  await db.update(tuyaDevices).set(data).where(eq(tuyaDevices.id, id));
}
async function getTuyaAccounts() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(tuyaAccounts).orderBy(tuyaAccounts.name);
}
async function getTuyaAccountById(id) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(tuyaAccounts).where(eq(tuyaAccounts.id, id)).limit(1);
  return rows[0] ?? null;
}
async function createTuyaAccount(data) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const result = await db.insert(tuyaAccounts).values(data);
  return result[0]?.insertId ?? 0;
}
async function updateTuyaAccount(id, data) {
  const db = await getDb();
  if (!db) return;
  await db.update(tuyaAccounts).set(data).where(eq(tuyaAccounts.id, id));
}
async function deleteTuyaAccount(id) {
  const db = await getDb();
  if (!db) return;
  await db.delete(tuyaAccounts).where(eq(tuyaAccounts.id, id));
}
async function createTuyaReading(data) {
  const db = await getDb();
  if (!db) return;
  await db.insert(tuyaReadings).values(data);
  const countRows = await db.select({ count: sql`COUNT(*)` }).from(tuyaReadings).where(eq(tuyaReadings.deviceId, data.deviceId));
  const count = Number(countRows[0]?.count ?? 0);
  if (count > 2880) {
    const oldest = await db.select({ id: tuyaReadings.id }).from(tuyaReadings).where(eq(tuyaReadings.deviceId, data.deviceId)).orderBy(tuyaReadings.collectedAt).limit(count - 2880);
    if (oldest.length > 0) {
      const ids = oldest.map((r) => r.id);
      await db.delete(tuyaReadings).where(inArray(tuyaReadings.id, ids));
    }
  }
}
async function getTuyaReadingsByDevice(deviceId, hours = 24) {
  const db = await getDb();
  if (!db) return [];
  const since = new Date(Date.now() - hours * 60 * 60 * 1e3);
  return db.select().from(tuyaReadings).where(and(eq(tuyaReadings.deviceId, deviceId), gte(tuyaReadings.collectedAt, since))).orderBy(tuyaReadings.collectedAt);
}
async function getLatestTuyaReadings() {
  const db = await getDb();
  if (!db) return [];
  const devices = await db.select().from(tuyaDevices).where(eq(tuyaDevices.status, "online")).orderBy(tuyaDevices.name);
  const result = await Promise.all(
    devices.map(async (device) => {
      const readings = await db.select().from(tuyaReadings).where(eq(tuyaReadings.deviceId, device.id)).orderBy(desc(tuyaReadings.collectedAt)).limit(1);
      return { ...device, latestReading: readings[0] ?? null };
    })
  );
  return result;
}
async function getAllPortLinks() {
  const db = await getDb();
  if (!db) return [];
  const rows = await db.select({
    portId: ports.id,
    portNumber: ports.portNumber,
    portLabel: ports.label,
    equipmentId: ports.equipmentId,
    equipmentName: equipments.name,
    equipmentRack: equipments.rack,
    equipmentRackPosition: equipments.rackPosition,
    connectedToEquipmentId: ports.connectedToEquipmentId,
    connectedToPortId: ports.connectedToPortId
  }).from(ports).innerJoin(equipments, eq(ports.equipmentId, equipments.id)).where(sql`${ports.connectedToEquipmentId} IS NOT NULL AND ${ports.connectedToPortId} IS NOT NULL`);
  const seen = /* @__PURE__ */ new Set();
  const links = [];
  for (const row of rows) {
    if (!row.connectedToEquipmentId || !row.connectedToPortId) continue;
    const key = [
      Math.min(row.equipmentId, row.connectedToEquipmentId),
      Math.max(row.equipmentId, row.connectedToEquipmentId),
      Math.min(row.portId, row.connectedToPortId),
      Math.max(row.portId, row.connectedToPortId)
    ].join("-");
    if (!seen.has(key)) {
      seen.add(key);
      links.push({
        portId: row.portId,
        portNumber: row.portNumber,
        portLabel: row.portLabel,
        equipmentId: row.equipmentId,
        equipmentName: row.equipmentName,
        equipmentRack: row.equipmentRack,
        equipmentRackPosition: row.equipmentRackPosition,
        connectedToEquipmentId: row.connectedToEquipmentId,
        connectedToPortId: row.connectedToPortId
      });
    }
  }
  return links;
}
async function getTopologyLayout(userId, roomFilter) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(topologyLayouts).where(and(eq(topologyLayouts.userId, userId), eq(topologyLayouts.roomFilter, roomFilter))).limit(1);
  return rows[0] ?? null;
}
async function saveTopologyLayout(userId, roomFilter, nodePositions, ctrlPoints) {
  const db = await getDb();
  if (!db) return;
  const existing = await getTopologyLayout(userId, roomFilter);
  const nodeJson = JSON.stringify(nodePositions);
  const ctrlJson = JSON.stringify(ctrlPoints);
  if (existing) {
    await db.update(topologyLayouts).set({ nodePositions: nodeJson, ctrlPoints: ctrlJson }).where(eq(topologyLayouts.id, existing.id));
  } else {
    await db.insert(topologyLayouts).values({
      userId,
      roomFilter,
      nodePositions: nodeJson,
      ctrlPoints: ctrlJson
    });
  }
}
async function saveSnmpReading(powerSourceId, data) {
  const db = await getDb();
  if (!db) return;
  const hasData = Object.values(data).some((v) => v != null);
  if (!hasData) return;
  await db.insert(snmpReadings).values({
    powerSourceId,
    voltage: data.voltage ?? void 0,
    current: data.current ?? void 0,
    temperature: data.temperature ?? void 0,
    batteryLevel: data.batteryLevel ?? void 0,
    loadPercent: data.loadPercent ?? void 0,
    alarmStatus: data.alarmStatus ?? void 0
  });
  const db2 = await getDb();
  if (!db2) return;
  const oldest = await db2.select({ id: snmpReadings.id }).from(snmpReadings).where(eq(snmpReadings.powerSourceId, powerSourceId)).orderBy(desc(snmpReadings.collectedAt)).offset(2e3).limit(1);
  if (oldest.length > 0) {
    await db2.delete(snmpReadings).where(
      and(
        eq(snmpReadings.powerSourceId, powerSourceId),
        sql`${snmpReadings.collectedAt} < (SELECT collectedAt FROM snmp_readings WHERE powerSourceId = ${powerSourceId} ORDER BY collectedAt DESC LIMIT 1 OFFSET 1999)`
      )
    );
  }
}
async function getSnmpReadings(powerSourceId, hours = 24) {
  const db = await getDb();
  if (!db) return [];
  const since = new Date(Date.now() - hours * 60 * 60 * 1e3);
  return db.select().from(snmpReadings).where(
    and(
      eq(snmpReadings.powerSourceId, powerSourceId),
      gte(snmpReadings.collectedAt, since)
    )
  ).orderBy(snmpReadings.collectedAt).limit(500);
}
async function getRacks(roomId) {
  const db = await getDb();
  if (!db) return [];
  if (roomId !== void 0) {
    return db.select().from(racks).where(eq(racks.roomId, roomId)).orderBy(racks.name);
  }
  return db.select().from(racks).orderBy(racks.name);
}
async function getRackById(id) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(racks).where(eq(racks.id, id)).limit(1);
  return rows[0] ?? null;
}
async function createRack(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(racks).values(data);
  return result[0].insertId;
}
async function updateRack(id, data) {
  const db = await getDb();
  if (!db) return;
  await db.update(racks).set(data).where(eq(racks.id, id));
}
async function deleteRack(id) {
  const db = await getDb();
  if (!db) return;
  await db.delete(racks).where(eq(racks.id, id));
}
async function getCtos() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(ctos).orderBy(ctos.name);
}
async function getCtoById(id) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(ctos).where(eq(ctos.id, id)).limit(1);
  return rows[0] ?? null;
}
async function createCto(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(ctos).values(data);
  return result[0].insertId;
}
async function updateCto(id, data) {
  const db = await getDb();
  if (!db) return;
  await db.update(ctos).set(data).where(eq(ctos.id, id));
}
async function deleteCto(id) {
  const db = await getDb();
  if (!db) return;
  const tubes = await db.select().from(ctoTubes).where(eq(ctoTubes.ctoId, id));
  for (const tube of tubes) {
    await db.delete(ctoVias).where(eq(ctoVias.tubeId, tube.id));
  }
  await db.delete(ctoTubes).where(eq(ctoTubes.ctoId, id));
  await db.delete(mapElements).where(and(eq(mapElements.type, "cto"), eq(mapElements.referenceId, id)));
  await db.delete(ctos).where(eq(ctos.id, id));
}
async function getMapElements() {
  const db = await getDb();
  if (!db) return [];
  const rows = await db.select().from(mapElements);
  const ceoIds = rows.filter((r) => r.type === "ceo").map((r) => r.referenceId);
  const ctoIds = rows.filter((r) => r.type === "cto").map((r) => r.referenceId);
  const ceoRows = ceoIds.length > 0 ? await db.select({ id: ceos.id, name: ceos.name }).from(ceos).where(inArray(ceos.id, ceoIds)) : [];
  const ctoRows = ctoIds.length > 0 ? await db.select({ id: ctos.id, name: ctos.name }).from(ctos).where(inArray(ctos.id, ctoIds)) : [];
  const ceoMap = new Map(ceoRows.map((r) => [r.id, r.name]));
  const ctoMap = new Map(ctoRows.map((r) => [r.id, r.name]));
  return rows.map((r) => ({
    ...r,
    elementName: r.type === "ceo" ? ceoMap.get(r.referenceId) ?? void 0 : ctoMap.get(r.referenceId) ?? void 0
  }));
}
async function upsertMapElement(type, referenceId, lat, lng, color) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await db.select().from(mapElements).where(and(eq(mapElements.type, type), eq(mapElements.referenceId, referenceId))).limit(1);
  if (existing.length > 0) {
    const updateData = { lat, lng };
    if (color !== void 0) updateData.color = color;
    await db.update(mapElements).set(updateData).where(eq(mapElements.id, existing[0].id));
    return existing[0].id;
  }
  const result = await db.insert(mapElements).values({ type, referenceId, lat, lng, color: color ?? null });
  return result[0].insertId;
}
async function deleteMapElement(id) {
  const db = await getDb();
  if (!db) return;
  await db.delete(mapElements).where(eq(mapElements.id, id));
}
async function getMapRoutes() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(mapRoutes).orderBy(mapRoutes.id);
}
async function createMapRoute(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const fromId = data.fromElementId != null && data.fromElementId > 0 ? data.fromElementId : 0;
  const toId = data.toElementId != null && data.toElementId > 0 ? data.toElementId : 0;
  const name = data.name && data.name.trim() !== "" ? data.name.trim() : "Cabo";
  const fiberCount = data.fiberCount ?? 12;
  const cableType = data.cableType ?? "FO";
  const color = data.color ?? "#22d3ee";
  const path7 = data.path ?? "[]";
  const notes = data.notes && data.notes.trim() !== "" ? data.notes.trim() : null;
  if (!_pool) _pool = createPool();
  const [result] = await _pool.promise().execute(
    `INSERT INTO map_routes (name, fromElementId, toElementId, fiberCount, cableType, color, path, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, fromId, toId, fiberCount, cableType, color, path7, notes]
  );
  return result.insertId;
}
async function updateMapRoute(id, data) {
  if (!_pool) _pool = createPool();
  const setClauses = [];
  const params = [];
  for (const [key, value] of Object.entries(data)) {
    if (value === null) {
      setClauses.push(`\`${key}\` = NULL`);
    } else if (value !== void 0) {
      setClauses.push(`\`${key}\` = ?`);
      params.push(value);
    }
  }
  if (setClauses.length === 0) return;
  params.push(id);
  await _pool.promise().execute(
    `UPDATE \`map_routes\` SET ${setClauses.join(", ")} WHERE \`id\` = ?`,
    params
  );
}
async function deleteMapRoute(id) {
  const db = await getDb();
  if (!db) return;
  await db.delete(mapRoutes).where(eq(mapRoutes.id, id));
}
async function getSgpConfig() {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(sgpConfig).limit(1);
  return rows[0] ?? null;
}
async function saveSgpConfig(data) {
  const db = await getDb();
  if (!db) return;
  const existing = await db.select().from(sgpConfig).limit(1);
  if (existing.length > 0) {
    await db.update(sgpConfig).set(data).where(eq(sgpConfig.id, existing[0].id));
  } else {
    await db.insert(sgpConfig).values(data);
  }
}
async function getCtoAlertConfig() {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(ctoAlertConfig).limit(1);
  return rows[0] ?? null;
}
async function saveCtoAlertConfig(data) {
  const db = await getDb();
  if (!db) return;
  const existing = await db.select().from(ctoAlertConfig).limit(1);
  if (existing.length > 0) {
    await db.update(ctoAlertConfig).set(data).where(eq(ctoAlertConfig.id, existing[0].id));
  } else {
    await db.insert(ctoAlertConfig).values(data);
  }
}
async function getCtoAlerts(opts) {
  const db = await getDb();
  if (!db) return [];
  const conditions = [];
  if (opts?.onlyActive) {
    conditions.push(isNull(ctoAlerts.resolvedAt));
  }
  const rows = await db.select({
    id: ctoAlerts.id,
    ctoId: ctoAlerts.ctoId,
    ctoName: ctos.name,
    occupancyPct: ctoAlerts.occupancyPct,
    threshold: ctoAlerts.threshold,
    severity: ctoAlerts.severity,
    message: ctoAlerts.message,
    acknowledgedAt: ctoAlerts.acknowledgedAt,
    acknowledgedBy: ctoAlerts.acknowledgedBy,
    resolvedAt: ctoAlerts.resolvedAt,
    createdAt: ctoAlerts.createdAt,
    updatedAt: ctoAlerts.updatedAt
  }).from(ctoAlerts).leftJoin(ctos, eq(ctoAlerts.ctoId, ctos.id)).where(conditions.length > 0 ? and(...conditions) : void 0).orderBy(desc(ctoAlerts.createdAt)).limit(opts?.limit ?? 100);
  return rows.map((r) => ({ ...r, ctoName: r.ctoName ?? `CTO-${r.ctoId}` }));
}
async function countActiveCtoAlerts() {
  const db = await getDb();
  if (!db) return 0;
  const rows = await db.select({ count: sql`count(*)` }).from(ctoAlerts).where(isNull(ctoAlerts.resolvedAt));
  return Number(rows[0]?.count ?? 0);
}
async function acknowledgeCtoAlert(id, by) {
  const db = await getDb();
  if (!db) return;
  await db.update(ctoAlerts).set({ acknowledgedAt: /* @__PURE__ */ new Date(), acknowledgedBy: by }).where(eq(ctoAlerts.id, id));
}
async function resolveCtoAlert(id) {
  const db = await getDb();
  if (!db) return;
  await db.update(ctoAlerts).set({ resolvedAt: /* @__PURE__ */ new Date() }).where(eq(ctoAlerts.id, id));
}
async function checkAndCreateCtoAlerts() {
  const db = await getDb();
  if (!db) return 0;
  const config = await getCtoAlertConfig();
  if (!config?.enabled) return 0;
  const allCtos = await getCtos();
  let created = 0;
  for (const cto of allCtos) {
    const capacity = cto.capacity ?? 0;
    if (capacity === 0) continue;
    const pct = Math.round((cto.usedPorts ?? 0) / capacity * 100);
    const isCritical = pct >= (config.criticalThreshold ?? 90);
    const isWarning = pct >= (config.warningThreshold ?? 80);
    if (!isWarning && !isCritical) continue;
    const existing = await db.select().from(ctoAlerts).where(and(eq(ctoAlerts.ctoId, cto.id), isNull(ctoAlerts.resolvedAt))).limit(1);
    if (existing.length > 0) continue;
    const severity = isCritical ? "critical" : "warning";
    const threshold = isCritical ? config.criticalThreshold ?? 90 : config.warningThreshold ?? 80;
    const message = `CTO "${cto.name}" com ${pct}% de ocupa\xE7\xE3o (${cto.usedPorts}/${capacity} portas). Threshold: ${threshold}%.`;
    await db.insert(ctoAlerts).values({
      ctoId: cto.id,
      occupancyPct: pct,
      threshold,
      severity,
      message
    });
    created++;
  }
  return created;
}
async function getMapGroups() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(mapGroups).orderBy(mapGroups.name);
}
async function createMapGroup(data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const [result] = await db.insert(mapGroups).values({
    name: data.name,
    color: data.color ?? "#6366f1",
    description: data.description ?? null,
    parentId: data.parentId ?? null
  });
  return result.insertId;
}
async function updateMapGroup(id, data) {
  const db = await getDb();
  if (!db) return;
  await db.update(mapGroups).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(mapGroups.id, id));
}
async function deleteMapGroup(id) {
  const db = await getDb();
  if (!db) return;
  await db.delete(mapElementGroups).where(eq(mapElementGroups.groupId, id));
  await db.delete(mapRouteGroups).where(eq(mapRouteGroups.groupId, id));
  await db.delete(mapGroups).where(eq(mapGroups.id, id));
}
async function reorderMapGroups(updates) {
  const db = await getDb();
  if (!db || updates.length === 0) return;
  await Promise.all(updates.map(
    (u) => db.update(mapGroups).set({ sortOrder: u.sortOrder, parentId: u.parentId, updatedAt: /* @__PURE__ */ new Date() }).where(eq(mapGroups.id, u.id))
  ));
}
async function getGroupMembers(groupId) {
  const db = await getDb();
  if (!db) return { elementIds: [], routeIds: [] };
  const elements = await db.select().from(mapElementGroups).where(eq(mapElementGroups.groupId, groupId));
  const routes = await db.select().from(mapRouteGroups).where(eq(mapRouteGroups.groupId, groupId));
  return {
    elementIds: elements.map((e) => e.elementId),
    routeIds: routes.map((r) => r.routeId)
  };
}
async function getElementGroups(elementId) {
  const db = await getDb();
  if (!db) return [];
  const rows = await db.select().from(mapElementGroups).where(eq(mapElementGroups.elementId, elementId));
  return rows.map((r) => r.groupId);
}
async function getRouteGroups(routeId) {
  const db = await getDb();
  if (!db) return [];
  const rows = await db.select().from(mapRouteGroups).where(eq(mapRouteGroups.routeId, routeId));
  return rows.map((r) => r.groupId);
}
async function addElementToGroup(elementId, groupId) {
  const db = await getDb();
  if (!db) return;
  const existing = await db.select().from(mapElementGroups).where(and(eq(mapElementGroups.elementId, elementId), eq(mapElementGroups.groupId, groupId))).limit(1);
  if (existing.length === 0) {
    await db.insert(mapElementGroups).values({ elementId, groupId });
  }
}
async function removeElementFromGroup(elementId, groupId) {
  const db = await getDb();
  if (!db) return;
  await db.delete(mapElementGroups).where(and(eq(mapElementGroups.elementId, elementId), eq(mapElementGroups.groupId, groupId)));
}
async function addRouteToGroup(routeId, groupId) {
  const db = await getDb();
  if (!db) return;
  const existing = await db.select().from(mapRouteGroups).where(and(eq(mapRouteGroups.routeId, routeId), eq(mapRouteGroups.groupId, groupId))).limit(1);
  if (existing.length === 0) {
    await db.insert(mapRouteGroups).values({ routeId, groupId });
  }
}
async function removeRouteFromGroup(routeId, groupId) {
  const db = await getDb();
  if (!db) return;
  await db.delete(mapRouteGroups).where(and(eq(mapRouteGroups.routeId, routeId), eq(mapRouteGroups.groupId, groupId)));
}
async function getAllElementGroupMemberships() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(mapElementGroups);
}
async function addPoleToGroup(poleId, groupId) {
  const db = await getDb();
  if (!db) return;
  const existing = await db.select().from(mapPoleGroups).where(and(eq(mapPoleGroups.poleId, poleId), eq(mapPoleGroups.groupId, groupId))).limit(1);
  if (existing.length === 0) {
    await db.insert(mapPoleGroups).values({ poleId, groupId });
  }
}
async function removePoleFromGroup(poleId, groupId) {
  const db = await getDb();
  if (!db) return;
  await db.delete(mapPoleGroups).where(and(eq(mapPoleGroups.poleId, poleId), eq(mapPoleGroups.groupId, groupId)));
}
async function removePoleFromAllGroups(poleId) {
  const db = await getDb();
  if (!db) return;
  await db.delete(mapPoleGroups).where(eq(mapPoleGroups.poleId, poleId));
}
async function getAllPoleGroupMemberships() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(mapPoleGroups);
}
async function addReserveToGroup(reserveId, groupId) {
  const db = await getDb();
  if (!db) return;
  const existing = await db.select().from(mapReserveGroups).where(and(eq(mapReserveGroups.reserveId, reserveId), eq(mapReserveGroups.groupId, groupId))).limit(1);
  if (existing.length === 0) {
    await db.insert(mapReserveGroups).values({ reserveId, groupId });
  }
}
async function removeReserveFromGroup(reserveId, groupId) {
  const db = await getDb();
  if (!db) return;
  await db.delete(mapReserveGroups).where(and(eq(mapReserveGroups.reserveId, reserveId), eq(mapReserveGroups.groupId, groupId)));
}
async function removeReserveFromAllGroups(reserveId) {
  const db = await getDb();
  if (!db) return;
  await db.delete(mapReserveGroups).where(eq(mapReserveGroups.reserveId, reserveId));
}
async function getAllReserveGroupMemberships() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(mapReserveGroups);
}
async function getAllRouteGroupMemberships() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(mapRouteGroups);
}
async function getRoutesOccupancy() {
  if (!_pool) _pool = createPool();
  const pool = _pool.promise();
  const [routeRows] = await pool.execute(
    `SELECT id, fiberCount, fromElementId, fromTubeId FROM map_routes`
  );
  if (!routeRows.length) return [];
  const fromElementIds = Array.from(
    new Set(routeRows.map((r) => r.fromElementId).filter((id) => id != null))
  );
  const elementTypeMap = /* @__PURE__ */ new Map();
  if (fromElementIds.length > 0) {
    const ph = fromElementIds.map(() => "?").join(",");
    const [elRows] = await pool.execute(
      `SELECT id, type, referenceId FROM map_elements WHERE id IN (${ph})`,
      fromElementIds
    );
    for (const el of elRows) elementTypeMap.set(el.id, { type: el.type, referenceId: el.referenceId });
  }
  const ceoTubeIds = Array.from(new Set(
    routeRows.filter((r) => r.fromTubeId && elementTypeMap.get(r.fromElementId)?.type === "ceo").map((r) => r.fromTubeId)
  ));
  const ctoTubeIds = Array.from(new Set(
    routeRows.filter((r) => r.fromTubeId && elementTypeMap.get(r.fromElementId)?.type === "cto").map((r) => r.fromTubeId)
  ));
  const ceoTubeStats = /* @__PURE__ */ new Map();
  const ctoTubeStats = /* @__PURE__ */ new Map();
  if (ceoTubeIds.length > 0) {
    const ph = ceoTubeIds.map(() => "?").join(",");
    const [tubeRows] = await pool.execute(
      `SELECT id, identifier, totalVias FROM ceo_tubes WHERE id IN (${ph})`,
      ceoTubeIds
    );
    const [fusedRows] = await pool.execute(
      `SELECT tubeId, COUNT(*) AS cnt FROM ceo_vias WHERE tubeId IN (${ph}) AND fusedToViaId IS NOT NULL GROUP BY tubeId`,
      ceoTubeIds
    );
    const fusedMap = /* @__PURE__ */ new Map();
    for (const f of fusedRows) fusedMap.set(Number(f.tubeId), Number(f.cnt));
    for (const t2 of tubeRows) ceoTubeStats.set(Number(t2.id), { fusedCount: fusedMap.get(Number(t2.id)) ?? 0, label: t2.identifier, totalVias: Number(t2.totalVias) });
  }
  if (ctoTubeIds.length > 0) {
    const ph = ctoTubeIds.map(() => "?").join(",");
    const [tubeRows] = await pool.execute(
      `SELECT id, identifier, totalVias FROM cto_tubes WHERE id IN (${ph})`,
      ctoTubeIds
    );
    const [fusedRows] = await pool.execute(
      `SELECT tubeId, COUNT(*) AS cnt FROM cto_vias WHERE tubeId IN (${ph}) AND fusedToViaId IS NOT NULL GROUP BY tubeId`,
      ctoTubeIds
    );
    const fusedMap = /* @__PURE__ */ new Map();
    for (const f of fusedRows) fusedMap.set(Number(f.tubeId), Number(f.cnt));
    for (const t2 of tubeRows) ctoTubeStats.set(Number(t2.id), { fusedCount: fusedMap.get(Number(t2.id)) ?? 0, label: t2.identifier, totalVias: Number(t2.totalVias) });
  }
  const fallbackElementIds = Array.from(new Set(
    routeRows.filter((r) => !r.fromTubeId && r.fromElementId != null).map((r) => r.fromElementId)
  ));
  const elementFusedMap = /* @__PURE__ */ new Map();
  if (fallbackElementIds.length > 0) {
    const ceoElIds = fallbackElementIds.filter((id) => elementTypeMap.get(id)?.type === "ceo");
    if (ceoElIds.length > 0) {
      const ph = ceoElIds.map(() => "?").join(",");
      const refIds = ceoElIds.map((id) => elementTypeMap.get(id).referenceId);
      const phRef = refIds.map(() => "?").join(",");
      const [rows] = await pool.execute(
        `SELECT ct.ceoId, COUNT(cv.id) AS cnt
         FROM ceo_tubes ct
         JOIN ceo_vias cv ON cv.tubeId = ct.id AND cv.fusedToViaId IS NOT NULL
         WHERE ct.ceoId IN (${phRef})
         GROUP BY ct.ceoId`,
        refIds
      );
      const ceoFusedMap = /* @__PURE__ */ new Map();
      for (const r of rows) ceoFusedMap.set(Number(r.ceoId), Number(r.cnt));
      for (const elId of ceoElIds) {
        const refId = elementTypeMap.get(elId)?.referenceId;
        elementFusedMap.set(elId, refId != null ? ceoFusedMap.get(refId) ?? 0 : 0);
      }
    }
    const ctoElIds = fallbackElementIds.filter((id) => elementTypeMap.get(id)?.type === "cto");
    if (ctoElIds.length > 0) {
      const refIds = ctoElIds.map((id) => elementTypeMap.get(id).referenceId);
      const phRef = refIds.map(() => "?").join(",");
      const [rows] = await pool.execute(
        `SELECT ct.ctoId, COUNT(cv.id) AS cnt
         FROM cto_tubes ct
         JOIN cto_vias cv ON cv.tubeId = ct.id AND cv.fusedToViaId IS NOT NULL
         WHERE ct.ctoId IN (${phRef})
         GROUP BY ct.ctoId`,
        refIds
      );
      const ctoFusedMap = /* @__PURE__ */ new Map();
      for (const r of rows) ctoFusedMap.set(Number(r.ctoId), Number(r.cnt));
      for (const elId of ctoElIds) {
        const refId = elementTypeMap.get(elId)?.referenceId;
        elementFusedMap.set(elId, refId != null ? ctoFusedMap.get(refId) ?? 0 : 0);
      }
    }
  }
  const result = [];
  for (const route of routeRows) {
    const fiberCount = Number(route.fiberCount ?? 12);
    const elInfo = route.fromElementId != null ? elementTypeMap.get(route.fromElementId) : void 0;
    if (route.fromTubeId) {
      const stats = elInfo?.type === "ceo" ? ceoTubeStats.get(Number(route.fromTubeId)) : ctoTubeStats.get(Number(route.fromTubeId));
      const fusedCount2 = stats?.fusedCount ?? 0;
      const tubeLabel = stats?.label ?? null;
      const effectiveFiberCount = fiberCount > 0 ? fiberCount : stats?.totalVias ?? 12;
      const pct2 = effectiveFiberCount > 0 ? Math.min(100, Math.round(fusedCount2 / effectiveFiberCount * 100)) : 0;
      result.push({ routeId: Number(route.id), fiberCount: effectiveFiberCount, fusedCount: fusedCount2, pct: pct2, tubeLabel });
      continue;
    }
    const fusedCount = route.fromElementId != null ? elementFusedMap.get(route.fromElementId) ?? 0 : 0;
    const pct = fiberCount > 0 ? Math.min(100, Math.round(fusedCount / fiberCount * 100)) : 0;
    result.push({ routeId: Number(route.id), fiberCount, fusedCount, pct, tubeLabel: null });
  }
  return result;
}
async function getTubesByMapElement(elementId) {
  const db = await getDb();
  if (!db) return [];
  const [el] = await db.select().from(mapElements).where(eq(mapElements.id, elementId));
  if (!el) return [];
  if (el.type === "ceo") {
    const rows = await db.select().from(ceoTubes).where(eq(ceoTubes.ceoId, el.referenceId));
    return rows.sort((a, b) => a.identifier.localeCompare(b.identifier, "pt-BR", { numeric: true })).map((r) => ({ id: r.id, identifier: r.identifier, totalVias: r.totalVias, color: r.color, type: r.type ?? "tube" }));
  } else if (el.type === "cto") {
    const rows = await db.select().from(ctoTubes).where(eq(ctoTubes.ctoId, el.referenceId));
    return rows.sort((a, b) => a.identifier.localeCompare(b.identifier, "pt-BR", { numeric: true })).map((r) => ({ id: r.id, identifier: r.identifier, totalVias: r.totalVias, color: r.color, type: r.type ?? "tube" }));
  }
  return [];
}
async function addSgpLinkHistory(data) {
  const db = await getDb();
  if (!db) return;
  await db.insert(sgpLinkHistory).values({
    ctoId: data.ctoId,
    ctoName: data.ctoName,
    sgpId: data.sgpId ?? null,
    action: data.action,
    performedBy: data.performedBy ?? null
  });
}
async function getSgpLinkHistory(ctoId) {
  const db = await getDb();
  if (!db) return [];
  if (ctoId != null) {
    return db.select().from(sgpLinkHistory).where(eq(sgpLinkHistory.ctoId, ctoId)).orderBy(desc(sgpLinkHistory.createdAt)).limit(50);
  }
  return db.select().from(sgpLinkHistory).orderBy(desc(sgpLinkHistory.createdAt)).limit(100);
}
async function getBandejasByCeo(ceoId) {
  const db = await getDb();
  if (!db) return [];
  const rows = await db.select().from(ceoBandejas).where(eq(ceoBandejas.ceoId, ceoId));
  return rows.sort((a, b) => a.number - b.number);
}
async function createCeoBandeja(data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const result = await db.insert(ceoBandejas).values(data);
  return result[0]?.insertId ?? 0;
}
async function updateCeoBandeja(id, data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(ceoBandejas).set(data).where(eq(ceoBandejas.id, id));
}
async function deleteCeoBandeja(id, deleteTubes = false) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const splitters = await db.select().from(ceoSplitters).where(eq(ceoSplitters.bandejaId, id));
  for (const s of splitters) {
    await db.delete(ceoSplitterVias).where(eq(ceoSplitterVias.splitterId, s.id));
  }
  await db.delete(ceoSplitters).where(eq(ceoSplitters.bandejaId, id));
  if (deleteTubes) {
    const tubes = await db.select({ id: ceoTubes.id }).from(ceoTubes).where(eq(ceoTubes.bandejaId, id));
    for (const t2 of tubes) {
      await db.update(ceoVias).set({ fusedToTubeId: null, fusedToViaId: null }).where(eq(ceoVias.fusedToTubeId, t2.id));
      await db.delete(ceoVias).where(eq(ceoVias.tubeId, t2.id));
    }
    await db.delete(ceoTubes).where(eq(ceoTubes.bandejaId, id));
  } else {
    await db.update(ceoTubes).set({ bandejaId: null }).where(eq(ceoTubes.bandejaId, id));
  }
  await db.delete(ceoBandejas).where(eq(ceoBandejas.id, id));
}
function getUnbalancedLoss(ratio) {
  const match = ratio.match(/(\d+)\/(\d+)/);
  if (!match) return { inputLoss: 0, outputs: [3.5, 3.5] };
  const p1 = parseInt(match[1]);
  const p2 = parseInt(match[2]);
  const loss1 = parseFloat((-10 * Math.log10(p1 / 100)).toFixed(1));
  const loss2 = parseFloat((-10 * Math.log10(p2 / 100)).toFixed(1));
  return { inputLoss: 0, outputs: [loss1, loss2] };
}
async function getSplittersByCeo(ceoId) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(ceoSplitters).where(eq(ceoSplitters.ceoId, ceoId));
}
async function getSplittersByBandeja(bandejaId) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(ceoSplitters).where(eq(ceoSplitters.bandejaId, bandejaId));
}
async function createCeoSplitter(data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const result = await db.insert(ceoSplitters).values(data);
  const insertId = result[0]?.insertId ?? 0;
  const vias = [];
  if (data.splitterType === "balanced") {
    const outputCount = parseInt(data.ratio.split(":")[1] ?? "2");
    const lossDb = BALANCED_LOSS_DB[data.ratio] ?? 3.5;
    vias.push({ splitterId: insertId, ceoId: data.ceoId, viaNumber: 0, label: "Entrada", lossDb: 0 });
    for (let i = 1; i <= outputCount; i++) {
      vias.push({ splitterId: insertId, ceoId: data.ceoId, viaNumber: i, label: `Sa\xEDda ${i}`, lossDb });
    }
  } else {
    const { inputLoss, outputs } = getUnbalancedLoss(data.ratio);
    vias.push({ splitterId: insertId, ceoId: data.ceoId, viaNumber: 0, label: "Entrada", lossDb: inputLoss });
    outputs.forEach((loss, idx) => {
      vias.push({ splitterId: insertId, ceoId: data.ceoId, viaNumber: idx + 1, label: `Sa\xEDda ${idx + 1}`, lossDb: loss });
    });
  }
  if (vias.length > 0) {
    await db.insert(ceoSplitterVias).values(vias);
  }
  return insertId;
}
async function updateCeoSplitter(id, data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(ceoSplitters).set(data).where(eq(ceoSplitters.id, id));
}
async function deleteCeoSplitter(id) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.delete(ceoViaAssociations).where(
    and(
      eq(ceoViaAssociations.ceoId, (await db.select({ ceoId: ceoSplitters.ceoId }).from(ceoSplitters).where(eq(ceoSplitters.id, id)).limit(1))[0]?.ceoId ?? 0)
      // Não filtramos por via aqui — apagamos as vias primeiro e depois as associações ficam órfãs
    )
  );
  await db.delete(ceoSplitterVias).where(eq(ceoSplitterVias.splitterId, id));
  await db.delete(ceoSplitters).where(eq(ceoSplitters.id, id));
}
async function getSplitterViasBySplitter(splitterId) {
  const db = await getDb();
  if (!db) return [];
  const rows = await db.select().from(ceoSplitterVias).where(eq(ceoSplitterVias.splitterId, splitterId));
  return rows.sort((a, b) => a.viaNumber - b.viaNumber);
}
async function getSplitterViasByCeo(ceoId) {
  const db = await getDb();
  if (!db) return [];
  const rows = await db.select().from(ceoSplitterVias).where(eq(ceoSplitterVias.ceoId, ceoId));
  return rows.sort((a, b) => a.viaNumber - b.viaNumber);
}
async function updateCeoSplitterVia(id, data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(ceoSplitterVias).set(data).where(eq(ceoSplitterVias.id, id));
}
async function getViaAssociationsByCeo(ceoId) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(ceoViaAssociations).where(eq(ceoViaAssociations.ceoId, ceoId));
}
async function createViaAssociation(data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const existing = await db.select().from(ceoViaAssociations).where(
    and(
      eq(ceoViaAssociations.ceoId, data.ceoId),
      eq(ceoViaAssociations.sourceViaId, data.sourceViaId),
      eq(ceoViaAssociations.targetViaId, data.targetViaId)
    )
  ).limit(1);
  if (existing.length > 0) return existing[0].id;
  const existingSrcAsSource = await db.select().from(ceoViaAssociations).where(
    and(
      eq(ceoViaAssociations.ceoId, data.ceoId),
      eq(ceoViaAssociations.sourceViaId, data.sourceViaId)
    )
  ).limit(1);
  if (existingSrcAsSource.length > 0) throw new Error("Esta via j\xE1 tem uma fus\xE3o associada.");
  const existingSrcAsTarget = await db.select().from(ceoViaAssociations).where(
    and(
      eq(ceoViaAssociations.ceoId, data.ceoId),
      eq(ceoViaAssociations.targetViaId, data.sourceViaId)
    )
  ).limit(1);
  if (existingSrcAsTarget.length > 0) throw new Error("Esta via j\xE1 tem uma fus\xE3o associada.");
  const existingTgtAsTarget = await db.select().from(ceoViaAssociations).where(
    and(
      eq(ceoViaAssociations.ceoId, data.ceoId),
      eq(ceoViaAssociations.targetViaId, data.targetViaId)
    )
  ).limit(1);
  if (existingTgtAsTarget.length > 0) throw new Error("Esta via j\xE1 tem uma fus\xE3o associada.");
  const existingTgtAsSource = await db.select().from(ceoViaAssociations).where(
    and(
      eq(ceoViaAssociations.ceoId, data.ceoId),
      eq(ceoViaAssociations.sourceViaId, data.targetViaId)
    )
  ).limit(1);
  if (existingTgtAsSource.length > 0) throw new Error("Esta via j\xE1 tem uma fus\xE3o associada.");
  const result = await db.insert(ceoViaAssociations).values(data);
  return result[0]?.insertId ?? 0;
}
async function deleteViaAssociation(id) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const [assoc] = await db.select().from(ceoViaAssociations).where(eq(ceoViaAssociations.id, id)).limit(1);
  await db.delete(ceoViaAssociations).where(eq(ceoViaAssociations.id, id));
  if (assoc) {
    let tubeViaId = null;
    if (assoc.sourceType === "tube" && assoc.targetType === "splitter") {
      tubeViaId = assoc.sourceViaId;
    } else if (assoc.sourceType === "splitter" && assoc.targetType === "tube") {
      tubeViaId = assoc.targetViaId;
    }
    if (tubeViaId !== null) {
      await db.update(ceoVias).set({ fusedToSplitterId: null, fusedToSplitterViaId: null }).where(eq(ceoVias.id, tubeViaId));
    }
  }
}
async function deleteViaAssociationByVias(ceoId, viaId1, viaId2) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.delete(ceoViaAssociations).where(
    and(
      eq(ceoViaAssociations.ceoId, ceoId),
      eq(ceoViaAssociations.sourceViaId, viaId1),
      eq(ceoViaAssociations.targetViaId, viaId2)
    )
  );
  await db.delete(ceoViaAssociations).where(
    and(
      eq(ceoViaAssociations.ceoId, ceoId),
      eq(ceoViaAssociations.sourceViaId, viaId2),
      eq(ceoViaAssociations.targetViaId, viaId1)
    )
  );
}
function haversineMeters(a, b) {
  const R = 6371e3;
  const toRad = (v) => v * Math.PI / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}
function interpolatePoint(a, b, d, segLen) {
  const t2 = segLen > 0 ? Math.min(1, d / segLen) : 0;
  return { lat: a.lat + (b.lat - a.lat) * t2, lng: a.lng + (b.lng - a.lng) * t2 };
}
async function traceOtdrPath(startElementId, startTubeId, startViaNumber, targetDistanceMeters) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const warnings = [];
  const tracedPath = [];
  let distanceTraveled = 0;
  let totalLength = 0;
  const allElements = await db.select().from(mapElements);
  const allRoutes = await db.select().from(mapRoutes);
  const allCeoTubes = await db.select().from(ceoTubes);
  const allCtoTubes = await db.select().from(ctoTubes);
  const allCeoVias = await db.select().from(ceoVias);
  const allCtoVias = await db.select().from(ctoVias);
  const allCeos = await db.select({ id: ceos.id, name: ceos.name }).from(ceos);
  const allCtos = await db.select({ id: ctos.id, name: ctos.name }).from(ctos);
  const allCeoSplitters = await db.select().from(ceoSplitters);
  const allCeoSplitterVias = await db.select().from(ceoSplitterVias);
  const allTechReserves = await db.select().from(mapTechnicalReserves);
  const reserveByRoute = /* @__PURE__ */ new Map();
  for (const r of allTechReserves) {
    if (r.routeId != null) {
      reserveByRoute.set(r.routeId, (reserveByRoute.get(r.routeId) ?? 0) + r.sizeMeters);
    }
  }
  const elementById = new Map(allElements.map((e) => [e.id, e]));
  const ceoTubeById = new Map(allCeoTubes.map((t2) => [t2.id, t2]));
  const ctoTubeById = new Map(allCtoTubes.map((t2) => [t2.id, t2]));
  const ceoViaById = new Map(allCeoVias.map((v) => [v.id, v]));
  const ctoViaById = new Map(allCtoVias.map((v) => [v.id, v]));
  const ceoById = new Map(allCeos.map((c) => [c.id, c]));
  const ctoById = new Map(allCtos.map((c) => [c.id, c]));
  const ceoSplitterById = new Map(allCeoSplitters.map((s) => [s.id, s]));
  const splitterViasBySplitter = /* @__PURE__ */ new Map();
  for (const sv of allCeoSplitterVias) {
    if (!splitterViasBySplitter.has(sv.splitterId)) splitterViasBySplitter.set(sv.splitterId, []);
    splitterViasBySplitter.get(sv.splitterId).push(sv);
  }
  function getElementName(el) {
    if (el.type === "ceo") return ceoById.get(el.referenceId)?.name ?? `CEO #${el.referenceId}`;
    return ctoById.get(el.referenceId)?.name ?? `CTO #${el.referenceId}`;
  }
  function findRouteFromTube(elementId, tubeId, viaNumber) {
    const forwardRoutes = allRoutes.filter((r) => r.fromElementId === elementId && r.fromTubeId === tubeId);
    if (forwardRoutes.length === 1) return { route: forwardRoutes[0], isForward: true };
    if (forwardRoutes.length > 1 && viaNumber !== void 0) {
      const best = forwardRoutes.find((r) => {
        if (!r.toElementId || !r.toTubeId) return false;
        const destEl = elementById.get(r.toElementId);
        if (!destEl) return false;
        const destVia = destEl.type === "ceo" ? allCeoVias.find((v) => v.tubeId === r.toTubeId && v.viaNumber === viaNumber) : allCtoVias.find((v) => v.tubeId === r.toTubeId && v.viaNumber === viaNumber);
        return !!destVia;
      });
      if (best) return { route: best, isForward: true };
      return { route: forwardRoutes[0], isForward: true };
    }
    if (forwardRoutes.length > 0) return { route: forwardRoutes[0], isForward: true };
    const backwardRoutes = allRoutes.filter((r) => r.toElementId === elementId && r.toTubeId === tubeId);
    if (backwardRoutes.length === 1) return { route: backwardRoutes[0], isForward: false };
    if (backwardRoutes.length > 1 && viaNumber !== void 0) {
      const best = backwardRoutes.find((r) => {
        if (!r.fromElementId || !r.fromTubeId) return false;
        const destEl = elementById.get(r.fromElementId);
        if (!destEl) return false;
        const destVia = destEl.type === "ceo" ? allCeoVias.find((v) => v.tubeId === r.fromTubeId && v.viaNumber === viaNumber) : allCtoVias.find((v) => v.tubeId === r.fromTubeId && v.viaNumber === viaNumber);
        return !!destVia;
      });
      if (best) return { route: best, isForward: false };
      return { route: backwardRoutes[0], isForward: false };
    }
    if (backwardRoutes.length > 0) return { route: backwardRoutes[0], isForward: false };
    return null;
  }
  function getViaByNumber(elementType, tubeId, viaNumber) {
    if (elementType === "ceo") {
      return allCeoVias.find((v) => v.tubeId === tubeId && v.viaNumber === viaNumber) ?? null;
    }
    return allCtoVias.find((v) => v.tubeId === tubeId && v.viaNumber === viaNumber) ?? null;
  }
  let currentElementId = startElementId;
  let currentTubeId = startTubeId;
  let currentViaNumber = startViaNumber;
  const visitedElements = /* @__PURE__ */ new Set();
  for (let iteration = 0; iteration < 50; iteration++) {
    const currentElement = elementById.get(currentElementId);
    if (!currentElement) {
      warnings.push(`Elemento #${currentElementId} n\xE3o encontrado no mapa`);
      break;
    }
    const loopKey = `${currentElementId}:${currentTubeId}:${currentViaNumber}`;
    if (visitedElements.has(loopKey)) {
      warnings.push("Loop detectado na cadeia de fus\xF5es \u2014 travessia interrompida");
      break;
    }
    visitedElements.add(loopKey);
    const routeResult = findRouteFromTube(currentElementId, currentTubeId, currentViaNumber);
    if (!routeResult) {
      const routeNoTube = allRoutes.find(
        (r) => r.fromElementId === currentElementId && !r.fromTubeId || r.toElementId === currentElementId && !r.toTubeId
      );
      if (!routeNoTube) {
        warnings.push(`Nenhuma rota encontrada saindo do elemento "${getElementName(currentElement)}" pelo tubo #${currentTubeId}. Verifique se o cabo est\xE1 vinculado ao tubo correcto.`);
        return {
          found: false,
          lat: null,
          lng: null,
          distanceTraveled,
          totalLength,
          segmentName: null,
          segmentRouteId: null,
          elementReached: { id: currentElementId, name: getElementName(currentElement), type: currentElement.type },
          tracedPath,
          warnings
        };
      }
      warnings.push(`Rota "${routeNoTube.name ?? `#${routeNoTube.id}`}" n\xE3o tem tubo vinculado \u2014 usando rota sem v\xEDnculo de tubo`);
    }
    const isForward = routeResult ? routeResult.isForward : allRoutes.find(
      (r) => r.fromElementId === currentElementId && !r.fromTubeId
    ) != null;
    const activeRoute = routeResult ? routeResult.route : allRoutes.find(
      (r) => r.fromElementId === currentElementId && !r.fromTubeId || r.toElementId === currentElementId && !r.toTubeId
    );
    const tubeInfo = currentElement.type === "ceo" ? ceoTubeById.get(currentTubeId) : ctoTubeById.get(currentTubeId);
    if (tubeInfo && tubeInfo.type === "splitter") {
      warnings.push(`Aten\xE7\xE3o: a fibra passa por um splitter em "${getElementName(currentElement)}" \u2014 o sinal \xE9 dividido`);
    }
    const nextElementId = isForward ? activeRoute.toElementId : activeRoute.fromElementId;
    let pathPoints = [];
    try {
      pathPoints = activeRoute.path ? JSON.parse(activeRoute.path) : [];
    } catch {
      warnings.push(`Tra\xE7ado da rota "${activeRoute.name ?? `#${activeRoute.id}`}" \xE9 inv\xE1lido`);
    }
    if (pathPoints.length < 2) {
      const fromEl = elementById.get(activeRoute.fromElementId ?? 0);
      const toEl = elementById.get(activeRoute.toElementId ?? 0);
      if (fromEl && toEl) {
        pathPoints = [
          { lat: fromEl.lat, lng: fromEl.lng },
          { lat: toEl.lat, lng: toEl.lng }
        ];
        warnings.push(`Rota "${activeRoute.name ?? `#${activeRoute.id}`}" sem tra\xE7ado desenhado \u2014 usando linha recta (aproxima\xE7\xE3o)`);
      } else {
        warnings.push(`Rota "${activeRoute.name ?? `#${activeRoute.id}`}" sem tra\xE7ado e sem elementos vinculados`);
        break;
      }
    } else {
      const fromEl = elementById.get(activeRoute.fromElementId ?? 0);
      const toEl = elementById.get(activeRoute.toElementId ?? 0);
      if (fromEl && toEl && pathPoints.length >= 2) {
        const firstPt = pathPoints[0];
        const lastPt = pathPoints[pathPoints.length - 1];
        const distFirstToFrom = haversineMeters(firstPt, { lat: fromEl.lat, lng: fromEl.lng });
        const distFirstToTo = haversineMeters(firstPt, { lat: toEl.lat, lng: toEl.lng });
        const distLastToFrom = haversineMeters(lastPt, { lat: fromEl.lat, lng: fromEl.lng });
        if (distFirstToTo < distFirstToFrom && distLastToFrom < distFirstToFrom) {
          pathPoints = [...pathPoints].reverse();
        }
      }
    }
    const pts = isForward ? pathPoints : [...pathPoints].reverse();
    if (tracedPath.length === 0 && pts.length > 0) {
      tracedPath.push(pts[0]);
    }
    for (let i = 1; i < pts.length; i++) {
      const segLen = haversineMeters(pts[i - 1], pts[i]);
      totalLength += segLen;
      if (distanceTraveled + segLen >= targetDistanceMeters) {
        const remaining = targetDistanceMeters - distanceTraveled;
        const pt = interpolatePoint(pts[i - 1], pts[i], remaining, segLen);
        tracedPath.push(pt);
        distanceTraveled = targetDistanceMeters;
        return {
          found: true,
          lat: pt.lat,
          lng: pt.lng,
          distanceTraveled,
          totalLength: totalLength + (segLen - remaining),
          // aproximação
          segmentName: activeRoute.name ?? null,
          segmentRouteId: activeRoute.id,
          elementReached: null,
          tracedPath,
          warnings
        };
      }
      distanceTraveled += segLen;
      tracedPath.push(pts[i]);
    }
    const reserveMeters = reserveByRoute.get(activeRoute.id) ?? 0;
    if (reserveMeters > 0) {
      warnings.push(`Reserva t\xE9cnica de ${reserveMeters}m inclu\xEDda no c\xE1lculo da rota "${activeRoute.name ?? `#${activeRoute.id}`}"`);
      totalLength += reserveMeters;
      if (distanceTraveled + reserveMeters >= targetDistanceMeters) {
        const remaining = targetDistanceMeters - distanceTraveled;
        const endPt = pts[pts.length - 1] ?? pts[0];
        distanceTraveled = targetDistanceMeters;
        return {
          found: true,
          lat: endPt.lat,
          lng: endPt.lng,
          distanceTraveled,
          totalLength,
          segmentName: activeRoute.name ?? null,
          segmentRouteId: activeRoute.id,
          elementReached: null,
          tracedPath,
          warnings: [...warnings, `Ponto OTDR localizado dentro da reserva t\xE9cnica de ${reserveMeters}m (${Math.round(remaining)}m usados da reserva)`]
        };
      }
      distanceTraveled += reserveMeters;
    }
    if (!nextElementId) {
      const elName = getElementName(currentElement);
      return {
        found: false,
        lat: null,
        lng: null,
        distanceTraveled,
        totalLength,
        segmentName: activeRoute.name ?? null,
        segmentRouteId: activeRoute.id,
        elementReached: { id: currentElementId, name: elName, type: currentElement.type },
        tracedPath,
        warnings: [...warnings, `A fibra termina no elemento "${getElementName(elementById.get(nextElementId ?? 0) ?? currentElement)}" ap\xF3s ${Math.round(distanceTraveled)} m (dist\xE2ncia alvo: ${targetDistanceMeters} m)`]
      };
    }
    const nextElement = elementById.get(nextElementId);
    if (!nextElement) {
      warnings.push(`Elemento destino #${nextElementId} n\xE3o encontrado`);
      break;
    }
    const arrivalTubeId = isForward ? activeRoute.toTubeId ?? null : activeRoute.fromTubeId ?? null;
    if (!arrivalTubeId) {
      return {
        found: false,
        lat: null,
        lng: null,
        distanceTraveled,
        totalLength,
        segmentName: activeRoute.name ?? null,
        segmentRouteId: activeRoute.id,
        elementReached: { id: nextElementId, name: getElementName(nextElement), type: nextElement.type },
        tracedPath,
        warnings: [...warnings, `Cabo chega ao elemento "${getElementName(nextElement)}" mas n\xE3o tem tubo de chegada vinculado \u2014 n\xE3o \xE9 poss\xEDvel seguir a fus\xE3o. Configure o tubo de chegada na rota.`]
      };
    }
    const arrivalVia = getViaByNumber(nextElement.type, arrivalTubeId, currentViaNumber);
    if (!arrivalVia) {
      return {
        found: false,
        lat: null,
        lng: null,
        distanceTraveled,
        totalLength,
        segmentName: activeRoute.name ?? null,
        segmentRouteId: activeRoute.id,
        elementReached: { id: nextElementId, name: getElementName(nextElement), type: nextElement.type },
        tracedPath,
        warnings: [...warnings, `Via ${currentViaNumber} n\xE3o encontrada no tubo de chegada em "${getElementName(nextElement)}" \u2014 verifique se as vias foram criadas`]
      };
    }
    if (nextElement.type === "ceo" && !arrivalVia.fusedToViaId && !arrivalVia.fusedToTubeId) {
      const ceoArrivalVia = arrivalVia;
      if (ceoArrivalVia.fusedToSplitterId != null) {
        const splitter = ceoSplitterById.get(ceoArrivalVia.fusedToSplitterId);
        if (!splitter) {
          return {
            found: false,
            lat: null,
            lng: null,
            distanceTraveled,
            totalLength,
            segmentName: activeRoute.name ?? null,
            segmentRouteId: activeRoute.id,
            elementReached: { id: nextElementId, name: getElementName(nextElement), type: nextElement.type },
            tracedPath,
            warnings: [...warnings, `Splitter #${ceoArrivalVia.fusedToSplitterId} n\xE3o encontrado no CEO "${getElementName(nextElement)}"`]
          };
        }
        const splitterVias = splitterViasBySplitter.get(splitter.id) ?? [];
        let foundExitTubeId = null;
        let foundExitViaNumber = currentViaNumber;
        for (const splVia of splitterVias) {
          if (splVia.viaNumber === 0) continue;
          const exitCeoVia = allCeoVias.find(
            (v) => v.ceoId === nextElement.referenceId && v.fusedToSplitterId === splitter.id && v.fusedToSplitterViaId === splVia.id
          );
          if (exitCeoVia) {
            const hasRoute = allRoutes.some(
              (r) => r.fromElementId === nextElementId && r.fromTubeId === exitCeoVia.tubeId || r.toElementId === nextElementId && r.toTubeId === exitCeoVia.tubeId
            );
            if (hasRoute) {
              foundExitTubeId = exitCeoVia.tubeId;
              foundExitViaNumber = exitCeoVia.viaNumber;
              break;
            }
          }
        }
        if (foundExitTubeId === null) {
          const targetSplVia = ceoArrivalVia.fusedToSplitterViaId != null ? allCeoSplitterVias.find((sv) => sv.id === ceoArrivalVia.fusedToSplitterViaId) : null;
          const splViaNum = targetSplVia?.viaNumber ?? 1;
          warnings.push(`Splitter "${splitter.identifier}" em "${getElementName(nextElement)}": via de sa\xEDda ${splViaNum} n\xE3o tem tubo de sa\xEDda configurado`);
          return {
            found: false,
            lat: null,
            lng: null,
            distanceTraveled,
            totalLength,
            segmentName: activeRoute.name ?? null,
            segmentRouteId: activeRoute.id,
            elementReached: { id: nextElementId, name: getElementName(nextElement), type: nextElement.type },
            tracedPath,
            warnings
          };
        }
        warnings.push(`Fibra passa pelo splitter "${splitter.identifier}" em "${getElementName(nextElement)}" \u2014 sinal dividido`);
        currentElementId = nextElementId;
        currentTubeId = foundExitTubeId;
        currentViaNumber = foundExitViaNumber;
        continue;
      }
      return {
        found: false,
        lat: null,
        lng: null,
        distanceTraveled,
        totalLength,
        segmentName: activeRoute.name ?? null,
        segmentRouteId: activeRoute.id,
        elementReached: { id: nextElementId, name: getElementName(nextElement), type: nextElement.type },
        tracedPath,
        warnings: [...warnings, `A fibra chega ao elemento "${getElementName(nextElement)}" mas a via ${currentViaNumber} n\xE3o tem fus\xE3o de sa\xEDda registada \u2014 a fibra termina aqui`]
      };
    } else if (!arrivalVia.fusedToViaId || !arrivalVia.fusedToTubeId) {
      return {
        found: false,
        lat: null,
        lng: null,
        distanceTraveled,
        totalLength,
        segmentName: activeRoute.name ?? null,
        segmentRouteId: activeRoute.id,
        elementReached: { id: nextElementId, name: getElementName(nextElement), type: nextElement.type },
        tracedPath,
        warnings: [...warnings, `A fibra chega ao elemento "${getElementName(nextElement)}" mas a via ${currentViaNumber} n\xE3o tem fus\xE3o de sa\xEDda registada \u2014 a fibra termina aqui`]
      };
    }
    const exitTubeId = arrivalVia.fusedToTubeId;
    const exitViaId = arrivalVia.fusedToViaId;
    let exitViaNumber = currentViaNumber;
    if (nextElement.type === "ceo") {
      const exitVia = ceoViaById.get(exitViaId);
      if (exitVia) exitViaNumber = exitVia.viaNumber;
    } else {
      const exitVia = ctoViaById.get(exitViaId);
      if (exitVia) exitViaNumber = exitVia.viaNumber;
    }
    currentElementId = nextElementId;
    currentTubeId = exitTubeId;
    currentViaNumber = exitViaNumber;
  }
  return {
    found: false,
    lat: null,
    lng: null,
    distanceTraveled,
    totalLength,
    segmentName: null,
    segmentRouteId: null,
    elementReached: null,
    tracedPath,
    warnings: [...warnings, `Dist\xE2ncia alvo (${targetDistanceMeters} m) excede o comprimento total da cadeia de fibra percorrida (${Math.round(distanceTraveled)} m)`]
  };
}
async function getMapOltElements() {
  const db = await getDb();
  if (!db) return [];
  const rows = await db.select({
    id: mapOltElements.id,
    equipmentId: mapOltElements.equipmentId,
    lat: mapOltElements.lat,
    lng: mapOltElements.lng,
    defaultTxPowerDbm: mapOltElements.defaultTxPowerDbm,
    fiberAttenuationDbPerKm: mapOltElements.fiberAttenuationDbPerKm,
    fusionLossDb: mapOltElements.fusionLossDb,
    notes: mapOltElements.notes,
    createdAt: mapOltElements.createdAt,
    updatedAt: mapOltElements.updatedAt,
    equipmentName: equipments.name
  }).from(mapOltElements).leftJoin(equipments, eq(mapOltElements.equipmentId, equipments.id));
  return rows.map((r) => ({ ...r, equipmentName: r.equipmentName ?? `OLT #${r.equipmentId}` }));
}
async function getMapOltElementById(id) {
  const db = await getDb();
  if (!db) return null;
  const [row] = await db.select({
    id: mapOltElements.id,
    equipmentId: mapOltElements.equipmentId,
    lat: mapOltElements.lat,
    lng: mapOltElements.lng,
    defaultTxPowerDbm: mapOltElements.defaultTxPowerDbm,
    fiberAttenuationDbPerKm: mapOltElements.fiberAttenuationDbPerKm,
    fusionLossDb: mapOltElements.fusionLossDb,
    notes: mapOltElements.notes,
    createdAt: mapOltElements.createdAt,
    updatedAt: mapOltElements.updatedAt,
    equipmentName: equipments.name
  }).from(mapOltElements).leftJoin(equipments, eq(mapOltElements.equipmentId, equipments.id)).where(eq(mapOltElements.id, id));
  if (!row) return null;
  return { ...row, equipmentName: row.equipmentName ?? `OLT #${row.equipmentId}` };
}
async function createMapOltElement(data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const result = await db.insert(mapOltElements).values(data);
  return result[0].insertId;
}
async function updateMapOltElement(id, data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(mapOltElements).set(data).where(eq(mapOltElements.id, id));
}
async function deleteMapOltElement(id) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.delete(mapOltElements).where(eq(mapOltElements.id, id));
}
async function getOltPortLinks(oltElementId) {
  const db = await getDb();
  if (!db) return [];
  const links = await db.select().from(oltPortFiberLinks).where(eq(oltPortFiberLinks.oltElementId, oltElementId));
  if (links.length === 0) return [];
  const portIds = Array.from(new Set(links.map((l) => l.portId)));
  const allPorts = await db.select({
    id: ports.id,
    label: ports.label,
    portNumber: ports.portNumber,
    slotId: ports.slotId
  }).from(ports).where(sql`${ports.id} IN (${sql.join(portIds.map((id) => sql`${id}`), sql`, `)})`);
  ;
  const allElements = await db.select({ id: mapElements.id, type: mapElements.type, referenceId: mapElements.referenceId }).from(mapElements);
  const allCeos = await db.select({ id: ceos.id, name: ceos.name }).from(ceos);
  const allCeoTubes = await db.select({ id: ceoTubes.id, identifier: ceoTubes.identifier }).from(ceoTubes);
  const slotIds = Array.from(new Set(allPorts.map((p) => p.slotId).filter(Boolean)));
  let slotMap = /* @__PURE__ */ new Map();
  if (slotIds.length > 0) {
    const allSlots = await db.select({ id: equipmentSlots.id, slotNumber: equipmentSlots.slotNumber, label: equipmentSlots.label }).from(equipmentSlots).where(sql`${equipmentSlots.id} IN (${sql.join(slotIds.map((id) => sql`${id}`), sql`, `)})`);
    slotMap = new Map(allSlots.map((s) => [s.id, { slotNumber: s.slotNumber, label: s.label }]));
  }
  const portMap = new Map(allPorts.map((p) => [p.id, p]));
  const elementMap = new Map(allElements.map((e) => [e.id, e]));
  const ceoMap = new Map(allCeos.map((c) => [c.id, c]));
  const tubeMap = new Map(allCeoTubes.map((t2) => [t2.id, t2]));
  return links.map((link) => {
    const port = portMap.get(link.portId);
    const el = elementMap.get(link.ceoElementId);
    const ceo = el ? ceoMap.get(el.referenceId) : null;
    const tube = tubeMap.get(link.tubeId);
    const slot = port?.slotId ? slotMap.get(port.slotId) : null;
    const portBase = port ? `Porta ${port.portNumber}${port.label ? ` \u2014 ${port.label}` : ""}` : `Porta #${link.portId}`;
    const slotDisplay = slot?.slotNumber ?? null;
    return {
      ...link,
      portLabel: port?.label ?? null,
      portNumber: port?.portNumber ?? String(link.portId),
      portName: slotDisplay ? `${slotDisplay} / ${portBase}` : portBase,
      slotNumber: slot?.slotNumber ?? null,
      slotLabel: slot?.label ?? null,
      ceoName: ceo?.name ?? `CEO #${link.ceoElementId}`,
      tubeIdentifier: tube?.identifier ?? `Tubo #${link.tubeId}`
    };
  });
}
async function createOltPortLink(data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const result = await db.insert(oltPortFiberLinks).values(data);
  return result[0].insertId;
}
async function updateOltPortLink(id, data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(oltPortFiberLinks).set(data).where(eq(oltPortFiberLinks.id, id));
}
async function deleteOltPortLink(id) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.delete(oltPortFiberLinks).where(eq(oltPortFiberLinks.id, id));
}
async function getDgoPortFiberLinks(dgoElementId) {
  const db = await getDb();
  if (!db) return [];
  const links = await db.select().from(dgoPortFiberLinks).where(eq(dgoPortFiberLinks.dgoElementId, dgoElementId));
  if (links.length === 0) return [];
  const portIds = Array.from(new Set(links.map((l) => l.portId)));
  const allPorts = await db.select({
    id: ports.id,
    label: ports.label,
    portNumber: ports.portNumber,
    slotId: ports.slotId
  }).from(ports).where(sql`${ports.id} IN (${sql.join(portIds.map((id) => sql`${id}`), sql`, `)})`);
  const allElements = await db.select({ id: mapElements.id, type: mapElements.type, referenceId: mapElements.referenceId }).from(mapElements);
  const allCeos = await db.select({ id: ceos.id, name: ceos.name }).from(ceos);
  const allCeoTubes = await db.select({ id: ceoTubes.id, identifier: ceoTubes.identifier }).from(ceoTubes);
  const slotIds = Array.from(new Set(allPorts.map((p) => p.slotId).filter(Boolean)));
  let slotMap = /* @__PURE__ */ new Map();
  if (slotIds.length > 0) {
    const allSlots = await db.select({ id: equipmentSlots.id, slotNumber: equipmentSlots.slotNumber, label: equipmentSlots.label }).from(equipmentSlots).where(sql`${equipmentSlots.id} IN (${sql.join(slotIds.map((id) => sql`${id}`), sql`, `)})`);
    slotMap = new Map(allSlots.map((s) => [s.id, { slotNumber: s.slotNumber, label: s.label }]));
  }
  const portMap = new Map(allPorts.map((p) => [p.id, p]));
  const elementMap = new Map(allElements.map((e) => [e.id, e]));
  const ceoMap = new Map(allCeos.map((c) => [c.id, c]));
  const tubeMap = new Map(allCeoTubes.map((t2) => [t2.id, t2]));
  return links.map((link) => {
    const port = portMap.get(link.portId);
    const el = elementMap.get(link.ceoElementId);
    const ceo = el ? ceoMap.get(el.referenceId) : null;
    const tube = tubeMap.get(link.tubeId);
    const slot = port?.slotId ? slotMap.get(port.slotId) : null;
    const portBase = port ? `Porta ${port.portNumber}${port.label ? ` \u2014 ${port.label}` : ""}` : `Porta #${link.portId}`;
    const slotDisplay = slot?.slotNumber ?? null;
    return {
      ...link,
      portLabel: port?.label ?? null,
      portNumber: port?.portNumber ?? String(link.portId),
      portName: slotDisplay ? `${slotDisplay} / ${portBase}` : portBase,
      slotNumber: slot?.slotNumber ?? null,
      slotLabel: slot?.label ?? null,
      ceoName: ceo?.name ?? `CEO #${link.ceoElementId}`,
      tubeIdentifier: tube?.identifier ?? `Tubo #${link.tubeId}`
    };
  });
}
async function createDgoPortFiberLink(data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const result = await db.insert(dgoPortFiberLinks).values(data);
  return result[0].insertId;
}
async function updateDgoPortFiberLink(id, data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(dgoPortFiberLinks).set(data).where(eq(dgoPortFiberLinks.id, id));
}
async function deleteDgoPortFiberLink(id) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.delete(dgoPortFiberLinks).where(eq(dgoPortFiberLinks.id, id));
}
function detectUnbalancedRatio(identifier) {
  const m = identifier.match(/(\d+)\/(\d+)/);
  if (!m) return null;
  const a = parseInt(m[1]);
  const b = parseInt(m[2]);
  if (a > 1 && b > 1 && Math.abs(a + b - 100) <= 5) {
    return [Math.max(a, b), Math.min(a, b)];
  }
  return null;
}
function getUnbalancedSplitterLoss(ratio, exitViaNumber, allSplitterViaNumbers) {
  const percentages = detectUnbalancedRatio(ratio);
  if (!percentages) return null;
  const [pctMajor, pctMinor] = percentages;
  const outputVias = allSplitterViaNumbers.filter((n) => n > 0);
  if (outputVias.length === 0) return null;
  const maxVia = Math.max(...outputVias);
  const pct = exitViaNumber === maxVia ? pctMajor : pctMinor;
  return parseFloat((-10 * Math.log10(pct / 100)).toFixed(2));
}
function getSplitterLoss(ratio) {
  const normalized = ratio.replace("/", ":").trim();
  if (SPLITTER_LOSS_DB[normalized] !== void 0) return SPLITTER_LOSS_DB[normalized];
  const ratioMatch = normalized.match(/\b(1[:/]\d+)\b/);
  if (ratioMatch) {
    const extracted = ratioMatch[1].replace("/", ":");
    if (SPLITTER_LOSS_DB[extracted] !== void 0) return SPLITTER_LOSS_DB[extracted];
  }
  const denomMatch = normalized.match(/1[:/](\d+)/);
  if (denomMatch) {
    const n = parseInt(denomMatch[1]);
    const tableKey = `1:${n}`;
    if (SPLITTER_LOSS_DB[tableKey] !== void 0) return SPLITTER_LOSS_DB[tableKey];
    return Math.round(10 * Math.log10(n) * 10) / 10;
  }
  return 3.5;
}
function getSignalQuality(rxDbm) {
  if (rxDbm >= -15) return "optimal";
  if (rxDbm >= -20) return "good";
  if (rxDbm >= -25) return "marginal";
  if (rxDbm >= -30) return "weak";
  return "no_signal";
}
async function calculateOpticalBalance(ctoElementId, options) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const warnings = [];
  const allElements = await db.select().from(mapElements);
  const allRoutes = await db.select().from(mapRoutes);
  const allCeoTubes = await db.select().from(ceoTubes);
  const allCtoTubes = await db.select().from(ctoTubes);
  const allCeoVias = await db.select().from(ceoVias);
  const allCtoVias = await db.select().from(ctoVias);
  const allCeos = await db.select({ id: ceos.id, name: ceos.name }).from(ceos);
  const allCtos = await db.select({ id: ctos.id, name: ctos.name }).from(ctos);
  const allSplitters = await db.select().from(ceoSplitters);
  const allSplitterVias = await db.select().from(ceoSplitterVias);
  const allViaAssocs = await db.select().from(ceoViaAssociations);
  const allCtoViaAssocs = await db.select().from(ctoViaAssociations);
  const allOltElements = await db.select().from(mapOltElements);
  const allOltLinks = await db.select().from(oltPortFiberLinks);
  const allDgoElements = await db.select().from(mapDgoElements).catch(() => []);
  const allDgoLinks = await db.select().from(dgoPortFiberLinks).catch(() => []);
  const allDgoSlotLinks = await db.select().from(dgoSlotCableLinks).catch(() => []);
  const allEquipments = await db.select({ id: equipments.id, name: equipments.name, txPowerDbm: equipments.txPowerDbm }).from(equipments).catch(() => []);
  const allPorts = await db.select({ id: ports.id, label: ports.label, portNumber: ports.portNumber, slotId: ports.slotId, equipmentId: ports.equipmentId, connectedToEquipmentId: ports.connectedToEquipmentId, txPowerDbm: ports.txPowerDbm }).from(ports).catch(() => []);
  const allTechReservesOB = await db.select().from(mapTechnicalReserves);
  const reserveByRouteOB = /* @__PURE__ */ new Map();
  for (const r of allTechReservesOB) {
    if (r.routeId != null) {
      reserveByRouteOB.set(r.routeId, (reserveByRouteOB.get(r.routeId) ?? 0) + r.sizeMeters);
    }
  }
  const elementById = new Map(allElements.map((e) => [e.id, e]));
  const ceoById = new Map(allCeos.map((c) => [c.id, c]));
  const ctoById = new Map(allCtos.map((c) => [c.id, c]));
  const ceoTubeById = new Map(allCeoTubes.map((t2) => [t2.id, t2]));
  const ctoTubeById = new Map(allCtoTubes.map((t2) => [t2.id, t2]));
  const ceoViaById = new Map(allCeoVias.map((v) => [v.id, v]));
  const ctoViaById = new Map(allCtoVias.map((v) => [v.id, v]));
  const splitterViaById = new Map(allSplitterVias.map((v) => [v.id, v]));
  const splitterById = new Map(allSplitters.map((s) => [s.id, s]));
  const portById = new Map(allPorts.map((p) => [p.id, p]));
  function getElementName(el) {
    if (el.type === "ceo") return ceoById.get(el.referenceId)?.name ?? `CEO #${el.referenceId}`;
    return ctoById.get(el.referenceId)?.name ?? `CTO #${el.referenceId}`;
  }
  const ctoElement = elementById.get(ctoElementId);
  if (!ctoElement) {
    return { found: false, rxPowerDbm: null, txPowerDbm: 0, totalLossDb: 0, distanceKm: 0, cableLossDb: 0, splitterLossDb: 0, fusionLossDb: 0, signalQuality: "no_signal", path: [], warnings: [`Elemento #${ctoElementId} n\xE3o encontrado`] };
  }
  if (ctoElement.type !== "cto") {
    return { found: false, rxPowerDbm: null, txPowerDbm: 0, totalLossDb: 0, distanceKm: 0, cableLossDb: 0, splitterLossDb: 0, fusionLossDb: 0, signalQuality: "no_signal", path: [], warnings: [`Elemento #${ctoElementId} n\xE3o \xE9 uma CTO`] };
  }
  const ctoName = getElementName(ctoElement);
  const incomingRoutes = allRoutes.filter((r) => r.toElementId === ctoElementId || r.fromElementId === ctoElementId);
  if (incomingRoutes.length === 0) {
    return { found: false, rxPowerDbm: null, txPowerDbm: 0, totalLossDb: 0, distanceKm: 0, cableLossDb: 0, splitterLossDb: 0, fusionLossDb: 0, signalQuality: "no_signal", path: [], warnings: [`CTO "${ctoName}" n\xE3o tem cabos conectados`] };
  }
  let entryRoute = null;
  let entryTubeId = null;
  for (const route of incomingRoutes) {
    if (route.toElementId === ctoElementId && route.toTubeId) {
      entryRoute = route;
      entryTubeId = route.toTubeId;
      break;
    }
    if (route.fromElementId === ctoElementId && route.fromTubeId) {
      entryRoute = route;
      entryTubeId = route.fromTubeId;
      break;
    }
  }
  if (!entryRoute || !entryTubeId) {
    entryRoute = incomingRoutes[0];
    warnings.push(`Cabo "${entryRoute.name ?? `#${entryRoute.id}`}" n\xE3o tem tubo vinculado na CTO \u2014 estimativa pode ser imprecisa`);
  }
  function haversineKm(p1, p2) {
    const R = 6371;
    const phi1 = p1.lat * Math.PI / 180;
    const phi2 = p2.lat * Math.PI / 180;
    const dphi = (p2.lat - p1.lat) * Math.PI / 180;
    const dlambda = (p2.lng - p1.lng) * Math.PI / 180;
    const a = Math.sin(dphi / 2) ** 2 + Math.cos(phi1) * Math.cos(phi2) * Math.sin(dlambda / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }
  function calcRouteDistanceKm(route) {
    let pts = [];
    try {
      pts = route.path ? JSON.parse(route.path) : [];
    } catch {
    }
    if (pts.length < 2) {
      const fromEl = elementById.get(route.fromElementId ?? 0);
      const toEl = elementById.get(route.toElementId ?? 0);
      if (fromEl && toEl) pts = [{ lat: fromEl.lat, lng: fromEl.lng }, { lat: toEl.lat, lng: toEl.lng }];
    }
    let total = 0;
    for (let i = 1; i < pts.length; i++) total += haversineKm(pts[i - 1], pts[i]);
    return total;
  }
  let totalDistanceKm = 0;
  let totalSplitterLoss = 0;
  let totalFusionCount = 0;
  let foundOlt = null;
  let foundDgo = null;
  const reversePath = [];
  reversePath.push({ type: "cto", label: ctoName, lossDb: 0 });
  let currentElementId = ctoElementId;
  let currentTubeId = entryTubeId;
  let currentViaNumber = null;
  if (entryTubeId !== null) {
    const ctoRefId = ctoElement.referenceId;
    const entryTubeObj = ctoTubeById.get(entryTubeId);
    if (entryTubeObj?.type === "splitter") {
      const splitterRatio = entryTubeObj.identifier ?? "1:8";
      const splitterVias = allCtoVias.filter((v) => v.tubeId === entryTubeId);
      const splitterViaNumbers = splitterVias.map((v) => v.viaNumber);
      const exitViaNumber = splitterViaNumbers.length > 0 ? Math.max(...splitterViaNumbers) : 0;
      const unbalancedLoss = getUnbalancedSplitterLoss(splitterRatio, exitViaNumber, splitterViaNumbers);
      const loss = unbalancedLoss !== null ? unbalancedLoss : getSplitterLoss(splitterRatio);
      totalSplitterLoss += loss;
      reversePath.push({ type: "splitter", label: `${entryTubeObj.identifier} (splitter interno)`, lossDb: loss });
      const entViaWithFusion = splitterVias.find((v) => v.fusedToTubeId !== null && v.fusedToTubeId !== void 0);
      if (entViaWithFusion?.fusedToTubeId) {
        totalFusionCount++;
        currentTubeId = entViaWithFusion.fusedToTubeId;
        currentViaNumber = entViaWithFusion.fusedToViaId ? ctoViaById.get(entViaWithFusion.fusedToViaId)?.viaNumber ?? null : null;
      } else {
        const assocForSplitter = allCtoViaAssocs.find(
          (a) => a.ctoId === ctoRefId && (a.sourceType === "splitter" && splitterVias.some((v) => v.id === a.sourceViaId) || a.targetType === "splitter" && splitterVias.some((v) => v.id === a.targetViaId))
        );
        if (assocForSplitter) {
          const tubeSideViaId = assocForSplitter.sourceType === "splitter" ? assocForSplitter.targetViaId : assocForSplitter.sourceViaId;
          const tubeSideVia = ctoViaById.get(tubeSideViaId);
          if (tubeSideVia) {
            totalFusionCount++;
            currentTubeId = tubeSideVia.tubeId;
            currentViaNumber = tubeSideVia.viaNumber;
          }
        }
      }
    } else {
      const ctoRefId2 = ctoElement.referenceId;
      const tubeVias = allCtoVias.filter((v) => v.tubeId === entryTubeId);
      const viaWithSplitterFusion = tubeVias.find(
        (v) => v.fusedToTubeId !== null && v.fusedToTubeId !== void 0 && ctoTubeById.get(v.fusedToTubeId)?.type === "splitter"
      );
      if (viaWithSplitterFusion?.fusedToTubeId) {
        const splitterTube = ctoTubeById.get(viaWithSplitterFusion.fusedToTubeId);
        if (splitterTube) {
          const splitterVias2 = allCtoVias.filter((v) => v.tubeId === viaWithSplitterFusion.fusedToTubeId);
          const splitterViaNumbers2 = splitterVias2.map((v) => v.viaNumber);
          const exitViaForFusion = viaWithSplitterFusion.fusedToViaId ? ctoViaById.get(viaWithSplitterFusion.fusedToViaId)?.viaNumber ?? Math.max(...splitterViaNumbers2) : Math.max(...splitterViaNumbers2);
          const unbalancedLoss2 = getUnbalancedSplitterLoss(splitterTube.identifier ?? "1:8", exitViaForFusion, splitterViaNumbers2);
          const loss = unbalancedLoss2 !== null ? unbalancedLoss2 : getSplitterLoss(splitterTube.identifier ?? "1:8");
          totalSplitterLoss += loss;
          totalFusionCount++;
          reversePath.push({ type: "splitter", label: `${splitterTube.identifier} (splitter interno)`, lossDb: loss });
          currentViaNumber = viaWithSplitterFusion.viaNumber;
        }
      } else {
        const assocForTube = allCtoViaAssocs.find(
          (a) => a.ctoId === ctoRefId2 && (a.sourceType === "tube" && tubeVias.some((v) => v.id === a.sourceViaId) && a.targetType === "splitter" || a.targetType === "tube" && tubeVias.some((v) => v.id === a.targetViaId) && a.sourceType === "splitter")
        );
        if (assocForTube) {
          const splitterSideViaId = assocForTube.sourceType === "splitter" ? assocForTube.sourceViaId : assocForTube.targetViaId;
          const splitterSideVia = ctoViaById.get(splitterSideViaId);
          if (splitterSideVia) {
            const splitterTube = ctoTubeById.get(splitterSideVia.tubeId);
            if (splitterTube?.type === "splitter") {
              const splitterVias3 = allCtoVias.filter((v) => v.tubeId === splitterSideVia.tubeId);
              const splitterViaNumbers3 = splitterVias3.map((v) => v.viaNumber);
              const unbalancedLoss3 = getUnbalancedSplitterLoss(splitterTube.identifier ?? "1:8", splitterSideVia.viaNumber, splitterViaNumbers3);
              const loss = unbalancedLoss3 !== null ? unbalancedLoss3 : getSplitterLoss(splitterTube.identifier ?? "1:8");
              totalSplitterLoss += loss;
              totalFusionCount++;
              reversePath.push({ type: "splitter", label: `${splitterTube.identifier} (splitter interno)`, lossDb: loss });
            }
          }
        }
      }
    }
  }
  const visited = /* @__PURE__ */ new Set();
  const visitedRouteIds = /* @__PURE__ */ new Set();
  for (let iter = 0; iter < 50; iter++) {
    const loopKey = `${currentElementId}:${currentTubeId ?? "null"}:${currentViaNumber ?? "null"}`;
    if (visited.has(loopKey)) {
      warnings.push("Loop detectado na cadeia de fibra");
      break;
    }
    visited.add(loopKey);
    if (currentTubeId !== null) {
      const dgoLinkAtStart = allDgoLinks.find(
        (l) => l.ceoElementId === currentElementId && l.tubeId === currentTubeId && (currentViaNumber === null || l.viaNumber === currentViaNumber)
      ) ?? allDgoLinks.find(
        (l) => l.ceoElementId === currentElementId && l.tubeId === currentTubeId
      );
      if (dgoLinkAtStart) {
        const dgoEl = allDgoElements.find((d) => d.id === dgoLinkAtStart.dgoElementId);
        if (dgoEl) {
          foundDgo = { element: dgoEl, link: dgoLinkAtStart };
          const portInfo = portById.get(dgoLinkAtStart.portId);
          const portLabel = portInfo?.label ?? portInfo?.portNumber ?? `Porta #${dgoLinkAtStart.portId}`;
          const ceoEl = elementById.get(currentElementId);
          if (ceoEl) reversePath.push({ type: "ceo", label: getElementName(ceoEl), lossDb: 0 });
          reversePath.push({ type: "olt", label: `DGO \u2014 ${portLabel}`, lossDb: 0 });
          break;
        }
      }
    }
    let activeRoute = null;
    let isForwardOnRoute = false;
    if (currentTubeId) {
      activeRoute = allRoutes.find((r) => r.toElementId === currentElementId && r.toTubeId === currentTubeId && !visitedRouteIds.has(r.id)) ?? null;
      if (activeRoute) {
        isForwardOnRoute = true;
      }
      if (!activeRoute) {
        activeRoute = allRoutes.find((r) => r.fromElementId === currentElementId && r.fromTubeId === currentTubeId && !visitedRouteIds.has(r.id)) ?? null;
        if (activeRoute) {
          isForwardOnRoute = false;
        }
      }
    }
    if (!activeRoute) {
      const candidateRoutes = allRoutes.filter(
        (r) => (r.toElementId === currentElementId || r.fromElementId === currentElementId) && !visitedRouteIds.has(r.id)
      );
      const routeViaCeo = candidateRoutes.find((r) => {
        const otherId = r.toElementId === currentElementId ? r.fromElementId : r.toElementId;
        const otherEl = otherId ? elementById.get(otherId) : null;
        return otherEl?.type === "ceo";
      });
      activeRoute = routeViaCeo ?? candidateRoutes[0] ?? null;
      if (activeRoute) {
        isForwardOnRoute = activeRoute.toElementId === currentElementId;
        warnings.push(`Cabo "${activeRoute.name ?? `#${activeRoute.id}`}" sem tubo vinculado \u2014 estimativa pode ser imprecisa`);
      }
    }
    if (!activeRoute) {
      warnings.push(`Nenhum cabo encontrado chegando ao elemento "${getElementName(elementById.get(currentElementId))}" \u2014 cadeia interrompida`);
      break;
    }
    visitedRouteIds.add(activeRoute.id);
    const segDistKmBase = calcRouteDistanceKm(activeRoute);
    const reserveMetersOB = reserveByRouteOB.get(activeRoute.id) ?? 0;
    const segDistKm = segDistKmBase + reserveMetersOB / 1e3;
    totalDistanceKm += segDistKm;
    const cableLabel = reserveMetersOB > 0 ? `${activeRoute.name ?? `Cabo #${activeRoute.id}`} (+${reserveMetersOB}m reserva)` : activeRoute.name ?? `Cabo #${activeRoute.id}`;
    reversePath.push({ type: "cable", label: cableLabel, lossDb: 0, distKm: segDistKm });
    const prevElementId = isForwardOnRoute ? activeRoute.fromElementId ?? null : activeRoute.toElementId ?? null;
    if (!prevElementId) {
      const dgoSlotLinksForRoute = allDgoSlotLinks.filter((sl) => sl.routeId === activeRoute.id);
      if (dgoSlotLinksForRoute.length > 0) {
        let matchedSlotLink = null;
        if (currentTubeId !== null) {
          matchedSlotLink = dgoSlotLinksForRoute.find((sl) => sl.tubeId === currentTubeId);
        }
        if (!matchedSlotLink && dgoSlotLinksForRoute.length === 1) {
          matchedSlotLink = dgoSlotLinksForRoute[0];
        }
        if (!matchedSlotLink && currentTubeId !== null) {
          const ceoTubesForRoute = allCeoTubes.filter((t2) => {
            const ceoEl = isForwardOnRoute ? activeRoute.toElementId ? elementById.get(activeRoute.toElementId) : null : activeRoute.fromElementId ? elementById.get(activeRoute.fromElementId) : null;
            return ceoEl && t2.ceoId === ceoEl.referenceId;
          }).sort((a, b) => a.id - b.id);
          const tubeIndex = ceoTubesForRoute.findIndex((t2) => t2.id === currentTubeId);
          const sortedSlotLinks = [...dgoSlotLinksForRoute].sort((a, b) => a.slotId - b.slotId);
          if (tubeIndex >= 0 && tubeIndex < sortedSlotLinks.length) {
            matchedSlotLink = sortedSlotLinks[tubeIndex];
          } else {
            matchedSlotLink = sortedSlotLinks[0];
          }
        }
        if (matchedSlotLink) {
          const dgoEl = allDgoElements.find((d) => d.id === matchedSlotLink.dgoElementId);
          if (dgoEl) {
            const dgoEquipment = allEquipments.find((e) => e.id === dgoEl.equipmentId);
            const dgoEquipName = dgoEquipment?.name ?? `DGO #${dgoEl.id}`;
            const portNumber = currentViaNumber ?? 1;
            const dgoPort = allPorts.find(
              (p) => p.equipmentId === dgoEl.equipmentId && p.slotId === matchedSlotLink.slotId && String(p.portNumber) === String(portNumber)
            );
            const manualDgoLink = dgoPort ? allDgoLinks.find((l) => l.dgoElementId === dgoEl.id && l.portId === dgoPort.id) : null;
            if (manualDgoLink) {
              foundDgo = { element: dgoEl, link: manualDgoLink };
              const portLabel2 = dgoPort?.label ?? `Porta ${portNumber}`;
              reversePath.push({ type: "olt", label: `${dgoEquipName} \u2014 ${portLabel2}`, lossDb: 0 });
              break;
            }
            if (dgoPort) {
              const connectedEquip = dgoPort.connectedToEquipmentId ? allEquipments.find((e) => e.id === dgoPort.connectedToEquipmentId) : null;
              const effectiveTxPower2 = dgoPort.txPowerDbm ?? connectedEquip?.txPowerDbm ?? dgoEquipment?.txPowerDbm ?? null;
              const portLabel2 = dgoPort.label ?? `Porta ${portNumber}`;
              foundDgo = {
                element: dgoEl,
                link: {
                  id: -1,
                  dgoElementId: dgoEl.id,
                  portId: dgoPort.id,
                  txPowerDbm: effectiveTxPower2,
                  ceoElementId: -1,
                  tubeId: currentTubeId ?? -1,
                  viaNumber: portNumber,
                  notes: null,
                  createdAt: /* @__PURE__ */ new Date(),
                  updatedAt: /* @__PURE__ */ new Date()
                }
              };
              reversePath.push({ type: "olt", label: `${dgoEquipName} \u2014 ${portLabel2}`, lossDb: 0 });
              break;
            }
            const effectiveTxPower = dgoEquipment?.txPowerDbm ?? null;
            const portLabel = `Porta ${portNumber} (auto)`;
            foundDgo = {
              element: dgoEl,
              link: {
                id: -1,
                dgoElementId: dgoEl.id,
                portId: -1,
                txPowerDbm: effectiveTxPower,
                ceoElementId: -1,
                tubeId: currentTubeId ?? -1,
                viaNumber: portNumber,
                notes: null,
                createdAt: /* @__PURE__ */ new Date(),
                updatedAt: /* @__PURE__ */ new Date()
              }
            };
            reversePath.push({ type: "olt", label: `${dgoEquipName} \u2014 ${portLabel}`, lossDb: 0 });
            warnings.push(`Porta ${portNumber} da bandeja do DGO "${dgoEquipName}" n\xE3o encontrada no cadastro \u2014 usando pot\xEAncia do equipamento`);
            break;
          }
        }
      }
      warnings.push(`Cabo "${activeRoute.name ?? `#${activeRoute.id}`}" n\xE3o tem elemento de origem vinculado`);
      break;
    }
    const prevElement = elementById.get(prevElementId);
    if (!prevElement) {
      warnings.push(`Elemento #${prevElementId} n\xE3o encontrado`);
      break;
    }
    const prevElementName = getElementName(prevElement);
    const arrivalTubeId = isForwardOnRoute ? activeRoute.fromTubeId ?? null : activeRoute.toTubeId ?? null;
    const oltLink = allOltLinks.find(
      (l) => l.ceoElementId === prevElementId && (arrivalTubeId === null || l.tubeId === arrivalTubeId) && (currentViaNumber === null || l.viaNumber === currentViaNumber)
    ) ?? allOltLinks.find(
      (l) => l.ceoElementId === prevElementId && (arrivalTubeId === null || l.tubeId === arrivalTubeId)
    );
    if (oltLink) {
      const oltEl = allOltElements.find((o) => o.id === oltLink.oltElementId);
      if (oltEl) {
        foundOlt = { element: oltEl, link: oltLink };
        const portInfo = portById.get(oltLink.portId);
        const portLabel = portInfo?.label ?? portInfo?.portNumber ?? `Porta #${oltLink.portId}`;
        reversePath.push({ type: "ceo", label: prevElementName, lossDb: 0 });
        reversePath.push({ type: "olt", label: portLabel, lossDb: 0 });
        break;
      }
    }
    reversePath.push({ type: prevElement.type === "ceo" ? "ceo" : "cto", label: prevElementName, lossDb: 0 });
    if (prevElement.type === "ceo" && arrivalTubeId !== null) {
      const ceoRefId = prevElement.referenceId;
      let arrivalVia = null;
      if (currentViaNumber !== null) {
        arrivalVia = allCeoVias.find((v) => v.tubeId === arrivalTubeId && v.viaNumber === currentViaNumber) ?? null;
      }
      if (!arrivalVia) {
        arrivalVia = allCeoVias.find((v) => v.tubeId === arrivalTubeId && v.fusedToTubeId != null) ?? null;
      }
      if (!arrivalVia) {
        arrivalVia = allCeoVias.find((v) => v.tubeId === arrivalTubeId && v.fusedToSplitterId != null) ?? null;
      }
      if (!arrivalVia) {
        const tubeViaIds = new Set(allCeoVias.filter((v) => v.tubeId === arrivalTubeId).map((v) => v.id));
        const assocVia = allViaAssocs.find(
          (a) => a.ceoId === ceoRefId && (a.sourceType === "tube" && tubeViaIds.has(a.sourceViaId) || a.targetType === "tube" && tubeViaIds.has(a.targetViaId))
        );
        if (assocVia) {
          const assocViaId = assocVia.sourceType === "tube" ? assocVia.sourceViaId : assocVia.targetViaId;
          arrivalVia = ceoViaById.get(assocViaId) ?? null;
        }
      }
      if (!arrivalVia) {
        arrivalVia = allCeoVias.find((v) => v.tubeId === arrivalTubeId) ?? null;
      }
      if (arrivalVia?.fusedToTubeId) {
        totalFusionCount++;
        currentTubeId = arrivalVia.fusedToTubeId;
        if (arrivalVia.fusedToViaId) {
          const exitVia = ceoViaById.get(arrivalVia.fusedToViaId);
          currentViaNumber = exitVia?.viaNumber ?? null;
        } else {
          currentViaNumber = null;
        }
        currentElementId = prevElementId;
        continue;
      }
      if (arrivalVia && arrivalVia.fusedToSplitterId != null) {
        const splitterIdForFusion = arrivalVia.fusedToSplitterId;
        const splitter = splitterById.get(splitterIdForFusion);
        if (splitter) {
          const splitterViaIdForFusion = arrivalVia.fusedToSplitterViaId;
          const splitterViaForFusion = splitterViaIdForFusion ? allSplitterVias.find((v) => v.id === splitterViaIdForFusion) : null;
          const loss = splitterViaForFusion?.lossDb ?? getSplitterLoss(splitter.ratio);
          totalSplitterLoss += loss;
          reversePath.push({ type: "splitter", label: `${splitter.identifier} (${splitter.ratio})`, lossDb: loss });
          totalFusionCount++;
          const splitterEntryVia = allSplitterVias.find((v) => v.splitterId === splitter.id && v.viaNumber === 0);
          if (splitterEntryVia) {
            const exitCeoVia = allCeoVias.find(
              (v) => v.ceoId === ceoRefId && v.fusedToSplitterId === splitter.id && v.fusedToSplitterViaId === splitterEntryVia.id
            );
            if (exitCeoVia) {
              currentTubeId = exitCeoVia.tubeId;
              currentViaNumber = exitCeoVia.viaNumber;
              currentElementId = prevElementId;
              continue;
            }
            const assocEntToTube = allViaAssocs.find(
              (a) => a.ceoId === ceoRefId && (a.sourceType === "splitter" && a.sourceViaId === splitterEntryVia.id && a.targetType === "tube" || a.targetType === "splitter" && a.targetViaId === splitterEntryVia.id && a.sourceType === "tube")
            );
            if (assocEntToTube) {
              const exitTubeViaId = assocEntToTube.sourceType === "splitter" ? assocEntToTube.targetViaId : assocEntToTube.sourceViaId;
              const exitTubeVia = ceoViaById.get(exitTubeViaId);
              if (exitTubeVia) {
                currentTubeId = exitTubeVia.tubeId;
                currentViaNumber = exitTubeVia.viaNumber;
                currentElementId = prevElementId;
                continue;
              }
            }
          }
          const anyExitCeoVia = allCeoVias.find(
            (v) => v.ceoId === ceoRefId && v.fusedToSplitterId === splitter.id
          );
          if (anyExitCeoVia) {
            currentTubeId = anyExitCeoVia.tubeId;
            currentViaNumber = anyExitCeoVia.viaNumber;
            currentElementId = prevElementId;
            continue;
          }
          warnings.push(`Splitter "${splitter.identifier}" em "${prevElementName}": via de entrada n\xE3o tem tubo de sa\xEDda configurado`);
          break;
        }
      }
      if (arrivalVia) {
        const assocToSplitter = allViaAssocs.find(
          (a) => a.ceoId === ceoRefId && a.sourceType === "tube" && a.sourceViaId === arrivalVia.id && a.targetType === "splitter"
        ) ?? allViaAssocs.find(
          (a) => a.ceoId === ceoRefId && a.targetType === "tube" && a.targetViaId === arrivalVia.id && a.sourceType === "splitter"
        );
        if (assocToSplitter) {
          const splitterViaId = assocToSplitter.sourceType === "tube" ? assocToSplitter.targetViaId : assocToSplitter.sourceViaId;
          const splitterVia = splitterViaById.get(splitterViaId);
          if (splitterVia) {
            const splitter = splitterById.get(splitterVia.splitterId);
            if (splitter) {
              const loss = splitterVia.lossDb ?? getSplitterLoss(splitter.ratio);
              totalSplitterLoss += loss;
              reversePath.push({ type: "splitter", label: `${splitter.identifier} (${splitter.ratio})`, lossDb: loss });
              totalFusionCount++;
              const splitterEntryVia = allSplitterVias.find(
                (v) => v.splitterId === splitter.id && v.viaNumber === 0
              );
              if (splitterEntryVia) {
                const assocFromSplitter = allViaAssocs.find(
                  (a) => a.ceoId === ceoRefId && a.sourceType === "splitter" && a.sourceViaId === splitterEntryVia.id && a.targetType === "tube"
                ) ?? allViaAssocs.find(
                  (a) => a.ceoId === ceoRefId && a.targetType === "splitter" && a.targetViaId === splitterEntryVia.id && a.sourceType === "tube"
                );
                if (assocFromSplitter) {
                  const exitTubeViaId = assocFromSplitter.sourceType === "splitter" ? assocFromSplitter.targetViaId : assocFromSplitter.sourceViaId;
                  const exitTubeVia = ceoViaById.get(exitTubeViaId);
                  if (exitTubeVia) {
                    currentTubeId = exitTubeVia.tubeId;
                    currentViaNumber = exitTubeVia.viaNumber;
                    currentElementId = prevElementId;
                    continue;
                  }
                }
                warnings.push(`Splitter "${splitter.identifier}": via de entrada n\xE3o tem tubo associado`);
              }
            }
          }
        }
      }
      const arrivalTubeObj = ceoTubeById.get(arrivalTubeId);
      if (arrivalTubeObj?.type === "splitter") {
        const splitterForTube = allSplitters.find((s) => s.ceoId === ceoRefId);
        if (splitterForTube) {
          const loss = getSplitterLoss(splitterForTube.ratio);
          totalSplitterLoss += loss;
          reversePath.push({ type: "splitter", label: `${splitterForTube.identifier} (${splitterForTube.ratio})`, lossDb: loss });
        }
      }
      const elName = getElementName(prevElement);
      const tubeObj = ceoTubeById.get(arrivalTubeId);
      const viaStr = currentViaNumber ? ` via ${currentViaNumber}` : "";
      warnings.push(`A fibra chega ao elemento "${elName}" pelo tubo "${tubeObj?.identifier ?? `#${arrivalTubeId}`}"${viaStr} mas n\xE3o tem fus\xE3o de sa\xEDda registada \u2014 a fibra termina aqui`);
      break;
    } else if (prevElement.type === "cto" && arrivalTubeId !== null) {
      const arrivalVia = allCtoVias.find(
        (v) => v.tubeId === arrivalTubeId && (currentViaNumber === null || v.viaNumber === currentViaNumber)
      ) ?? null;
      if (arrivalVia?.fusedToTubeId) {
        totalFusionCount++;
        currentTubeId = arrivalVia.fusedToTubeId;
        if (arrivalVia.fusedToViaId) {
          const exitVia = ctoViaById.get(arrivalVia.fusedToViaId);
          currentViaNumber = exitVia?.viaNumber ?? currentViaNumber;
        }
      } else {
        currentTubeId = arrivalTubeId;
        currentViaNumber = arrivalVia?.viaNumber ?? currentViaNumber;
      }
    } else {
      currentTubeId = arrivalTubeId;
    }
    currentElementId = prevElementId;
  }
  if (!foundOlt && !foundDgo && options?.overrideTxPowerDbm == null) {
    warnings.push("N\xE3o foi poss\xEDvel rastrear a fibra at\xE9 uma porta OLT ou DGO \u2014 verifique se o equipamento est\xE1 posicionado no mapa e se as portas est\xE3o vinculadas aos tubos dos CEOs");
    return { found: false, rxPowerDbm: null, txPowerDbm: 0, totalLossDb: 0, distanceKm: totalDistanceKm, cableLossDb: 0, splitterLossDb: totalSplitterLoss, fusionLossDb: 0, signalQuality: "no_signal", path: [], warnings };
  }
  let txPower;
  let attenuationPerKm;
  let fusionLossPerFusion;
  if (options?.overrideTxPowerDbm != null) {
    txPower = options.overrideTxPowerDbm;
    attenuationPerKm = 0.35;
    fusionLossPerFusion = 0.1;
    if (options.overrideEquipmentName) {
      reversePath.push({ type: "olt", label: options.overrideEquipmentName, lossDb: 0 });
    }
  } else if (foundDgo) {
    let resolvedTxPower = foundDgo.link.txPowerDbm ?? null;
    if (resolvedTxPower === null && foundDgo.link.id > 0) {
      const dgoPort = allPorts.find((p) => p.id === foundDgo.link.portId);
      const dgoEquipment = dgoPort?.connectedToEquipmentId ? allEquipments.find((e) => e.id === dgoPort.connectedToEquipmentId) : null;
      resolvedTxPower = dgoPort?.txPowerDbm ?? dgoEquipment?.txPowerDbm ?? null;
    }
    if (resolvedTxPower === null) {
      const dgoEquip = allEquipments.find((e) => e.id === foundDgo.element.equipmentId);
      resolvedTxPower = dgoEquip?.txPowerDbm ?? 5;
    }
    txPower = resolvedTxPower;
    attenuationPerKm = 0.35;
    fusionLossPerFusion = 0.1;
  } else {
    txPower = foundOlt?.link.txPowerDbm ?? foundOlt?.element.defaultTxPowerDbm ?? 5;
    attenuationPerKm = foundOlt?.element.fiberAttenuationDbPerKm ?? 0.35;
    fusionLossPerFusion = foundOlt?.element.fusionLossDb ?? 0.1;
  }
  const cableLoss = totalDistanceKm * attenuationPerKm;
  const fusionLoss = totalFusionCount * fusionLossPerFusion;
  const totalLoss = cableLoss + totalSplitterLoss + fusionLoss;
  const rxPower = txPower - totalLoss;
  const finalPath = reversePath.reverse();
  let cumulativePower = txPower;
  const pathWithPower = finalPath.map((step) => {
    cumulativePower -= step.lossDb;
    return { ...step, cumulativePowerDbm: cumulativePower };
  });
  return {
    found: true,
    rxPowerDbm: rxPower,
    txPowerDbm: txPower,
    totalLossDb: totalLoss,
    distanceKm: totalDistanceKm,
    cableLossDb: cableLoss,
    splitterLossDb: totalSplitterLoss,
    fusionLossDb: fusionLoss,
    signalQuality: getSignalQuality(rxPower),
    path: pathWithPower,
    warnings
  };
}
async function getViaAssociationsByCto(ctoId) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(ctoViaAssociations).where(eq(ctoViaAssociations.ctoId, ctoId));
}
async function createCtoViaAssociation(data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const existing = await db.select().from(ctoViaAssociations).where(
    and(
      eq(ctoViaAssociations.ctoId, data.ctoId),
      eq(ctoViaAssociations.sourceViaId, data.sourceViaId),
      eq(ctoViaAssociations.targetViaId, data.targetViaId)
    )
  ).limit(1);
  if (existing.length > 0) return existing[0].id;
  const existingSrcAsSource = await db.select().from(ctoViaAssociations).where(
    and(
      eq(ctoViaAssociations.ctoId, data.ctoId),
      eq(ctoViaAssociations.sourceViaId, data.sourceViaId)
    )
  ).limit(1);
  if (existingSrcAsSource.length > 0) throw new Error("Esta via j\xE1 tem uma fus\xE3o associada.");
  const existingSrcAsTarget = await db.select().from(ctoViaAssociations).where(
    and(
      eq(ctoViaAssociations.ctoId, data.ctoId),
      eq(ctoViaAssociations.targetViaId, data.sourceViaId)
    )
  ).limit(1);
  if (existingSrcAsTarget.length > 0) throw new Error("Esta via j\xE1 tem uma fus\xE3o associada.");
  const existingTgtAsTarget = await db.select().from(ctoViaAssociations).where(
    and(
      eq(ctoViaAssociations.ctoId, data.ctoId),
      eq(ctoViaAssociations.targetViaId, data.targetViaId)
    )
  ).limit(1);
  if (existingTgtAsTarget.length > 0) throw new Error("Esta via j\xE1 tem uma fus\xE3o associada.");
  const existingTgtAsSource = await db.select().from(ctoViaAssociations).where(
    and(
      eq(ctoViaAssociations.ctoId, data.ctoId),
      eq(ctoViaAssociations.sourceViaId, data.targetViaId)
    )
  ).limit(1);
  if (existingTgtAsSource.length > 0) throw new Error("Esta via j\xE1 tem uma fus\xE3o associada.");
  const result = await db.insert(ctoViaAssociations).values(data);
  return result[0]?.insertId ?? 0;
}
async function deleteCtoViaAssociation(id) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.delete(ctoViaAssociations).where(eq(ctoViaAssociations.id, id));
}
async function deleteCtoViaAssociationByVias(ctoId, viaId1, viaId2) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.delete(ctoViaAssociations).where(
    and(
      eq(ctoViaAssociations.ctoId, ctoId),
      eq(ctoViaAssociations.sourceViaId, viaId1),
      eq(ctoViaAssociations.targetViaId, viaId2)
    )
  );
  await db.delete(ctoViaAssociations).where(
    and(
      eq(ctoViaAssociations.ctoId, ctoId),
      eq(ctoViaAssociations.sourceViaId, viaId2),
      eq(ctoViaAssociations.targetViaId, viaId1)
    )
  );
}
async function getMapPoles() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(mapPoles).orderBy(mapPoles.name);
}
async function getMapPoleById(id) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(mapPoles).where(eq(mapPoles.id, id)).limit(1);
  return rows[0] ?? null;
}
async function createMapPole(data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const [result] = await db.insert(mapPoles).values(data);
  return result.insertId ?? 0;
}
async function updateMapPole(id, data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(mapPoles).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(mapPoles.id, id));
}
async function deleteMapPole(id) {
  const db = await getDb();
  if (!db) return;
  await db.delete(mapPoles).where(eq(mapPoles.id, id));
}
async function getMapTechnicalReserves() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(mapTechnicalReserves).orderBy(mapTechnicalReserves.name);
}
async function getMapTechnicalReserveById(id) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(mapTechnicalReserves).where(eq(mapTechnicalReserves.id, id)).limit(1);
  return rows[0] ?? null;
}
async function getMapTechnicalReservesByRoute(routeId) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(mapTechnicalReserves).where(eq(mapTechnicalReserves.routeId, routeId));
}
async function createMapTechnicalReserve(data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const [result] = await db.insert(mapTechnicalReserves).values(data);
  return result.insertId ?? 0;
}
async function updateMapTechnicalReserve(id, data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(mapTechnicalReserves).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(mapTechnicalReserves.id, id));
}
async function deleteMapTechnicalReserve(id) {
  const db = await getDb();
  if (!db) return;
  await db.delete(mapTechnicalReserves).where(eq(mapTechnicalReserves.id, id));
}
async function getTechnicalReserveExtraMeters(routeId) {
  const db = await getDb();
  if (!db) return 0;
  const rows = await db.select({ sizeMeters: mapTechnicalReserves.sizeMeters }).from(mapTechnicalReserves).where(eq(mapTechnicalReserves.routeId, routeId));
  return rows.reduce((sum, r) => sum + (r.sizeMeters ?? 0), 0);
}
async function getMapPois() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(mapPois).orderBy(mapPois.name);
}
async function getMapPoiById(id) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(mapPois).where(eq(mapPois.id, id));
  return rows[0] ?? null;
}
async function createMapPoi(data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const [result] = await db.insert(mapPois).values(data);
  return result.insertId ?? 0;
}
async function updateMapPoi(id, data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(mapPois).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(mapPois.id, id));
}
async function deleteMapPoi(id) {
  const db = await getDb();
  if (!db) return;
  await db.delete(mapPois).where(eq(mapPois.id, id));
}
async function addPoiToGroup(poiId, groupId) {
  const db = await getDb();
  if (!db) return;
  const exists = await db.select().from(mapPoiGroups).where(and(eq(mapPoiGroups.poiId, poiId), eq(mapPoiGroups.groupId, groupId)));
  if (exists.length === 0) await db.insert(mapPoiGroups).values({ poiId, groupId });
}
async function removePoiFromGroup(poiId, groupId) {
  const db = await getDb();
  if (!db) return;
  await db.delete(mapPoiGroups).where(and(eq(mapPoiGroups.poiId, poiId), eq(mapPoiGroups.groupId, groupId)));
}
async function getAllPoiGroupMemberships() {
  const db = await getDb();
  if (!db) return [];
  return db.select({ poiId: mapPoiGroups.poiId, groupId: mapPoiGroups.groupId }).from(mapPoiGroups);
}
async function addOltToGroup(oltId, groupId) {
  const db = await getDb();
  if (!db) return;
  const exists = await db.select().from(mapOltGroups).where(and(eq(mapOltGroups.oltId, oltId), eq(mapOltGroups.groupId, groupId)));
  if (exists.length === 0) await db.insert(mapOltGroups).values({ oltId, groupId });
}
async function removeOltFromGroup(oltId, groupId) {
  const db = await getDb();
  if (!db) return;
  await db.delete(mapOltGroups).where(and(eq(mapOltGroups.oltId, oltId), eq(mapOltGroups.groupId, groupId)));
}
async function removeOltFromAllGroups(oltId) {
  const db = await getDb();
  if (!db) return;
  await db.delete(mapOltGroups).where(eq(mapOltGroups.oltId, oltId));
}
async function getAllOltGroupMemberships() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(mapOltGroups);
}
async function getMapDgoElements() {
  const db = await getDb();
  if (!db) return [];
  const rows = await db.select({
    id: mapDgoElements.id,
    equipmentId: mapDgoElements.equipmentId,
    lat: mapDgoElements.lat,
    lng: mapDgoElements.lng,
    notes: mapDgoElements.notes,
    createdAt: mapDgoElements.createdAt,
    updatedAt: mapDgoElements.updatedAt,
    equipmentName: equipments.name,
    equipmentStatus: equipments.status
  }).from(mapDgoElements).leftJoin(equipments, eq(mapDgoElements.equipmentId, equipments.id));
  return rows;
}
async function getMapDgoElementById(id) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select({
    id: mapDgoElements.id,
    equipmentId: mapDgoElements.equipmentId,
    lat: mapDgoElements.lat,
    lng: mapDgoElements.lng,
    notes: mapDgoElements.notes,
    createdAt: mapDgoElements.createdAt,
    updatedAt: mapDgoElements.updatedAt,
    equipmentName: equipments.name,
    equipmentStatus: equipments.status,
    totalPorts: equipments.totalPorts,
    model: equipments.model,
    ipAddress: equipments.ipAddress
  }).from(mapDgoElements).leftJoin(equipments, eq(mapDgoElements.equipmentId, equipments.id)).where(eq(mapDgoElements.id, id)).limit(1);
  return rows[0] ?? null;
}
async function createMapDgoElement(data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const result = await db.insert(mapDgoElements).values(data);
  return result[0].insertId;
}
async function updateMapDgoElement(id, data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  await db.update(mapDgoElements).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(mapDgoElements.id, id));
}
async function deleteMapDgoElement(id) {
  const db = await getDb();
  if (!db) return;
  await db.delete(mapDgoElements).where(eq(mapDgoElements.id, id));
}
async function getDgoSlotCableLinks(dgoElementId) {
  const db = await getDb();
  if (!db) return [];
  const links = await db.select().from(dgoSlotCableLinks).where(eq(dgoSlotCableLinks.dgoElementId, dgoElementId));
  if (links.length === 0) return [];
  const slotIds = Array.from(new Set(links.map((l) => l.slotId)));
  const routeIds = Array.from(new Set(links.map((l) => l.routeId)));
  const allSlots = slotIds.length > 0 ? await db.select({ id: equipmentSlots.id, slotNumber: equipmentSlots.slotNumber, label: equipmentSlots.label }).from(equipmentSlots).where(sql`${equipmentSlots.id} IN (${sql.join(slotIds.map((id) => sql`${id}`), sql`, `)})`) : [];
  const allRoutes = routeIds.length > 0 ? await db.select({
    id: mapRoutes.id,
    name: mapRoutes.name,
    cableType: mapRoutes.cableType,
    fiberCount: mapRoutes.fiberCount,
    fromTubeId: mapRoutes.fromTubeId,
    toTubeId: mapRoutes.toTubeId,
    fromElementId: mapRoutes.fromElementId,
    toElementId: mapRoutes.toElementId
  }).from(mapRoutes).where(sql`${mapRoutes.id} IN (${sql.join(routeIds.map((id) => sql`${id}`), sql`, `)})`) : [];
  const slotMap = new Map(allSlots.map((s) => [s.id, s]));
  const routeMap = new Map(allRoutes.map((r) => [r.id, r]));
  const ceoTubeIds = [];
  const ctoTubeIds = [];
  const elementIds = [];
  for (const link of links) {
    const route = routeMap.get(link.routeId);
    if (!route) continue;
    const tubeId = link.side === "in" ? route.toTubeId : route.fromTubeId;
    const elemId = link.side === "in" ? route.toElementId : route.fromElementId;
    if (tubeId) {
      ceoTubeIds.push(tubeId);
      ctoTubeIds.push(tubeId);
    }
    if (elemId) elementIds.push(elemId);
  }
  const ceoTubeRows = ceoTubeIds.length > 0 ? await db.select({ id: ceoTubes.id, identifier: ceoTubes.identifier, color: ceoTubes.color, ceoId: ceoTubes.ceoId }).from(ceoTubes).where(sql`${ceoTubes.id} IN (${sql.join(ceoTubeIds.map((id) => sql`${id}`), sql`, `)})`) : [];
  const ctoTubeRows = ctoTubeIds.length > 0 ? await db.select({ id: ctoTubes.id, identifier: ctoTubes.identifier, color: ctoTubes.color, ctoId: ctoTubes.ctoId }).from(ctoTubes).where(sql`${ctoTubes.id} IN (${sql.join(ctoTubeIds.map((id) => sql`${id}`), sql`, `)})`) : [];
  const elemRows = elementIds.length > 0 ? await db.select({ id: mapElements.id, type: mapElements.type, referenceId: mapElements.referenceId }).from(mapElements).where(sql`${mapElements.id} IN (${sql.join(elementIds.map((id) => sql`${id}`), sql`, `)})`) : [];
  const ceoRefIds = elemRows.filter((e) => e.type === "ceo").map((e) => e.referenceId);
  const ctoRefIds = elemRows.filter((e) => e.type === "cto").map((e) => e.referenceId);
  const ceoNameRows = ceoRefIds.length > 0 ? await db.select({ id: ceos.id, name: ceos.name }).from(ceos).where(sql`${ceos.id} IN (${sql.join(ceoRefIds.map((id) => sql`${id}`), sql`, `)})`) : [];
  const ctoNameRows = ctoRefIds.length > 0 ? await db.select({ id: ctos.id, name: ctos.name }).from(ctos).where(sql`${ctos.id} IN (${sql.join(ctoRefIds.map((id) => sql`${id}`), sql`, `)})`) : [];
  const ceoTubeMap = new Map(ceoTubeRows.map((t2) => [t2.id, t2]));
  const ctoTubeMap = new Map(ctoTubeRows.map((t2) => [t2.id, t2]));
  const elemMap = new Map(elemRows.map((e) => [e.id, e]));
  const ceoNameMap = new Map(ceoNameRows.map((c) => [c.id, c.name]));
  const ctoNameMap = new Map(ctoNameRows.map((c) => [c.id, c.name]));
  return links.map((link) => {
    const slot = slotMap.get(link.slotId);
    const route = routeMap.get(link.routeId);
    const tubeId = route ? link.side === "in" ? route.toTubeId : route.fromTubeId : null;
    const elemId = route ? link.side === "in" ? route.toElementId : route.fromElementId : null;
    const ceoTubeRow = tubeId ? ceoTubeMap.get(tubeId) : null;
    const ctoTubeRow = tubeId && !ceoTubeRow ? ctoTubeMap.get(tubeId) : null;
    const tubeRow = ceoTubeRow ?? ctoTubeRow ?? null;
    const tubeType = ceoTubeRow ? "ceo" : ctoTubeRow ? "cto" : null;
    let autoTubeElementName = null;
    let autoTubeElementType = null;
    if (elemId) {
      const elem = elemMap.get(elemId);
      if (elem) {
        autoTubeElementType = elem.type;
        if (elem.type === "ceo") autoTubeElementName = ceoNameMap.get(elem.referenceId) ?? null;
        else if (elem.type === "cto") autoTubeElementName = ctoNameMap.get(elem.referenceId) ?? null;
      }
    } else if (tubeRow) {
      if (ceoTubeRow) {
        autoTubeElementType = "ceo";
        autoTubeElementName = ceoNameMap.get(ceoTubeRow.ceoId) ?? null;
      } else if (ctoTubeRow) {
        autoTubeElementType = "cto";
        autoTubeElementName = ctoNameMap.get(ctoTubeRow.ctoId) ?? null;
      }
    }
    return {
      ...link,
      slotLabel: slot?.label ?? null,
      slotNumber: slot?.slotNumber ?? null,
      routeName: route?.name ?? null,
      cableType: route?.cableType ?? null,
      fiberCount: route?.fiberCount ?? null,
      autoTubeId: tubeRow?.id ?? null,
      autoTubeIdentifier: tubeRow?.identifier ?? null,
      autoTubeColor: tubeRow?.color ?? null,
      autoTubeElementName,
      autoTubeElementType
    };
  });
}
async function createDgoSlotCableLink(data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const result = await db.insert(dgoSlotCableLinks).values(data);
  return result[0].insertId;
}
async function deleteDgoSlotCableLink(id) {
  const db = await getDb();
  if (!db) return;
  await db.delete(dgoSlotCableLinks).where(eq(dgoSlotCableLinks.id, id));
}
async function addDgoToGroup(dgoId, groupId) {
  const db = await getDb();
  if (!db) return;
  const exists = await db.select().from(mapDgoGroups).where(and(eq(mapDgoGroups.dgoId, dgoId), eq(mapDgoGroups.groupId, groupId)));
  if (exists.length === 0) await db.insert(mapDgoGroups).values({ dgoId, groupId });
}
async function removeDgoFromGroup(dgoId, groupId) {
  const db = await getDb();
  if (!db) return;
  await db.delete(mapDgoGroups).where(and(eq(mapDgoGroups.dgoId, dgoId), eq(mapDgoGroups.groupId, groupId)));
}
async function getAllDgoGroupMemberships() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(mapDgoGroups);
}
async function getRouteExtraTubes(routeId) {
  if (!_pool) return [];
  const pool = _pool.promise();
  const [rows] = await pool.execute(
    `SELECT
       ret.id,
       ret.routeId,
       ret.elementId,
       ret.tubeId,
       ret.side,
       ret.notes,
       ret.createdAt,
       COALESCE(ct.identifier, ctt.identifier, CONCAT('Tubo #', ret.tubeId)) AS tubeIdentifier,
       COALESCE(me.name, me.label, CONCAT('#', me.id)) AS elementName,
       me.type AS elementType
     FROM route_extra_tubes ret
     LEFT JOIN map_elements me ON me.id = ret.elementId
     LEFT JOIN ceo_tubes ct ON ct.id = ret.tubeId AND me.type = 'ceo'
     LEFT JOIN cto_tubes ctt ON ctt.id = ret.tubeId AND me.type = 'cto'
     WHERE ret.routeId = ?
     ORDER BY ret.side, ret.id`,
    [routeId]
  );
  return rows;
}
async function addRouteExtraTube(data) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const result = await db.insert(routeExtraTubes).values({
    routeId: data.routeId,
    elementId: data.elementId,
    tubeId: data.tubeId,
    side: data.side,
    notes: data.notes ?? null
  });
  return result[0].insertId;
}
async function deleteRouteExtraTube(id) {
  const db = await getDb();
  if (!db) return;
  await db.delete(routeExtraTubes).where(eq(routeExtraTubes.id, id));
}
async function deleteRouteExtraTubesByRoute(routeId) {
  const db = await getDb();
  if (!db) return;
  await db.delete(routeExtraTubes).where(eq(routeExtraTubes.routeId, routeId));
}
async function getDgoPortLinks(dgoElementId) {
  if (!_pool) return [];
  const pool = _pool.promise();
  const [rows] = await pool.execute(
    `SELECT
       dpl.id,
       dpl.dgoElementId,
       dpl.slotId,
       dpl.portNumber,
       dpl.ceoElementId,
       dpl.notes,
       -- CEO de passagem
       COALESCE(ceo_me.name, ceo_me.label, CONCAT('CEO #', dpl.ceoElementId)) AS ceoName,
       -- Porta do equipamento vinculado
       dpl.portId,
       p.portNumber AS portNumber_eq,
       p.label AS portLabel,
       p.equipmentId,
       eq.name AS equipmentName,
       eq.type AS equipmentType,
       -- Equipamento conectado (lido automaticamente via ports.connectedTo*)
       p.connectedToEquipmentId,
       eq2.name AS connectedToEquipmentName,
       p.connectedToPortId,
       p2.portNumber AS connectedToPortNumber,
       p2.label AS connectedToPortLabel
     FROM dgo_port_links dpl
     LEFT JOIN map_elements ceo_me ON ceo_me.id = dpl.ceoElementId
     LEFT JOIN ports p ON p.id = dpl.portId
     LEFT JOIN equipments eq ON eq.id = p.equipmentId
     LEFT JOIN equipments eq2 ON eq2.id = p.connectedToEquipmentId
     LEFT JOIN ports p2 ON p2.id = p.connectedToPortId
     WHERE dpl.dgoElementId = ?
     ORDER BY dpl.slotId, dpl.portNumber`,
    [dgoElementId]
  );
  return rows;
}
async function upsertDgoPortLink(data) {
  if (!_pool) throw new Error("DB not available");
  const pool = _pool.promise();
  const [existing] = await pool.execute(
    `SELECT id FROM dgo_port_links WHERE dgoElementId = ? AND slotId = ? AND portNumber = ? LIMIT 1`,
    [data.dgoElementId, data.slotId, data.portNumber]
  );
  if (existing.length > 0) {
    await pool.execute(
      `UPDATE dgo_port_links SET ceoElementId = ?, portId = ?, notes = ?, updatedAt = NOW() WHERE id = ?`,
      [data.ceoElementId ?? null, data.portId ?? null, data.notes ?? null, existing[0].id]
    );
    return existing[0].id;
  } else {
    const [result] = await pool.execute(
      `INSERT INTO dgo_port_links (dgoElementId, slotId, portNumber, ceoElementId, portId, notes) VALUES (?, ?, ?, ?, ?, ?)`,
      [data.dgoElementId, data.slotId, data.portNumber, data.ceoElementId ?? null, data.portId ?? null, data.notes ?? null]
    );
    return result.insertId;
  }
}
async function deleteDgoPortLink(id) {
  if (!_pool) return;
  await _pool.promise().execute(`DELETE FROM dgo_port_links WHERE id = ?`, [id]);
}
async function getPortsByEquipmentForDgo(equipmentId) {
  if (!_pool) return [];
  const pool = _pool.promise();
  try {
    const [rows] = await pool.execute(
      `SELECT
         p.id,
         p.portNumber,
         p.label,
         p.slotId,
         es.label AS slotLabel,
         p.connectedToEquipmentId,
         eq2.name AS connectedToEquipmentName,
         COALESCE(p.txPowerDbm, eq2.txPowerDbm) AS connectedToEquipmentTxPowerDbm,
         p.txPowerDbm AS portTxPowerDbm,
         p.connectedToPortId,
         p2.portNumber AS connectedToPortNumber,
         es2.slotNumber AS connectedToSlotLabel
       FROM ports p
       LEFT JOIN equipment_slots es ON es.id = p.slotId
       LEFT JOIN equipments eq2 ON eq2.id = p.connectedToEquipmentId
       LEFT JOIN ports p2 ON p2.id = p.connectedToPortId
       LEFT JOIN equipment_slots es2 ON es2.id = p2.slotId
       WHERE p.equipmentId = ?
       ORDER BY COALESCE(p.sortOrder, 0), CAST(p.portNumber AS UNSIGNED), p.portNumber`,
      [equipmentId]
    );
    return rows;
  } catch (err) {
    console.error("[getPortsByEquipmentForDgo] SQL error:", err);
    return [];
  }
}
async function calculateOpticalBalanceFromDgo(input) {
  const noResult = (msg) => ({
    found: false,
    rxPowerDbm: null,
    txPowerDbm: null,
    equipmentName: null,
    totalLossDb: 0,
    distanceKm: 0,
    cableLossDb: 0,
    splitterLossDb: 0,
    fusionLossDb: 0,
    signalQuality: "no_signal",
    path: [],
    warnings: [msg],
    cableOutElementId: null
  });
  if (!_pool) return noResult("DB n\xE3o dispon\xEDvel");
  const pool = _pool.promise();
  const [portLinkRows] = await pool.execute(
    `SELECT
       dpl.portId,
       p.connectedToEquipmentId,
       p.txPowerDbm AS portTxPowerDbm,
       eq.name AS equipmentName,
       eq.txPowerDbm AS equipmentTxPowerDbm,
       COALESCE(p.txPowerDbm, eq.txPowerDbm) AS effectiveTxPowerDbm
     FROM dgo_port_links dpl
     LEFT JOIN ports p ON p.id = dpl.portId
     LEFT JOIN equipments eq ON eq.id = p.connectedToEquipmentId
     WHERE dpl.dgoElementId = ? AND dpl.slotId = ? AND dpl.portNumber = ?
     LIMIT 1`,
    [input.dgoElementId, input.slotId, input.portNumber]
  );
  const portLinkRow = portLinkRows[0] ?? null;
  const [dgoPortRows] = await pool.execute(
    `SELECT
       p.connectedToEquipmentId,
       p.txPowerDbm AS portTxPowerDbm,
       eq.name AS equipmentName,
       eq.txPowerDbm AS equipmentTxPowerDbm,
       COALESCE(p.txPowerDbm, eq.txPowerDbm) AS effectiveTxPowerDbm
     FROM equipment_slots es
     JOIN ports p ON p.slotId = es.id
     JOIN map_dgo_elements mde ON mde.equipmentId = es.equipmentId
     LEFT JOIN equipments eq ON eq.id = p.connectedToEquipmentId
     WHERE mde.id = ? AND es.id = ?
     ORDER BY COALESCE(p.sortOrder, 0), CAST(p.portNumber AS UNSIGNED), p.portNumber
     LIMIT 100`,
    [input.dgoElementId, input.slotId]
  );
  const dgoPortRow = dgoPortRows[input.portNumber - 1] ?? null;
  let txPowerDbm = null;
  let equipmentName = null;
  if (portLinkRow?.effectiveTxPowerDbm != null) {
    txPowerDbm = Number(portLinkRow.effectiveTxPowerDbm);
    equipmentName = portLinkRow.equipmentName ?? null;
  } else if (dgoPortRow?.effectiveTxPowerDbm != null) {
    txPowerDbm = Number(dgoPortRow.effectiveTxPowerDbm);
    equipmentName = dgoPortRow.equipmentName ?? null;
  }
  if (txPowerDbm === null) {
    const eqName = portLinkRow?.equipmentName ?? dgoPortRow?.equipmentName ?? null;
    return noResult(
      eqName ? `Equipamento "${eqName}" n\xE3o tem Pot\xEAncia TX (dBm) cadastrada` : "Nenhum equipamento com Pot\xEAncia TX (dBm) vinculado a esta porta"
    );
  }
  const [cableRows] = await pool.execute(
    `SELECT
       mr.id AS routeId,
       mr.name AS routeName,
       mr.fromElementId,
       mr.toElementId,
       dscl.side
     FROM dgo_slot_cable_links dscl
     JOIN map_routes mr ON mr.id = dscl.routeId
     WHERE dscl.dgoElementId = ? AND dscl.slotId = ? AND dscl.side = 'out'
     LIMIT 1`,
    [input.dgoElementId, input.slotId]
  );
  const cableRow = cableRows[0] ?? null;
  if (!cableRow) {
    return { ...noResult("Nenhum cabo de sa\xEDda vinculado a esta bandeja"), txPowerDbm, equipmentName, cableOutElementId: null };
  }
  const cableOutElementId = cableRow.toElementId ?? cableRow.fromElementId ?? null;
  if (!cableOutElementId) {
    return { ...noResult("Cabo de sa\xEDda sem elemento destino configurado"), txPowerDbm, equipmentName, cableOutElementId: null };
  }
  const targetElementId = input.ctoElementId ?? cableOutElementId;
  try {
    const result = await calculateOpticalBalance(targetElementId, {
      overrideTxPowerDbm: txPowerDbm,
      overrideEquipmentName: equipmentName ?? "DGO"
    });
    return { ...result, txPowerDbm, equipmentName, cableOutElementId };
  } catch (err) {
    console.error("[calculateOpticalBalanceFromDgo] erro ao calcular balan\xE7o:", err);
    return { ...noResult(`Erro ao calcular balan\xE7o: ${err.message}`), txPowerDbm, equipmentName, cableOutElementId };
  }
}
async function getDgoSlotCtoBalances(input) {
  if (!_pool) return [];
  const pool = _pool.promise();
  const [portLinkRows] = await pool.execute(
    `SELECT
       COALESCE(p.txPowerDbm, eq.txPowerDbm) AS effectiveTxPowerDbm,
       eq.name AS equipmentName
     FROM dgo_port_links dpl
     LEFT JOIN ports p ON p.id = dpl.portId
     LEFT JOIN equipments eq ON eq.id = p.connectedToEquipmentId
     WHERE dpl.dgoElementId = ? AND dpl.slotId = ? AND dpl.portNumber = ?
     LIMIT 1`,
    [input.dgoElementId, input.slotId, input.portNumber]
  );
  const portLinkRow = portLinkRows[0] ?? null;
  const [dgoPortRows] = await pool.execute(
    `SELECT
       COALESCE(p.txPowerDbm, eq.txPowerDbm) AS effectiveTxPowerDbm,
       eq.name AS equipmentName
     FROM equipment_slots es
     JOIN ports p ON p.slotId = es.id
     JOIN map_dgo_elements mde ON mde.equipmentId = es.equipmentId
     LEFT JOIN equipments eq ON eq.id = p.connectedToEquipmentId
     WHERE mde.id = ? AND es.id = ?
     ORDER BY COALESCE(p.sortOrder, 0), CAST(p.portNumber AS UNSIGNED), p.portNumber
     LIMIT 100`,
    [input.dgoElementId, input.slotId]
  );
  const dgoPortRow = dgoPortRows[input.portNumber - 1] ?? null;
  const txPowerDbm = portLinkRow?.effectiveTxPowerDbm != null ? Number(portLinkRow.effectiveTxPowerDbm) : dgoPortRow?.effectiveTxPowerDbm != null ? Number(dgoPortRow.effectiveTxPowerDbm) : null;
  const equipmentName = portLinkRow?.equipmentName ?? dgoPortRow?.equipmentName ?? null;
  if (txPowerDbm === null) return [];
  const [cableRows] = await pool.execute(
    `SELECT mr.fromElementId, mr.toElementId
     FROM dgo_slot_cable_links dscl
     JOIN map_routes mr ON mr.id = dscl.routeId
     WHERE dscl.dgoElementId = ? AND dscl.slotId = ? AND dscl.side = 'out'
     LIMIT 1`,
    [input.dgoElementId, input.slotId]
  );
  const cableRow = cableRows[0] ?? null;
  if (!cableRow) return [];
  const cableOutElementId = cableRow.toElementId ?? cableRow.fromElementId ?? null;
  if (!cableOutElementId) return [];
  const [elemRows] = await pool.execute(
    `SELECT me.id, me.type, me.referenceId,
            COALESCE(ceo.name, cto.name) AS elementName
     FROM map_elements me
     LEFT JOIN ceos ceo ON ceo.id = me.referenceId AND me.type = 'ceo'
     LEFT JOIN ctos cto ON cto.id = me.referenceId AND me.type = 'cto'
     WHERE me.id = ?
     LIMIT 1`,
    [cableOutElementId]
  );
  const elemRow = elemRows[0] ?? null;
  if (!elemRow) return [];
  let ctoTargets = [];
  if (elemRow.type === "cto") {
    ctoTargets.push({ ctoElementId: elemRow.id, ctoName: elemRow.elementName ?? `CTO #${elemRow.id}` });
  } else if (elemRow.type === "ceo") {
    const [ctoRows] = await pool.execute(
      `SELECT me.id AS ctoElementId, cto.name AS ctoName
       FROM map_routes mr
       JOIN map_elements me ON (
         (mr.fromElementId = ? AND me.id = mr.toElementId) OR
         (mr.toElementId = ? AND me.id = mr.fromElementId)
       )
       JOIN ctos cto ON cto.id = me.referenceId
       WHERE me.type = 'cto'
       ORDER BY cto.name`,
      [cableOutElementId, cableOutElementId]
    );
    ctoTargets = ctoRows.map((r) => ({
      ctoElementId: r.ctoElementId,
      ctoName: r.ctoName ?? `CTO #${r.ctoElementId}`
    }));
  }
  if (ctoTargets.length === 0) return [];
  const results = [];
  for (const target of ctoTargets) {
    try {
      const balance = await calculateOpticalBalance(target.ctoElementId, {
        overrideTxPowerDbm: txPowerDbm,
        overrideEquipmentName: equipmentName ?? "DGO"
      });
      results.push({ ctoElementId: target.ctoElementId, ctoName: target.ctoName, balance });
    } catch (err) {
      console.error(`[getDgoSlotCtoBalances] erro CTO #${target.ctoElementId}:`, err);
    }
  }
  return results;
}
var _pool, _db, BALANCED_LOSS_DB, SPLITTER_LOSS_DB;
var init_db = __esm({
  "server/db.ts"() {
    "use strict";
    init_schema();
    init_env();
    init_tenantContext();
    init_schema();
    init_schema();
    init_schema();
    init_schema();
    _pool = null;
    _db = null;
    BALANCED_LOSS_DB = {
      "1:2": 3.5,
      "1:4": 7.2,
      "1:8": 10.5,
      "1:16": 13.5,
      "1:32": 17
    };
    SPLITTER_LOSS_DB = {
      "1:2": 3.5,
      "1:4": 7,
      "1:8": 10.5,
      "1:16": 13.5,
      "1:32": 17,
      "1:64": 20.5
    };
  }
});

// server/_core/trpc.ts
import { initTRPC, TRPCError as TRPCError2 } from "@trpc/server";
import superjson from "superjson";
var t, router, injectTenantDb, publicProcedure, requireUser, protectedProcedure, adminProcedure;
var init_trpc = __esm({
  "server/_core/trpc.ts"() {
    "use strict";
    init_const();
    init_tenantContext();
    t = initTRPC.context().create({
      transformer: superjson
    });
    router = t.router;
    injectTenantDb = t.middleware(async (opts) => {
      const { ctx, next } = opts;
      if (ctx.tenantDb) {
        return runWithTenantDb(ctx.tenantDb, () => next({ ctx }));
      }
      return next({ ctx });
    });
    publicProcedure = t.procedure.use(injectTenantDb);
    requireUser = t.middleware(async (opts) => {
      const { ctx, next } = opts;
      if (!ctx.user) {
        throw new TRPCError2({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
      }
      return next({
        ctx: {
          ...ctx,
          user: ctx.user
        }
      });
    });
    protectedProcedure = t.procedure.use(injectTenantDb).use(requireUser);
    adminProcedure = t.procedure.use(injectTenantDb).use(
      t.middleware(async (opts) => {
        const { ctx, next } = opts;
        if (!ctx.user || ctx.user.role !== "admin") {
          throw new TRPCError2({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
        }
        return next({
          ctx: {
            ...ctx,
            user: ctx.user
          }
        });
      })
    );
  }
});

// server/storage.ts
var storage_exports = {};
__export(storage_exports, {
  storageGet: () => storageGet,
  storagePut: () => storagePut
});
function getStorageConfig() {
  const baseUrl = ENV.forgeApiUrl;
  const apiKey = ENV.forgeApiKey;
  if (!baseUrl || !apiKey) {
    throw new Error(
      "Storage proxy credentials missing: set BUILT_IN_FORGE_API_URL and BUILT_IN_FORGE_API_KEY"
    );
  }
  return { baseUrl: baseUrl.replace(/\/+$/, ""), apiKey };
}
function buildUploadUrl(baseUrl, relKey) {
  const url = new URL("v1/storage/upload", ensureTrailingSlash(baseUrl));
  url.searchParams.set("path", normalizeKey(relKey));
  return url;
}
async function buildDownloadUrl(baseUrl, relKey, apiKey) {
  const downloadApiUrl = new URL(
    "v1/storage/downloadUrl",
    ensureTrailingSlash(baseUrl)
  );
  downloadApiUrl.searchParams.set("path", normalizeKey(relKey));
  const response = await fetch(downloadApiUrl, {
    method: "GET",
    headers: buildAuthHeaders(apiKey)
  });
  return (await response.json()).url;
}
function ensureTrailingSlash(value) {
  return value.endsWith("/") ? value : `${value}/`;
}
function normalizeKey(relKey) {
  return relKey.replace(/^\/+/, "");
}
function toFormData(data, contentType, fileName) {
  const blob = typeof data === "string" ? new Blob([data], { type: contentType }) : new Blob([data], { type: contentType });
  const form = new FormData();
  form.append("file", blob, fileName || "file");
  return form;
}
function buildAuthHeaders(apiKey) {
  return { Authorization: `Bearer ${apiKey}` };
}
async function storagePut(relKey, data, contentType = "application/octet-stream") {
  const { baseUrl, apiKey } = getStorageConfig();
  const key = normalizeKey(relKey);
  const uploadUrl = buildUploadUrl(baseUrl, key);
  const formData = toFormData(data, contentType, key.split("/").pop() ?? key);
  const response = await fetch(uploadUrl, {
    method: "POST",
    headers: buildAuthHeaders(apiKey),
    body: formData
  });
  if (!response.ok) {
    const message = await response.text().catch(() => response.statusText);
    throw new Error(
      `Storage upload failed (${response.status} ${response.statusText}): ${message}`
    );
  }
  const url = (await response.json()).url;
  return { key, url };
}
async function storageGet(relKey) {
  const { baseUrl, apiKey } = getStorageConfig();
  const key = normalizeKey(relKey);
  return {
    key,
    url: await buildDownloadUrl(baseUrl, key, apiKey)
  };
}
var init_storage = __esm({
  "server/storage.ts"() {
    "use strict";
    init_env();
  }
});

// server/sgpApi.ts
var sgpApi_exports = {};
__export(sgpApi_exports, {
  getSgpConfig: () => getSgpConfig2,
  saveSgpConfig: () => saveSgpConfig2,
  sgpAuthorizeOnu: () => sgpAuthorizeOnu,
  sgpConfigureOnuWan: () => sgpConfigureOnuWan,
  sgpConfigureOnuWifi: () => sgpConfigureOnuWifi,
  sgpCpeConfigurePppoe: () => sgpCpeConfigurePppoe,
  sgpCpeGetDetails: () => sgpCpeGetDetails,
  sgpCpeImportWifi: () => sgpCpeImportWifi,
  sgpCpePing: () => sgpCpePing,
  sgpCpeReboot: () => sgpCpeReboot,
  sgpCpeSetWifi: () => sgpCpeSetWifi,
  sgpCpeSpeedTest: () => sgpCpeSpeedTest,
  sgpCpeSyncWan: () => sgpCpeSyncWan,
  sgpCreateCto: () => sgpCreateCto,
  sgpGetCto: () => sgpGetCto,
  sgpGetOnuBySerial: () => sgpGetOnuBySerial,
  sgpGetOnuDetail: () => sgpGetOnuDetail,
  sgpListAllCtos: () => sgpListAllCtos,
  sgpListOnus: () => sgpListOnus,
  sgpOnusByCto: () => sgpOnusByCto,
  sgpResetOnu: () => sgpResetOnu,
  sgpSearchClients: () => sgpSearchClients,
  sgpTestConnection: () => sgpTestConnection
});
import { eq as eq5 } from "drizzle-orm";
async function getSgpConfig2() {
  try {
    const db = await getDb();
    if (!db) throw new Error("DB not ready");
    const rows = await db.select().from(appSettings).where(eq5(appSettings.key, "sgp_config"));
    if (rows.length > 0 && rows[0].value) {
      const cfg = JSON.parse(rows[0].value);
      if (cfg.url && cfg.token && cfg.app) return cfg;
    }
  } catch {
  }
  const url = process.env.SGP_URL;
  const token = process.env.SGP_TOKEN;
  const app = process.env.SGP_APP;
  if (url && token && app) return { url, token, app };
  return null;
}
async function saveSgpConfig2(cfg) {
  const value = JSON.stringify(cfg);
  const db = await getDb();
  if (!db) throw new Error("DB not ready");
  await db.insert(appSettings).values({ key: "sgp_config", value }).onDuplicateKeyUpdate({ set: { value } });
}
async function sgpFetch2(cfg, path7, options = {}) {
  const url = `${cfg.url.replace(/\/$/, "")}${path7}`;
  const headers = {
    token: cfg.token,
    app: cfg.app,
    ...options.headers ?? {}
  };
  return fetch(url, { ...options, headers });
}
async function sgpListAllCtos(cfg) {
  const res = await sgpFetch2(cfg, "/api/fttx/splitter/all/");
  if (!res.ok) throw new Error(`SGP listAllCtos: ${res.status} ${res.statusText}`);
  const data = await res.json();
  return Array.isArray(data) ? data : data.results ?? data.data ?? [];
}
async function sgpGetCto(cfg, ctoId) {
  const res = await sgpFetch2(cfg, `/api/fttx/splitter/${ctoId}/`);
  if (!res.ok) throw new Error(`SGP getCto: ${res.status} ${res.statusText}`);
  return res.json();
}
async function sgpOnusByCto(cfg, ctoId) {
  const res = await sgpFetch2(cfg, `/api/fttx/splitter/${ctoId}/onu/list/`);
  if (!res.ok) throw new Error(`SGP onusByCto: ${res.status} ${res.statusText}`);
  const data = await res.json();
  return Array.isArray(data) ? data : data.results ?? data.data ?? [];
}
async function sgpListOnus(cfg, oltId, params = {}) {
  const qs = new URLSearchParams(
    Object.entries(params).map(([k, v]) => [k, String(v)])
  ).toString();
  const path7 = `/api/fttx/olt/${oltId}/onu/list/${qs ? "?" + qs : ""}`;
  const res = await sgpFetch2(cfg, path7);
  if (!res.ok) throw new Error(`SGP listOnus: ${res.status} ${res.statusText}`);
  const data = await res.json();
  return Array.isArray(data) ? data : data.results ?? data.data ?? [];
}
async function sgpAuthorizeOnu(cfg, oltId, params) {
  const body = new FormData();
  for (const [k, v] of Object.entries(params)) body.append(k, String(v));
  const res = await sgpFetch2(cfg, `/api/fttx/olt/${oltId}/onu/authorize/`, {
    method: "POST",
    body
  });
  if (!res.ok) throw new Error(`SGP authorizeOnu: ${res.status} ${res.statusText}`);
  return res.json();
}
async function sgpResetOnu(cfg, oltId, params) {
  const qs = new URLSearchParams(
    Object.entries(params).map(([k, v]) => [k, String(v)])
  ).toString();
  const res = await sgpFetch2(cfg, `/api/fttx/olt/${oltId}/onu/reset/?${qs}`);
  if (!res.ok) throw new Error(`SGP resetOnu: ${res.status} ${res.statusText}`);
  return res.json();
}
async function sgpCreateCto(cfg, data) {
  const body = new FormData();
  body.append("ident", data.ident);
  if (data.note) body.append("note", data.note);
  if (data.lat) body.append("lat", data.lat);
  if (data.lng) body.append("lng", data.lng);
  const res = await sgpFetch2(cfg, "/api/fttx/splitter/create/", {
    method: "POST",
    body
  });
  if (!res.ok) throw new Error(`SGP createCto: ${res.status} ${res.statusText}`);
  return res.json();
}
async function sgpSearchClients(cfg, query) {
  const qs = new URLSearchParams({ q: query }).toString();
  const res = await sgpFetch2(cfg, `/api/clientes/?${qs}`);
  if (!res.ok) {
    const res2 = await sgpFetch2(cfg, `/api/assinante/?${qs}`);
    if (!res2.ok) return [];
    const data2 = await res2.json();
    return Array.isArray(data2) ? data2 : data2.results ?? data2.data ?? [];
  }
  const data = await res.json();
  return Array.isArray(data) ? data : data.results ?? data.data ?? [];
}
async function sgpGetOnuBySerial(cfg, serial) {
  const res = await sgpFetch2(cfg, `/api/fttx/onu/${encodeURIComponent(serial)}/`);
  if (res.ok) {
    const data = await res.json();
    if (data && data.id) return data;
  }
  try {
    const res2 = await sgpFetch2(cfg, `/api/fttx/onu/?serial=${encodeURIComponent(serial)}`);
    if (res2.ok) {
      const data2 = await res2.json();
      const list = Array.isArray(data2) ? data2 : data2.results ?? data2.data ?? [];
      if (list.length > 0) return list[0];
    }
  } catch {
  }
  return null;
}
async function sgpGetOnuDetail(cfg, onuId) {
  const res = await sgpFetch2(cfg, `/api/fttx/onu/${onuId}/`);
  if (!res.ok) return null;
  const data = await res.json();
  return data;
}
async function sgpConfigureOnuWan(cfg, onuId, params) {
  const body = new FormData();
  body.append("onu_update", "wan");
  body.append("onu_login", params.onu_login);
  body.append("onu_password", params.onu_password);
  const res = await sgpFetch2(cfg, `/api/fttx/onu/${onuId}/edit/`, {
    method: "POST",
    body
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`SGP configureOnuWan: ${res.status} ${txt}`);
  }
  return res.json().catch(() => ({}));
}
async function sgpConfigureOnuWifi(cfg, onuId, params) {
  const body = new FormData();
  body.append("onu_update", "wifi");
  if (params.wifi_ssid) body.append("wifi_ssid", params.wifi_ssid);
  if (params.wifi_password) body.append("wifi_password", params.wifi_password);
  if (params.wifi_ssid5) body.append("wifi_ssid5", params.wifi_ssid5);
  if (params.wifi_password5) body.append("wifi_password5", params.wifi_password5);
  const res = await sgpFetch2(cfg, `/api/fttx/onu/${onuId}/edit/`, {
    method: "POST",
    body
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`SGP configureOnuWifi: ${res.status} ${txt}`);
  }
  return res.json().catch(() => ({}));
}
async function sgpCpeConfigurePppoe(cfg, servicoId) {
  const res = await sgpFetch2(cfg, `/api/cpemanager/servico/${servicoId}/pppoe/`, {
    method: "POST",
    signal: AbortSignal.timeout(3e4)
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`SGP CPE PPPoE ${res.status}: ${txt}`);
  }
  const data = await res.json().catch(() => ({}));
  return { ok: true, message: data?.message ?? "PPPoE configurado com sucesso" };
}
async function sgpCpeSetWifi(cfg, servicoId) {
  const res = await sgpFetch2(cfg, `/api/cpemanager/servico/${servicoId}/wifi/set/`, {
    method: "POST",
    signal: AbortSignal.timeout(3e4)
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`SGP CPE Wi-Fi ${res.status}: ${txt}`);
  }
  const data = await res.json().catch(() => ({}));
  return { ok: true, message: data?.message ?? "Wi-Fi configurado com sucesso" };
}
async function sgpCpeImportWifi(cfg, servicoId) {
  const res = await sgpFetch2(cfg, `/api/cpemanager/servico/${servicoId}/wifi/import/`, {
    method: "POST",
    signal: AbortSignal.timeout(3e4)
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`SGP CPE Import Wi-Fi ${res.status}: ${txt}`);
  }
  const data = await res.json().catch(() => ({}));
  return { ok: true, message: data?.message ?? "Wi-Fi importado com sucesso" };
}
async function sgpCpeSyncWan(cfg, servicoId) {
  const res = await sgpFetch2(cfg, `/api/cpemanager/servico/${servicoId}/sync/`, {
    method: "POST",
    signal: AbortSignal.timeout(3e4)
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`SGP CPE Sync WAN ${res.status}: ${txt}`);
  }
  const data = await res.json().catch(() => ({}));
  return { ok: true, message: data?.message ?? "WAN sincronizada com sucesso" };
}
async function sgpCpePing(cfg, servicoId) {
  const res = await sgpFetch2(cfg, `/api/cpemanager/servico/${servicoId}/command/ping/`, {
    method: "POST",
    signal: AbortSignal.timeout(3e4)
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`SGP CPE Ping ${res.status}: ${txt}`);
  }
  const data = await res.json().catch(() => ({}));
  return { ok: true, message: data?.message, result: data };
}
async function sgpCpeSpeedTest(cfg, servicoId) {
  const res = await sgpFetch2(cfg, `/api/cpemanager/servico/${servicoId}/command/speedtest/`, {
    method: "POST",
    signal: AbortSignal.timeout(6e4)
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`SGP CPE SpeedTest ${res.status}: ${txt}`);
  }
  const data = await res.json().catch(() => ({}));
  return { ok: true, message: data?.message, result: data };
}
async function sgpCpeReboot(cfg, servicoId) {
  const res = await sgpFetch2(cfg, `/api/cpemanager/servico/${servicoId}/command/reboot/`, {
    method: "POST",
    signal: AbortSignal.timeout(15e3)
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`SGP CPE Reboot ${res.status}: ${txt}`);
  }
  const data = await res.json().catch(() => ({}));
  return { ok: true, message: data?.message ?? "Reboot enviado com sucesso" };
}
async function sgpCpeGetDetails(cfg, servicoId) {
  const res = await sgpFetch2(cfg, `/api/cpemanager/servico/${servicoId}/infodetail`, {
    signal: AbortSignal.timeout(15e3)
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`SGP CPE Details ${res.status}: ${txt}`);
  }
  return res.json().catch(() => ({}));
}
async function sgpTestConnection(cfg) {
  try {
    const res = await sgpFetch2(cfg, "/api/fttx/splitter/all/", {
      signal: AbortSignal.timeout(8e3)
    });
    return res.ok;
  } catch {
    return false;
  }
}
var init_sgpApi = __esm({
  "server/sgpApi.ts"() {
    "use strict";
    init_db();
    init_schema();
  }
});

// server/genieacsRouter.ts
import { z as z3 } from "zod";
import { eq as eq6 } from "drizzle-orm";
async function getGenieACSConfig() {
  const db = await getDb();
  if (!db) return { url: "http://127.0.0.1:7557", auth: null };
  const rows = await db.select().from(systemSettings).where(eq6(systemSettings.key, "genieacs_url"));
  const urlRow = rows[0];
  const authRows = await db.select().from(systemSettings).where(eq6(systemSettings.key, "genieacs_auth"));
  const authRow = authRows[0];
  const url = urlRow?.value || "http://127.0.0.1:7557";
  const auth = authRow?.value || null;
  return { url, auth };
}
async function genieRequest(path7, method = "GET", body) {
  const { url, auth } = await getGenieACSConfig();
  const headers = {
    "Content-Type": "application/json"
  };
  if (auth) {
    headers["Authorization"] = `Basic ${auth}`;
  }
  const response = await fetch(`${url}${path7}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : void 0,
    signal: AbortSignal.timeout(15e3)
  });
  if (!response.ok) {
    const text4 = await response.text().catch(() => "");
    throw new Error(`GenieACS API error ${response.status}: ${text4}`);
  }
  const text3 = await response.text();
  if (!text3) return null;
  try {
    return JSON.parse(text3);
  } catch {
    return text3;
  }
}
function getParam(device, ...paths) {
  for (const path7 of paths) {
    const parts = path7.split(".");
    let obj = device;
    for (const part of parts) {
      if (!obj || typeof obj !== "object") {
        obj = null;
        break;
      }
      obj = obj[part];
    }
    const val = obj?._value ?? obj?.value ?? obj;
    if (val !== null && val !== void 0 && val !== "") {
      return String(val);
    }
  }
  return null;
}
function normalizeDevice(device) {
  const id = device._id;
  const rxPower = getParam(
    device,
    "InternetGatewayDevice.WANDevice.1.X_GponInterafceConfig.RXPower",
    "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPONLinkConfig.RXPower",
    "Device.Optical.Interface.1.CurrentReceivePower",
    "InternetGatewayDevice.X_CT-COM_GponInterfaceConfig.RXPower"
  );
  const wanIp = getParam(
    device,
    "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANIPConnection.1.ExternalIPAddress",
    "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.ExternalIPAddress",
    "Device.IP.Interface.1.IPv4Address.1.IPAddress"
  );
  const ssid24 = getParam(
    device,
    "InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.SSID",
    "Device.WiFi.SSID.1.SSID"
  );
  const uptime = getParam(
    device,
    "InternetGatewayDevice.DeviceInfo.UpTime",
    "Device.DeviceInfo.UpTime"
  );
  const manufacturer = getParam(
    device,
    "InternetGatewayDevice.DeviceInfo.Manufacturer",
    "Device.DeviceInfo.Manufacturer"
  );
  const modelName = getParam(
    device,
    "InternetGatewayDevice.DeviceInfo.ModelName",
    "Device.DeviceInfo.ModelName",
    "InternetGatewayDevice.DeviceInfo.ProductClass"
  );
  const softwareVersion = getParam(
    device,
    "InternetGatewayDevice.DeviceInfo.SoftwareVersion",
    "Device.DeviceInfo.SoftwareVersion"
  );
  const macAddress = getParam(
    device,
    "InternetGatewayDevice.LANDevice.1.LANEthernetInterfaceConfig.1.MACAddress",
    "Device.Ethernet.Interface.1.MACAddress"
  );
  const lastInform = device._lastInform?._value || device._lastInform || null;
  const isOnline = lastInform ? Date.now() - new Date(lastInform).getTime() < 5 * 60 * 1e3 : false;
  return {
    id,
    manufacturer: manufacturer || "Desconhecido",
    modelName: modelName || "Desconhecido",
    softwareVersion: softwareVersion || null,
    macAddress: macAddress || null,
    wanIp: wanIp || null,
    ssid24: ssid24 || null,
    rxPower: rxPower ? parseFloat(rxPower) : null,
    uptime: uptime ? parseInt(uptime) : null,
    lastInform: lastInform ? new Date(lastInform).getTime() : null,
    isOnline
  };
}
var genieacsRouter;
var init_genieacsRouter = __esm({
  "server/genieacsRouter.ts"() {
    "use strict";
    init_trpc();
    init_db();
    init_schema();
    init_sgpApi();
    genieacsRouter = router({
      // Obter configuração GenieACS actual
      getConfig: protectedProcedure.query(async () => {
        const db = await getDb();
        if (!db) return { url: "http://127.0.0.1:7557", username: "", hasPassword: false };
        const rows = await db.select().from(systemSettings);
        const config = {};
        for (const row of rows) {
          if (row.key.startsWith("genieacs_")) {
            config[row.key] = row.value || "";
          }
        }
        return {
          url: config["genieacs_url"] || "http://127.0.0.1:7557",
          username: config["genieacs_username"] || "",
          hasPassword: !!config["genieacs_auth"]
        };
      }),
      // Guardar configuração GenieACS
      saveConfig: protectedProcedure.input(z3.object({
        url: z3.string().url("URL inv\xE1lido"),
        username: z3.string().optional(),
        password: z3.string().optional()
      })).mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Base de dados n\xE3o dispon\xEDvel");
        await db.insert(systemSettings).values({ key: "genieacs_url", value: input.url }).onDuplicateKeyUpdate({ set: { value: input.url } });
        if (input.username !== void 0) {
          await db.insert(systemSettings).values({ key: "genieacs_username", value: input.username }).onDuplicateKeyUpdate({ set: { value: input.username } });
        }
        if (input.username && input.password) {
          const auth = Buffer.from(`${input.username}:${input.password}`).toString("base64");
          await db.insert(systemSettings).values({ key: "genieacs_auth", value: auth }).onDuplicateKeyUpdate({ set: { value: auth } });
        } else if (input.username === "" && input.password === "") {
          await db.insert(systemSettings).values({ key: "genieacs_auth", value: "" }).onDuplicateKeyUpdate({ set: { value: "" } });
        }
        return { success: true };
      }),
      // Testar conexão com GenieACS
      testConnection: protectedProcedure.mutation(async () => {
        try {
          await genieRequest("/devices?limit=1");
          return { success: true, message: "Conex\xE3o com GenieACS estabelecida com sucesso" };
        } catch (err) {
          return { success: false, message: err.message || "Falha na conex\xE3o" };
        }
      }),
      // Listar todos os dispositivos (ONTs) no GenieACS
      listDevices: protectedProcedure.input(z3.object({
        search: z3.string().optional(),
        onlineOnly: z3.boolean().optional(),
        limit: z3.number().min(1).max(500).default(100),
        skip: z3.number().min(0).default(0)
      })).query(async ({ input }) => {
        try {
          const projection = [
            "_id",
            "_lastInform",
            "InternetGatewayDevice.DeviceInfo.Manufacturer",
            "InternetGatewayDevice.DeviceInfo.ModelName",
            "InternetGatewayDevice.DeviceInfo.ProductClass",
            "InternetGatewayDevice.DeviceInfo.SoftwareVersion",
            "InternetGatewayDevice.DeviceInfo.UpTime",
            "InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.SSID",
            "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANIPConnection.1.ExternalIPAddress",
            "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.ExternalIPAddress",
            "InternetGatewayDevice.WANDevice.1.X_GponInterafceConfig.RXPower",
            "InternetGatewayDevice.LANDevice.1.LANEthernetInterfaceConfig.1.MACAddress",
            "Device.DeviceInfo.Manufacturer",
            "Device.DeviceInfo.ModelName",
            "Device.DeviceInfo.SoftwareVersion",
            "Device.DeviceInfo.UpTime",
            "Device.WiFi.SSID.1.SSID"
          ].join(",");
          let query = "";
          if (input.search) {
            const escaped = encodeURIComponent(JSON.stringify({
              "_id": { "$regex": input.search, "$options": "i" }
            }));
            query = `&query=${escaped}`;
          }
          const devices = await genieRequest(
            `/devices?projection=${encodeURIComponent(projection)}&limit=${input.limit}&skip=${input.skip}${query}`
          );
          if (!Array.isArray(devices)) return { devices: [], total: 0 };
          let normalized = devices.map(normalizeDevice);
          if (input.onlineOnly) {
            normalized = normalized.filter((d) => d.isOnline);
          }
          return { devices: normalized, total: normalized.length };
        } catch (err) {
          throw new Error(`Erro ao listar dispositivos: ${err.message}`);
        }
      }),
      // Obter detalhes completos de um dispositivo
      getDevice: protectedProcedure.input(z3.object({ deviceId: z3.string() })).query(async ({ input }) => {
        try {
          const encoded = encodeURIComponent(input.deviceId);
          const devices = await genieRequest(`/devices/${encoded}`);
          const device = Array.isArray(devices) ? devices[0] : devices;
          if (!device) throw new Error("Dispositivo n\xE3o encontrado");
          const normalized = normalizeDevice(device);
          const ssid5 = getParam(
            device,
            "InternetGatewayDevice.LANDevice.1.WLANConfiguration.5.SSID",
            "InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.SSID",
            "Device.WiFi.SSID.2.SSID"
          );
          const assocDevices = [];
          try {
            const lanDevice = device?.["InternetGatewayDevice"]?.["LANDevice"]?.["1"];
            const wlanConfig = lanDevice?.["WLANConfiguration"]?.["1"];
            const assocList = wlanConfig?.["AssociatedDevice"];
            if (assocList && typeof assocList === "object") {
              for (const [key, val] of Object.entries(assocList)) {
                if (key === "_object" || key === "_timestamp") continue;
                const entry = val;
                const mac = entry?.["AssociatedDeviceMACAddress"]?._value;
                if (mac) {
                  assocDevices.push({
                    mac,
                    signal: entry?.["X_TP_SignalStrength"]?._value || entry?.["SignalStrength"]?._value || void 0
                  });
                }
              }
            }
          } catch {
          }
          return {
            ...normalized,
            ssid5: ssid5 || null,
            connectedDevices: assocDevices
          };
        } catch (err) {
          throw new Error(`Erro ao obter dispositivo: ${err.message}`);
        }
      }),
      // Alterar Wi-Fi (SSID + senha)
      setWifi: protectedProcedure.input(z3.object({
        deviceId: z3.string(),
        ssid: z3.string().min(1).max(32).optional(),
        password: z3.string().min(8).max(63).optional(),
        band: z3.enum(["2.4", "5", "both"]).default("2.4")
      })).mutation(async ({ input }) => {
        const parameterValues = [];
        const bands = input.band === "both" ? [1, 5] : input.band === "5" ? [5] : [1];
        for (const idx of bands) {
          const base = `InternetGatewayDevice.LANDevice.1.WLANConfiguration.${idx}`;
          if (input.ssid) {
            parameterValues.push([`${base}.SSID`, input.ssid, "xsd:string"]);
          }
          if (input.password) {
            parameterValues.push([`${base}.PreSharedKey.1.PreSharedKey`, input.password, "xsd:string"]);
            parameterValues.push([`${base}.KeyPassphrase`, input.password, "xsd:string"]);
          }
        }
        if (parameterValues.length === 0) {
          throw new Error("Nenhum par\xE2metro para alterar");
        }
        const encoded = encodeURIComponent(input.deviceId);
        await genieRequest(
          `/devices/${encoded}/tasks?connection_request`,
          "POST",
          { name: "setParameterValues", parameterValues }
        );
        return { success: true, message: "Configura\xE7\xE3o Wi-Fi enviada para a ONT" };
      }),
      // Reiniciar ONT
      reboot: protectedProcedure.input(z3.object({ deviceId: z3.string() })).mutation(async ({ input }) => {
        const encoded = encodeURIComponent(input.deviceId);
        await genieRequest(
          `/devices/${encoded}/tasks?connection_request`,
          "POST",
          { name: "reboot" }
        );
        return { success: true, message: "Comando de reinicializa\xE7\xE3o enviado para a ONT" };
      }),
      // Repor configuração de fábrica
      factoryReset: protectedProcedure.input(z3.object({ deviceId: z3.string() })).mutation(async ({ input }) => {
        const encoded = encodeURIComponent(input.deviceId);
        await genieRequest(
          `/devices/${encoded}/tasks?connection_request`,
          "POST",
          { name: "factoryReset" }
        );
        return { success: true, message: "Reset de f\xE1brica enviado para a ONT" };
      }),
      // Diagnóstico de ping da ONT para um IP
      ping: protectedProcedure.input(z3.object({
        deviceId: z3.string(),
        host: z3.string().default("8.8.8.8"),
        count: z3.number().min(1).max(10).default(4)
      })).mutation(async ({ input }) => {
        const encoded = encodeURIComponent(input.deviceId);
        await genieRequest(
          `/devices/${encoded}/tasks?connection_request`,
          "POST",
          {
            name: "setParameterValues",
            parameterValues: [
              ["InternetGatewayDevice.IPPingDiagnostics.Host", input.host, "xsd:string"],
              ["InternetGatewayDevice.IPPingDiagnostics.NumberOfRepetitions", String(input.count), "xsd:unsignedInt"],
              ["InternetGatewayDevice.IPPingDiagnostics.DiagnosticsState", "Requested", "xsd:string"]
            ]
          }
        );
        await new Promise((r) => setTimeout(r, 3e3));
        try {
          const devices = await genieRequest(
            `/devices/${encoded}?projection=${encodeURIComponent(
              "InternetGatewayDevice.IPPingDiagnostics"
            )}`
          );
          const device = Array.isArray(devices) ? devices[0] : devices;
          const diag = device?.["InternetGatewayDevice"]?.["IPPingDiagnostics"];
          return {
            success: true,
            host: input.host,
            successCount: parseInt(diag?.["SuccessCount"]?._value || "0"),
            failureCount: parseInt(diag?.["FailureCount"]?._value || "0"),
            avgResponseTime: parseInt(diag?.["AverageResponseTime"]?._value || "0"),
            minResponseTime: parseInt(diag?.["MinimumResponseTime"]?._value || "0"),
            maxResponseTime: parseInt(diag?.["MaximumResponseTime"]?._value || "0"),
            state: diag?.["DiagnosticsState"]?._value || "Unknown"
          };
        } catch {
          return {
            success: true,
            host: input.host,
            message: "Diagn\xF3stico iniciado \u2014 aguarde o pr\xF3ximo inform da ONT para ver resultados"
          };
        }
      }),
      // Configurar ONT automaticamente via SGP (PPPoE + Wi-Fi)
      configureOnt: protectedProcedure.input(z3.object({
        deviceId: z3.string(),
        // ID do dispositivo no GenieACS (serial)
        sgpOnuId: z3.number().optional(),
        // ID da ONU no SGP (se já conhecido)
        serial: z3.string().optional(),
        // Serial da ONU para busca no SGP
        // Campos manuais (sobrepõem os do SGP)
        pppoeLogin: z3.string().optional(),
        pppoePassword: z3.string().optional(),
        wifiSsid: z3.string().optional(),
        wifiPassword: z3.string().optional(),
        wifiSsid5: z3.string().optional(),
        wifiPassword5: z3.string().optional(),
        // Opções de configuração
        configurePppoe: z3.boolean().default(true),
        configureWifi: z3.boolean().default(true),
        useGenieacs: z3.boolean().default(true)
        // true = via TR-069, false = via SGP API
      })).mutation(async ({ input }) => {
        const results = [];
        const errors = [];
        let sgpOnu = null;
        let pppoeLogin = input.pppoeLogin || "";
        let pppoePassword = input.pppoePassword || "";
        let wifiSsid = input.wifiSsid || "";
        let wifiPassword = input.wifiPassword || "";
        let wifiSsid5 = input.wifiSsid5 || "";
        let wifiPassword5 = input.wifiPassword5 || "";
        try {
          const sgpCfg = await getSgpConfig2();
          if (sgpCfg) {
            if (input.sgpOnuId) {
              sgpOnu = await sgpGetOnuDetail(sgpCfg, input.sgpOnuId);
            } else {
              const serial = input.serial || input.deviceId.split("-").slice(2).join("-") || input.deviceId;
              sgpOnu = await sgpGetOnuBySerial(sgpCfg, serial);
            }
            if (sgpOnu) {
              if (!pppoeLogin && sgpOnu.onu_login) pppoeLogin = sgpOnu.onu_login;
              if (!pppoePassword && sgpOnu.onu_password) pppoePassword = sgpOnu.onu_password;
              if (!wifiSsid && sgpOnu.wifi_ssid) wifiSsid = sgpOnu.wifi_ssid;
              if (!wifiPassword && sgpOnu.wifi_password) wifiPassword = sgpOnu.wifi_password;
              if (!wifiSsid5 && sgpOnu.wifi_ssid5) wifiSsid5 = sgpOnu.wifi_ssid5;
              if (!wifiPassword5 && sgpOnu.wifi_password5) wifiPassword5 = sgpOnu.wifi_password5;
              results.push(`ONU encontrada no SGP: ID ${sgpOnu.id} (${sgpOnu.onu_login || "sem login"})`);
            } else {
              results.push("ONU n\xE3o encontrada no SGP \u2014 usando par\xE2metros manuais");
            }
          } else {
            results.push("SGP n\xE3o configurado \u2014 usando par\xE2metros manuais");
          }
        } catch (err) {
          errors.push(`Erro ao consultar SGP: ${err.message}`);
        }
        if (input.configurePppoe && pppoeLogin) {
          if (input.useGenieacs) {
            try {
              const encoded = encodeURIComponent(input.deviceId);
              const parameterValues = [];
              const pppoeBasePaths = [
                "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1"
              ];
              for (const base of pppoeBasePaths) {
                parameterValues.push([`${base}.Username`, pppoeLogin, "xsd:string"]);
                if (pppoePassword) {
                  parameterValues.push([`${base}.Password`, pppoePassword, "xsd:string"]);
                }
                parameterValues.push([`${base}.Enable`, "true", "xsd:boolean"]);
                parameterValues.push([`${base}.ConnectionType`, "IP_Routed", "xsd:string"]);
              }
              await genieRequest(
                `/devices/${encoded}/tasks?connection_request`,
                "POST",
                { name: "setParameterValues", parameterValues }
              );
              results.push(`PPPoE configurado via TR-069: ${pppoeLogin}`);
            } catch (err) {
              errors.push(`Erro ao configurar PPPoE via GenieACS: ${err.message}`);
            }
          } else if (sgpOnu) {
            try {
              const sgpCfg = await getSgpConfig2();
              if (sgpCfg) {
                await sgpConfigureOnuWan(sgpCfg, sgpOnu.id, {
                  onu_login: pppoeLogin,
                  onu_password: pppoePassword
                });
                results.push(`PPPoE configurado via SGP: ${pppoeLogin}`);
              }
            } catch (err) {
              errors.push(`Erro ao configurar PPPoE via SGP: ${err.message}`);
            }
          }
        } else if (input.configurePppoe && !pppoeLogin) {
          errors.push("Login PPPoE n\xE3o dispon\xEDvel \u2014 verifique o cadastro no SGP");
        }
        if (input.configureWifi && (wifiSsid || wifiPassword)) {
          if (input.useGenieacs) {
            try {
              const parameterValues = [];
              const encoded = encodeURIComponent(input.deviceId);
              if (wifiSsid) {
                parameterValues.push(["InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.SSID", wifiSsid, "xsd:string"]);
              }
              if (wifiPassword) {
                parameterValues.push(["InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.PreSharedKey.1.PreSharedKey", wifiPassword, "xsd:string"]);
                parameterValues.push(["InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.KeyPassphrase", wifiPassword, "xsd:string"]);
              }
              if (wifiSsid5) {
                parameterValues.push(["InternetGatewayDevice.LANDevice.1.WLANConfiguration.5.SSID", wifiSsid5, "xsd:string"]);
              }
              if (wifiPassword5) {
                parameterValues.push(["InternetGatewayDevice.LANDevice.1.WLANConfiguration.5.PreSharedKey.1.PreSharedKey", wifiPassword5, "xsd:string"]);
                parameterValues.push(["InternetGatewayDevice.LANDevice.1.WLANConfiguration.5.KeyPassphrase", wifiPassword5, "xsd:string"]);
              }
              if (parameterValues.length > 0) {
                await genieRequest(
                  `/devices/${encodeURIComponent(input.deviceId)}/tasks?connection_request`,
                  "POST",
                  { name: "setParameterValues", parameterValues }
                );
                results.push(`Wi-Fi configurado via TR-069: ${wifiSsid || "(sem SSID)"}`);
              }
            } catch (err) {
              errors.push(`Erro ao configurar Wi-Fi via GenieACS: ${err.message}`);
            }
          } else if (sgpOnu) {
            try {
              const sgpCfg = await getSgpConfig2();
              if (sgpCfg) {
                await sgpConfigureOnuWifi(sgpCfg, sgpOnu.id, {
                  wifi_ssid: wifiSsid || void 0,
                  wifi_password: wifiPassword || void 0,
                  wifi_ssid5: wifiSsid5 || void 0,
                  wifi_password5: wifiPassword5 || void 0
                });
                results.push(`Wi-Fi configurado via SGP: ${wifiSsid || "(sem SSID)"}`);
              }
            } catch (err) {
              errors.push(`Erro ao configurar Wi-Fi via SGP: ${err.message}`);
            }
          }
        }
        return {
          success: errors.length === 0,
          results,
          errors,
          sgpData: sgpOnu ? {
            id: sgpOnu.id,
            pppoeLogin: sgpOnu.onu_login || null,
            hasPppoePassword: !!sgpOnu.onu_password,
            wifiSsid: sgpOnu.wifi_ssid || null,
            wifiSsid5: sgpOnu.wifi_ssid5 || null
          } : null
        };
      }),
      // Buscar dados da ONU no SGP pelo serial/deviceId
      getOnuFromSgp: protectedProcedure.input(z3.object({
        deviceId: z3.string(),
        serial: z3.string().optional()
      })).query(async ({ input }) => {
        try {
          const sgpCfg = await getSgpConfig2();
          if (!sgpCfg) return { found: false, data: null, message: "SGP n\xE3o configurado" };
          const serial = input.serial || input.deviceId.split("-").slice(2).join("-") || input.deviceId;
          const onu = await sgpGetOnuBySerial(sgpCfg, serial);
          if (!onu) return { found: false, data: null, message: "ONU n\xE3o encontrada no SGP" };
          return {
            found: true,
            data: {
              id: onu.id,
              servicoId: onu.servico || null,
              pppoeLogin: onu.onu_login || null,
              hasPppoePassword: !!onu.onu_password,
              wifiSsid: onu.wifi_ssid || null,
              wifiSsid5: onu.wifi_ssid5 || null,
              address: onu.address || null,
              vlan: onu.vlan || null,
              olt: onu.olt_name || null,
              slot: onu.slot,
              pon: onu.pon
            },
            message: "ONU encontrada"
          };
        } catch (err) {
          return { found: false, data: null, message: err.message };
        }
      }),
      // ─── Gerenciador CPE do SGP (envia comandos para a ONT via SGP → GenieACS) ───
      /** Configurar PPPoE na ONT via Gerenciador CPE do SGP */
      sgpCpePppoe: protectedProcedure.input(z3.object({ servicoId: z3.number() })).mutation(async ({ input }) => {
        const { getSgpConfig: getCfg, sgpCpeConfigurePppoe: sgpCpeConfigurePppoe2 } = await Promise.resolve().then(() => (init_sgpApi(), sgpApi_exports));
        const cfg = await getCfg();
        if (!cfg) throw new Error("SGP n\xE3o configurado");
        return sgpCpeConfigurePppoe2(cfg, input.servicoId);
      }),
      /** Definir Wi-Fi na ONT via Gerenciador CPE do SGP */
      sgpCpeWifi: protectedProcedure.input(z3.object({ servicoId: z3.number() })).mutation(async ({ input }) => {
        const { getSgpConfig: getCfg, sgpCpeSetWifi: sgpCpeSetWifi2 } = await Promise.resolve().then(() => (init_sgpApi(), sgpApi_exports));
        const cfg = await getCfg();
        if (!cfg) throw new Error("SGP n\xE3o configurado");
        return sgpCpeSetWifi2(cfg, input.servicoId);
      }),
      /** Importar Wi-Fi da ONT para o SGP */
      sgpCpeImportWifi: protectedProcedure.input(z3.object({ servicoId: z3.number() })).mutation(async ({ input }) => {
        const { getSgpConfig: getCfg, sgpCpeImportWifi: sgpCpeImportWifi2 } = await Promise.resolve().then(() => (init_sgpApi(), sgpApi_exports));
        const cfg = await getCfg();
        if (!cfg) throw new Error("SGP n\xE3o configurado");
        return sgpCpeImportWifi2(cfg, input.servicoId);
      }),
      /** Sincronizar WAN da ONT via Gerenciador CPE do SGP */
      sgpCpeSyncWan: protectedProcedure.input(z3.object({ servicoId: z3.number() })).mutation(async ({ input }) => {
        const { getSgpConfig: getCfg, sgpCpeSyncWan: sgpCpeSyncWan2 } = await Promise.resolve().then(() => (init_sgpApi(), sgpApi_exports));
        const cfg = await getCfg();
        if (!cfg) throw new Error("SGP n\xE3o configurado");
        return sgpCpeSyncWan2(cfg, input.servicoId);
      }),
      /** Ping via Gerenciador CPE do SGP */
      sgpCpePing: protectedProcedure.input(z3.object({ servicoId: z3.number() })).mutation(async ({ input }) => {
        const { getSgpConfig: getCfg, sgpCpePing: sgpCpePing2 } = await Promise.resolve().then(() => (init_sgpApi(), sgpApi_exports));
        const cfg = await getCfg();
        if (!cfg) throw new Error("SGP n\xE3o configurado");
        return sgpCpePing2(cfg, input.servicoId);
      }),
      /** SpeedTest via Gerenciador CPE do SGP */
      sgpCpeSpeedTest: protectedProcedure.input(z3.object({ servicoId: z3.number() })).mutation(async ({ input }) => {
        const { getSgpConfig: getCfg, sgpCpeSpeedTest: sgpCpeSpeedTest2 } = await Promise.resolve().then(() => (init_sgpApi(), sgpApi_exports));
        const cfg = await getCfg();
        if (!cfg) throw new Error("SGP n\xE3o configurado");
        return sgpCpeSpeedTest2(cfg, input.servicoId);
      }),
      /** Reboot da ONT via Gerenciador CPE do SGP */
      sgpCpeReboot: protectedProcedure.input(z3.object({ servicoId: z3.number() })).mutation(async ({ input }) => {
        const { getSgpConfig: getCfg, sgpCpeReboot: sgpCpeReboot2 } = await Promise.resolve().then(() => (init_sgpApi(), sgpApi_exports));
        const cfg = await getCfg();
        if (!cfg) throw new Error("SGP n\xE3o configurado");
        return sgpCpeReboot2(cfg, input.servicoId);
      }),
      /** Detalhes da ONT via Gerenciador CPE do SGP */
      sgpCpeDetails: protectedProcedure.input(z3.object({ servicoId: z3.number() })).query(async ({ input }) => {
        const { getSgpConfig: getCfg, sgpCpeGetDetails: sgpCpeGetDetails2 } = await Promise.resolve().then(() => (init_sgpApi(), sgpApi_exports));
        const cfg = await getCfg();
        if (!cfg) throw new Error("SGP n\xE3o configurado");
        return sgpCpeGetDetails2(cfg, input.servicoId);
      }),
      // Buscar deviceId do GenieACS pelo serial da ONU
      findDeviceBySerial: protectedProcedure.input(z3.object({
        serial: z3.string().min(1)
      })).query(async ({ input }) => {
        try {
          const queryById = encodeURIComponent(JSON.stringify({
            "_id": { "$regex": input.serial, "$options": "i" }
          }));
          const byId = await genieRequest(`/devices?query=${queryById}&limit=5`);
          if (Array.isArray(byId) && byId.length > 0) {
            return { found: true, deviceId: byId[0]._id, device: normalizeDevice(byId[0]) };
          }
          const queryBySerial = encodeURIComponent(JSON.stringify({
            "_deviceId._SerialNumber": { "$regex": input.serial, "$options": "i" }
          }));
          const bySerial = await genieRequest(`/devices?query=${queryBySerial}&limit=5`);
          if (Array.isArray(bySerial) && bySerial.length > 0) {
            return { found: true, deviceId: bySerial[0]._id, device: normalizeDevice(bySerial[0]) };
          }
          return { found: false, deviceId: null, device: null };
        } catch (err) {
          return { found: false, deviceId: null, device: null, error: err.message };
        }
      }),
      // Forçar actualização de parâmetros (refresh)
      refreshDevice: protectedProcedure.input(z3.object({ deviceId: z3.string() })).mutation(async ({ input }) => {
        const encoded = encodeURIComponent(input.deviceId);
        await genieRequest(
          `/devices/${encoded}/tasks?connection_request`,
          "POST",
          {
            name: "getParameterValues",
            parameterNames: [
              "InternetGatewayDevice.DeviceInfo.",
              "InternetGatewayDevice.WANDevice.1.",
              "InternetGatewayDevice.LANDevice.1.WLANConfiguration.1."
            ]
          }
        );
        return { success: true, message: "Actualiza\xE7\xE3o de par\xE2metros solicitada" };
      })
    });
  }
});

// server/ssh.ts
var ssh_exports = {};
__export(ssh_exports, {
  applyParams: () => applyParams,
  decryptPassword: () => decryptPassword,
  encryptPassword: () => encryptPassword,
  executeSshCommand: () => executeSshCommand,
  extractParams: () => extractParams,
  getActiveSession: () => getActiveSession,
  getRecentExecutionLog: () => getRecentExecutionLog,
  getSshCommandsByEquipment: () => getSshCommandsByEquipment,
  getSshCredential: () => getSshCredential,
  respondToConfirm: () => respondToConfirm,
  upsertSshCredential: () => upsertSshCredential
});
import { createDecipheriv } from "crypto";
import { Client as SshClient } from "ssh2";
import { eq as eq9 } from "drizzle-orm";
function encryptPassword(plain) {
  return "b64:" + Buffer.from(plain, "utf8").toString("base64");
}
function decryptPassword(enc) {
  if (enc.startsWith("b64:")) {
    return Buffer.from(enc.slice(4), "base64").toString("utf8");
  }
  const parts = enc.split(":");
  if (parts.length === 3) {
    const [ivHex, tagHex, dataHex] = parts;
    const iv = Buffer.from(ivHex, "hex");
    const tag = Buffer.from(tagHex, "hex");
    const data = Buffer.from(dataHex, "hex");
    const candidateKeys = [];
    const jwtKey = process.env.JWT_SECRET ?? "fiberdoc-ssh-default-key-32bytes!";
    const k1 = Buffer.alloc(32, 0);
    Buffer.from(jwtKey).copy(k1);
    candidateKeys.push(k1);
    const k2 = Buffer.alloc(32, 0);
    Buffer.from("fiberdoc-ssh-default-key-32bytes!").copy(k2);
    candidateKeys.push(k2);
    for (const key of candidateKeys) {
      try {
        const decipher = createDecipheriv("aes-256-gcm", key, iv);
        decipher.setAuthTag(tag);
        return decipher.update(data).toString("utf8") + decipher.final("utf8");
      } catch {
      }
    }
  }
  throw new Error("N\xE3o foi poss\xEDvel desencriptar as credenciais. Por favor re-introduza a password SSH no cadastro do equipamento.");
}
function extractParams(lines) {
  const set = /* @__PURE__ */ new Set();
  for (const line of lines) {
    const re = /\{([^}]+)\}/g;
    let m;
    while ((m = re.exec(line)) !== null) set.add(m[1]);
  }
  return Array.from(set);
}
function applyParams(lines, params) {
  return lines.map(
    (line) => line.replace(/\{([^}]+)\}/g, (_, key) => params[key] ?? `{${key}}`)
  );
}
function stripAnsi(text3) {
  return text3.replace(/\x1b\[[0-9;]*[mGKJHABCDEFPSTfhilnpqrsu]/g, "").replace(/\x1b[()][A-Z0-9]/g, "").replace(/\x1b[=>]/g, "").replace(/\x1b\[\?[0-9;]*[hlr]/g, "").replace(/\x1b\[[0-9;]*[A-Za-z]/g, "").replace(/\x1b./g, "");
}
function detectsConfirmPrompt(text3) {
  return CONFIRM_PATTERNS.some((p) => p.test(text3));
}
function getActiveSession(sessionId) {
  return activeSessions.get(sessionId);
}
function respondToConfirm(sessionId, answer) {
  const session = activeSessions.get(sessionId);
  if (!session) return false;
  session.stream.write(answer + "\n");
  if (session.sseRes) {
    sendSseEvent(session.sseRes, { type: "input", data: answer });
  }
  return true;
}
function sendSseEvent(res, data) {
  try {
    res.write(`data: ${JSON.stringify(data)}

`);
  } catch {
  }
}
async function executeSshCommand(host, port, username, password, lines, sleepMs, confirmMode = "none", sessionId, sseRes) {
  return new Promise((resolve) => {
    const conn = new SshClient();
    let output = "";
    let timedOut = false;
    let waitingForConfirm = false;
    const timeout = setTimeout(() => {
      timedOut = true;
      if (sessionId) activeSessions.delete(sessionId);
      conn.end();
      resolve({ output: output + "\n[TIMEOUT: conex\xE3o encerrada ap\xF3s 30s]", success: false });
    }, 3e4);
    conn.on("ready", () => {
      conn.shell((err, stream) => {
        if (err) {
          clearTimeout(timeout);
          conn.end();
          resolve({ output: `[ERRO ao abrir shell: ${err.message}]`, success: false });
          return;
        }
        if (sessionId) {
          activeSessions.set(sessionId, { stream, outputSoFar: "", resolve, conn, sseRes });
        }
        stream.on("data", (data) => {
          const chunk = data.toString();
          output += chunk;
          if (sessionId) {
            const sess = activeSessions.get(sessionId);
            if (sess) sess.outputSoFar = output;
          }
          if (sseRes) {
            const clean = stripAnsi(chunk);
            if (clean.length > 0) {
              sendSseEvent(sseRes, { type: "output", data: clean });
            }
          }
          if (/----\s*[Mm]ore\s*----/.test(chunk)) {
            setTimeout(() => stream.write(" "), 100);
          }
          if (detectsConfirmPrompt(chunk)) {
            if (confirmMode === "auto_y") {
              setTimeout(() => stream.write("Y\n"), 100);
            } else if (confirmMode === "auto_n") {
              setTimeout(() => stream.write("N\n"), 100);
            } else if (confirmMode === "manual") {
              waitingForConfirm = true;
              if (sseRes) {
                sendSseEvent(sseRes, { type: "confirm_required", data: chunk });
              }
              return;
            }
          }
        });
        stream.stderr.on("data", (data) => {
          const chunk = data.toString();
          output += chunk;
          if (sseRes) {
            const clean = stripAnsi(chunk);
            if (clean.length > 0) {
              sendSseEvent(sseRes, { type: "output", data: clean });
            }
          }
        });
        stream.on("close", () => {
          clearTimeout(timeout);
          if (sessionId) activeSessions.delete(sessionId);
          conn.end();
          if (!timedOut && !waitingForConfirm) {
            if (sseRes) {
              sendSseEvent(sseRes, { type: "done", success: true, output });
              sseRes.end();
            }
            resolve({ output, success: true });
          }
        });
        (async () => {
          for (const line of lines) {
            stream.write(line + "\n");
            await new Promise((r) => setTimeout(r, sleepMs));
          }
          await new Promise((r) => setTimeout(r, Math.max(sleepMs * 3, 3e3)));
          stream.end();
        })();
      });
    });
    conn.on("error", (err) => {
      clearTimeout(timeout);
      if (sessionId) activeSessions.delete(sessionId);
      if (sseRes) {
        sendSseEvent(sseRes, { type: "error", data: err.message });
        sseRes.end();
      }
      resolve({ output: `[ERRO SSH: ${err.message}]`, success: false });
    });
    conn.connect({ host, port, username, password, readyTimeout: 1e4 });
  });
}
async function getSshCredential(equipmentId) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(sshCredentials).where(eq9(sshCredentials.equipmentId, equipmentId));
  return rows[0] ?? null;
}
async function upsertSshCredential(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const enc = encryptPassword(data.sshPassword);
  const existing = await getSshCredential(data.equipmentId);
  if (existing) {
    await db.update(sshCredentials).set({ sshUser: data.sshUser, sshPasswordEnc: enc, sshPort: data.sshPort, notes: data.notes ?? null }).where(eq9(sshCredentials.equipmentId, data.equipmentId));
  } else {
    await db.insert(sshCredentials).values({
      equipmentId: data.equipmentId,
      sshUser: data.sshUser,
      sshPasswordEnc: enc,
      sshPort: data.sshPort,
      notes: data.notes ?? null
    });
  }
}
async function getSshCommandsByEquipment(equipmentId) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(sshCommands).where(eq9(sshCommands.equipmentId, equipmentId));
}
async function getRecentExecutionLog(equipmentId, limit = 20) {
  const db = await getDb();
  if (!db) return [];
  const { desc: desc4 } = await import("drizzle-orm");
  return db.select().from(sshExecutionLog).where(eq9(sshExecutionLog.equipmentId, equipmentId)).orderBy(desc4(sshExecutionLog.executedAt)).limit(limit);
}
var CONFIRM_PATTERNS, activeSessions;
var init_ssh = __esm({
  "server/ssh.ts"() {
    "use strict";
    init_db();
    init_schema();
    CONFIRM_PATTERNS = [
      /\[Y\/N\]/i,
      /\[y\/n\]/,
      /\(yes\/no\)/i,
      /Are you sure\?/i,
      /Confirm\?/i,
      /\[confirm\]/i,
      /Press Y to confirm/i,
      /\[Y\]es\/\[N\]o/i
    ];
    activeSessions = /* @__PURE__ */ new Map();
  }
});

// server/_core/serve-static.ts
import express from "express";
import fs4 from "fs";
import path3 from "path";
function serveStatic(app) {
  const distPath = process.env.NODE_ENV === "development" ? path3.resolve(import.meta.dirname, "../..", "dist", "public") : path3.resolve(import.meta.dirname, "public");
  if (!fs4.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app.use(express.static(distPath));
  app.use((_req, res) => {
    res.sendFile(path3.resolve(distPath, "index.html"));
  });
}
var init_serve_static = __esm({
  "server/_core/serve-static.ts"() {
    "use strict";
  }
});

// server/webhookHandler.ts
var webhookHandler_exports = {};
__export(webhookHandler_exports, {
  handleSgpWebhook: () => handleSgpWebhook,
  syncOnuFromWebhook: () => syncOnuFromWebhook,
  validateWebhookSignature: () => validateWebhookSignature
});
import crypto2 from "crypto";
import { eq as eq13 } from "drizzle-orm";
async function validateWebhookSignature(payload, signature) {
  try {
    const db = await getDb();
    if (!db) return false;
    const rows = await db.select().from(systemSettings).where(eq13(systemSettings.key, "sgp_webhook_secret"));
    if (rows.length === 0) {
      console.warn("[Webhook] Nenhum secret configurado \u2014 valida\xE7\xE3o desabilitada");
      return true;
    }
    const secret = rows[0].value ?? "";
    if (!secret) return true;
    const hash2 = crypto2.createHmac("sha256", secret).update(payload).digest("hex");
    return hash2 === signature;
  } catch (err) {
    console.error("[Webhook] Erro ao validar assinatura:", err);
    return false;
  }
}
async function syncOnuFromWebhook(serial, retryCount = 0) {
  const maxRetries = 3;
  const baseDelay = 1e3;
  try {
    console.log(`[Webhook] Sincronizando ONU: ${serial} (tentativa ${retryCount + 1})`);
    const sgpCfg = await getSgpConfig2();
    if (!sgpCfg) {
      throw new Error("SGP n\xE3o configurado");
    }
    const onu = await sgpGetOnuBySerial(sgpCfg, serial);
    if (!onu) {
      throw new Error(`ONU n\xE3o encontrada no SGP: ${serial}`);
    }
    const pppoeLogin = onu.onu_login || onu.login;
    const pppoePassword = onu.onu_password;
    const wifiSsid = onu.wifi_ssid;
    const wifiPassword = onu.wifi_password;
    const wifiSsid5 = onu.wifi_ssid5;
    const wifiPassword5 = onu.wifi_password5;
    if (!pppoeLogin || !pppoePassword) {
      throw new Error("Dados PPPoE incompletos no SGP");
    }
    const devices = await genieRequest(
      `/devices?query=${encodeURIComponent(
        JSON.stringify({ "_id": { "$regex": serial } })
      )}`
    );
    if (!Array.isArray(devices) || devices.length === 0) {
      throw new Error(`ONU n\xE3o encontrada no GenieACS: ${serial}`);
    }
    const deviceId = devices[0]._id;
    const tasks = [];
    tasks.push({
      name: "setParameterValues",
      parameterValues: [
        [
          "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Username",
          pppoeLogin,
          "xsd:string"
        ],
        [
          "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Password",
          pppoePassword,
          "xsd:string"
        ],
        [
          "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.Enable",
          "true",
          "xsd:boolean"
        ]
      ]
    });
    if (wifiSsid && wifiPassword) {
      tasks.push({
        name: "setParameterValues",
        parameterValues: [
          [
            "InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.SSID",
            wifiSsid,
            "xsd:string"
          ],
          [
            "InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.PreSharedKey.1.PreSharedKey",
            wifiPassword,
            "xsd:string"
          ],
          [
            "InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.Enable",
            "true",
            "xsd:boolean"
          ]
        ]
      });
    }
    if (wifiSsid5 && wifiPassword5) {
      tasks.push({
        name: "setParameterValues",
        parameterValues: [
          [
            "InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.SSID",
            wifiSsid5,
            "xsd:string"
          ],
          [
            "InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.PreSharedKey.1.PreSharedKey",
            wifiPassword5,
            "xsd:string"
          ],
          [
            "InternetGatewayDevice.LANDevice.1.WLANConfiguration.2.Enable",
            "true",
            "xsd:boolean"
          ]
        ]
      });
    }
    for (const task of tasks) {
      await genieRequest(
        `/devices/${encodeURIComponent(deviceId)}/tasks?connection_request`,
        "POST",
        task
      );
    }
    const result = {
      success: true,
      serial,
      message: `ONU ${serial} sincronizada com sucesso`,
      pppoeLogin,
      wifiSsid: wifiSsid || void 0,
      timestamp: Date.now()
    };
    console.log(`[Webhook] \u2713 Sincroniza\xE7\xE3o bem-sucedida: ${serial}`);
    await logWebhookSync(result);
    return result;
  } catch (err) {
    console.error(`[Webhook] \u2717 Erro na sincroniza\xE7\xE3o: ${err.message}`);
    if (retryCount < maxRetries) {
      const delay = baseDelay * Math.pow(2, retryCount);
      console.log(`[Webhook] Tentando novamente em ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return syncOnuFromWebhook(serial, retryCount + 1);
    }
    const result = {
      success: false,
      serial,
      message: `Falha ap\xF3s ${maxRetries + 1} tentativas: ${err.message}`,
      timestamp: Date.now(),
      error: err.message
    };
    console.error(`[Webhook] \u2717 Falha permanente: ${serial}`);
    await logWebhookSync(result);
    return result;
  }
}
async function logWebhookSync(result) {
  try {
    console.log(
      `[WebhookSync] ${result.success ? "\u2713" : "\u2717"} ${result.serial}: ${result.message}`
    );
  } catch (err) {
    console.error("[WebhookSync] Erro ao registrar log:", err);
  }
}
async function handleSgpWebhook(payload) {
  try {
    console.log(`[Webhook] Recebido evento: ${payload.event}`);
    let serial;
    if (payload.serial) {
      serial = payload.serial;
    } else if (payload.data?.serial) {
      serial = payload.data.serial;
    }
    if (!serial) {
      console.warn("[Webhook] Serial n\xE3o fornecido no payload");
      return null;
    }
    return await syncOnuFromWebhook(serial);
  } catch (err) {
    console.error("[Webhook] Erro ao processar webhook:", err.message);
    return null;
  }
}
var init_webhookHandler = __esm({
  "server/webhookHandler.ts"() {
    "use strict";
    init_db();
    init_sgpApi();
    init_genieacsRouter();
    init_schema();
  }
});

// server/kmzIcons.ts
var kmzIcons_exports = {};
__export(kmzIcons_exports, {
  KMZ_ICONS: () => KMZ_ICONS
});
var KMZ_ICONS;
var init_kmzIcons = __esm({
  "server/kmzIcons.ts"() {
    "use strict";
    KMZ_ICONS = {
      "icons/cto.png": "iVBORw0KGgoAAAANSUhEUgAAACAAAAAoCAYAAACfKfiZAAAKG0lEQVR4nIWYTaxcV1LHf1Xn3O6+/fE+7Bj7OQ6yCdijGQmhDAgNBCyxi8SCjSPNYpBmtrCwNCPNAoITIQUk1iARIaQgIORrEaHxgk1ioSFiYQ2DRCAMOLHsjJPn8cd73a+7773nVLG4t/s9O0FzpNPd53bfe/71rzr/qmoBcHcREb969eqJpuHpmzf/x5544uTT28e3fn5xcODuLvfv32dvbw8AMyPGCICqAtDr9VBV39zclOVyeff999//garKzs6Onzl3jnNnz3Ly+PG6KIoPzp8/X9ENAbh06VJ466238h/80Ut/f+PGja/PDw4ckEEvAk5ZlsQYqaqKnBMgiMgaDLBehxBwd6qqQkQIMRJ7BUVRYGZWVfVHLvG/njz95L/+2Z/88csR4M0333QRYW86O9Nko+gPrG4acRG/t7tLkxLj8ZicM6oBcHLOHZDWEndfv4uIxBhVRDCcLO11M9PJZOPpu7ufPl3E+GvAn8YVFe7OcjGvNyZjptMpIahKCLgqiBJC7Kx03CHG0G0qfPGQ7lXRbhljAPPUNI1ky7cAV4ArV64AkHMt7hlVR8VJlqlyJpnRGQgY7tYBsfV27r5m4ZG1O2IgBiSHjIQQQk5pDviaAYCUcmeltL7EURFMBDPDzFD1R+gG56cNEWld4I65ta4MhQEtO4cAGq+qCncjpYQDbs6N/71BzrYGp6ptgIWAqq7Xjw5fby5yeM/qV0XU9AgAd5ecLTZNYrls2NvbYz5fgAgPHjxguVzgbl0wHc6UUgvWH2dCjkyOAG9jp0nZAdTd5aWXXnJgvLVx7OxiXmHZZTZd0NQZM8hmuGfcjZzbjTv3fo5qczAXED2chM7WgLugouSUFo/HgFVVlVLKqCqDwYDZbMbBwYymrrug4gss7W621kWiAZFHXbL67O44oEHZ3j7WP+oCB8rhaHgq54yZSVmWbEwmpJQ4f+ECk8kGOef/P9q/YL3y/WrGGNHumuEJkKMMuGVLqwe4O0WvR1mWDDY21v4/avFR6x4fh4HXBZ90cRCUnDKpaqaPu4CmaUTkkE53x7LRUFNV2inho/S2WqQIQhClVUftyI2oRtqQaL9zafPHZHO8BbACINMputpAVXBvfaUqh2DMVlK7TkIiAZHuuOnRUy0d3QEJLWgNAdyJRcF0Ovt0BUAAm0yYVnWNasCdtb9jjFhqaJqEWV6DWdEcYo8oh35eu0ZbkCEEtAioKKPRiJSSm2WKGAeARxExd5fX/u71P6ybenT37q4Nh0MFqJoaRBgOh2AJVTBr1c+9Rd4yAk3TkFLqNm0FZ+X/GCJlWbKxscHu7i45Z3r9vgBEdx9/43e/8cb9+w+ek1Da8eMn9LPPPmW6v8/m1gabmxuYZRQBFBHHEXDDRcEPM6MqZGuRSTY0ZLRT1ZQSTdMQQsDMUQkKEL/93e9+7ZM7P35uNj2wre2fURFlsVjQ6/dp6orlfMZgMGwfDORs63hQhxBkTbu7tLSoE0VwEcyNonPPYDBAVSmKyHw+m6mqa9nvXzx18lQKIVi/32OxOMA8M9kYMxj0qaoad8MsH9nIj5wEeURojo4gSlEU65xRFAXjjQmqSs6W3Z3YL4p/u337dhQhD8o+TRqysTEmRkVCD+n1aJoGOCy/VjHQMpK6U+Pr78PqqB6RiBACOWeiKjEWOB7cXfSFF154e+fUqe9tbW2F2WxmBwdTyrKk1+utk81KmMyMnI2UjKZJpNT6vs2UrejQpe4VQFWhKOIRYWrFQ5xhCMH1xRdflNf/4fXf+c1nL35nc7Jlk/GWbW8dZ1iO2Tl1mhh69Hp9BmWPEAMh9AihIISCGPvrz63wKCqREHqoKO6Cu3TAEyEE+r2e1E1NtjzIOU/0gw++IiKSvvq1X7164sQJK8uS4XDIeDxmOBwSi0iTGpbLJXVVU9cVdV3TNA11vSSlRIxxLbfZMiEqRa+3rhnKcsTGxjZnzjzFZLyBiDJfLCtgqV/+8n8IIJ/d+vGXEOktl0tPKZFzZrFYUNcNMQTkiCI6qyBs12sF7QTJrXVZCN3ahRgLVCMpG6pKqqsApJUU++693aqu605cOh920S6iWLY2zyPgYG6PSPQqAFfZLoRACJGgESEgKEEiKhEzo+j1JoCuk1GzbAQXsoEkayUZqFPDfD6nXxSd1db5NHfHKZNzRlSREAgaANagWiCdTLsRgoqboRq2gPE6e9y7tyvtTQEQ5vM5IvDw4R63bt+mLIeklNcJ6XPTbH3qVgVslzDW7MQYCSG4qrI/3a+BpO91N02n80a0fcRg0Gc+n5PNaFJaa0BOidRZbNZK7IqB1fCuGF0duaOipaLEGCXnTDkYHAOGawaOHdveaekKqHbVrgg5tfoNbYTn1HQAMtYBWbkkH0nXLRNd79BpQsoJQLIZMYYngJFeuHNHAE6cOPFznXC4iDAZT7jz6R1mswOGw2EX7YaZkNv+AlPFHSx7Nw031gWrmbcnomNkBVZEqJaVAnEdhGa2saI0pcRwNGS4HLG9vcWpk6c4OJh1LlUQ706Bthuak7M/tvkREF0HtYofFWGxXLK3XPraBQcHM191LyklzIzRaMTpJ8+QUmJ/f4qKAr6mv6W9pd4sk71t2+zoOx0z626qBVJVlS+r6giAxdzcHaFNIm5OTolsGekyXggBQTqhYS1Cq2kpt3rRNS2t74VsbXXVNE1bd6pS13Xv5kcflfrhhx+6iKDIcctGjFGULqG0XQZ0fb5oC64tt1r1967fSznT5NRZn3FPZEvknNZB6jiqXWOSc/ng3v5IL1y4IO7OdDp78ODe/Tzbe5hn+1N7cO8nPHywh7u4Odk1YKKEovByUNqoHHm/6BFiH7TAJWDeildbjrVFKTixUJzMYNBjNB560eunVNu8rhan10E4Ho+Gy2oeltUirKiNMVLVSVJK7Tl0QbUnvX6QnA3xJpkd/iviHkiNUKlhucFzwLKgYR8R55NPbpNzjsPhIN77SRNv3vjoIO7s7GRAzp07+/ayyqc/uX37eMq53N397JeqpqEshwchyA92d+/+StMs+2Ups16vf2u5XPxsvyxGrPLDujRvC1Qc6npKsQxMZ/d5WJbcunWTp546s7zwpV/4z9GweG259B9+rq0JIfD7ly8/9y///P3vPdw/4Jlnfvnq22/8zW+f3Dm7u3N658Qzz/zi9//yL/784l+9+upXfvTfP/qWJdifTkVExCzTVInkUFXLNh8AD/fv0+/389bm5hPf/Oa3Xvuti7/+TyKS4LAx4cqVK/ree+/ptWvX8ngwmE7GQ1GFUye2rjVN0mef/Y26qio2x6MPRCQD/w5cftyAnzb+9tW/BuDixYvx2rVr+XMMuLsAvPzyy1//+OOPq1deeeUfgeby5cvn33nnna133333h2fPnq2ef/553d7eVoDr17ubvwpcP/q0649cvH597G+88Xt+6dIlExEH+D/TeZovx34uVwAAAABJRU5ErkJggg==",
      "icons/ceo.png": "iVBORw0KGgoAAAANSUhEUgAAAA8AAAAoCAYAAAAhf6DEAAAFhklEQVR4nHVWTYgU2xX+zv2pbvvH7rFnmjFNj4iijDBGXYib7CW4eYuZrHUhEUEGgwSEMDQuRHlvYTZZZ/cyLhISEiGShSGR8IhRA42OuhhwHEd7Rmm7qqvq1r33ZOFUZ+a170BBVcF3znfOd865l/DZCAA/fvy4/vDhw/0vX74st1qt01prHUXRv6enpz/Oz8/39u7d22NmIiIGAFpeXpYLCwv+/v37P3327NlvXr161dzY2NBKKbG1tYUwDFGr1dIDBw5snT59+hfnz5//dn5+Xt69e9epbrfLRMRv377t1Ov19uHDh9l7T+/evXN79uxBvV6Xx44dK6ytrf3o+fPn3zDzH4koZmYSnU7HExGiKCpnWcaFQoGHwyGiKJJKKVksFtFoNLharfJwOCwBKAJgABDbOYOZPQBiZjjnQEQgIlhrkaYpnHNERD4HjsBEBOccOefgnEP+j4gghMidQwhB2GEqf/HeI0kSMDOstXDOwXsPZob3HtZaKKUwBiYiZFkGAJBSImfwfQfe+3FwTssYMwJ772GMgRACcRzDGIMgCH4Y3Ov14JxDGIaI4xhJkmA4HOL169fo9XqoVqs/TNsYA+89nHNIkgRSSkgpYa0dozyqtjFGWGtJSolqtQqlFIIgQKVSQaVSQbPZRKVSGSmxCyyl9FprK6WEEAJCCDAz0jRFrnuu/Rj42rVrP+71eo1Pnz5xmqaUJMkoijEG1loYY8Yj3759+6uNjY3/rKys7NdakxCCcj13Vj2XbFfBarXaHq21iKIIYRhCSok0TeG9H9Hf6WgX+OLFi99++PBhJQiCv/T7/SnnHIQQxMzIsgzOOaRpCmstpJS7aRORv379+qN9+/a9996T956TJIH3HkopMDOUUiPJxgrmvRdJkqg0TZFlGYIggLUWSZIAAOI4RpZlX652EASeiDiXJaeZP9sTNZazAEDGGOm9pyzLRtGAzy3LzEiSBGma4vsmADAROWa2+QznY5nTlFJCKTVe7atXr04eOnRo7unTp43BYMDWWsqBeeQ0TWGMGdNZ1Gq1n5RKpd+GYdgQQpCUknLKeUcppUbOdkWu1+uNJEnWAdTCMAystWyMIWsttNYwxmA4HH65PVut1j+stX91zlX5s2vK95b3flfEscirq6tHHjx48PP19XWvtZbGGMRxDOccpJTIsmy0ScZyVkrJUqk0ycxSa41isYhyuQwhBLZbdaSxtRaDwUAtLy9LAKQWFxd/f+fOnZksyx6ura21pZTeGCPypeecgzEGWZbBe8/tdrvX7/c/0waAK1euDJ88eRK/efMGQRBASjna2wBARCSEQL/fL124cOHX7Xb777Ozs/+kxcXF6wB++eLFi1K321XVahVRFCGKIgghUC6XUalU8PHjR0xMTODIkSOIoghnzpz5Wg0Gg7n19fW9cRyj2WyO2jOveM5gcnISzIxHjx5Ba43jx48fUCdPnvxVsVj87/v37xeJaCo/n5xzJKVEEATQWnOxWEShUBi2Wq2/lcvlT4VC4c+jGVtZWTlx8+bN77rdroqiiIbDIYgIlUoFUkrfbDbFwsLCV5cuXfrDaNKWlpbE2bNnC0ePHn0yNTX1OwDUarU+NBoNVy6Xsb1RhNYaYRh2sywTp06d0ktLS0J0Oh0fx7EDQLVabSsMQ5w4ceLZzMxMUigU0O/3eTAYIAgCHDx4MADgz5075zqdjt957HGWZWtKKfbe61xGpZQHILTW3G63d7WY2Pmxubm5FgQBbW5uPvfed51zLssyycw0GAyidrv9GgA6nc7/bwaXL19mAJidne3NzMwkExMT3wkhes1mU87Nzf1renp6q1qt/mlycjLC9s0JX7J79+4dZWZ169atn924ceM2M9Pq6ur+XPed9j/UTXBShWwFwgAAAABJRU5ErkJggg==",
      "icons/pole.png": "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAh0lEQVR4nO3VQQ7AIAhEUe9/sp6k12i3pgoCMkITJun6v7rQ1v60Rzhs9Go3+3liVGEGshfXhglITNyCcI9rELC4BAGPrxA5AOh4h4j5e+oUjsZnp1CAAhQgByDyIgq/ivM8RpGAIwguDkdI4jCEJu6OsMQHhAXSzRSfIiSQz7biSwwx1yh6L/TPXtHakYeNAAAAAElFTkSuQmCC",
      "icons/reserve.png": "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAN0lEQVR4nO3OsQ0AIBADsQzL2OwCNQvwKXzS9U4aOkO9gJX9dQAAAAAAAAAAAAAAAIA+wEBp6AJWj6+ZnI61RwAAAABJRU5ErkJggg=="
    };
  }
});

// server/_core/vite.prod.ts
var vite_prod_exports = {};
__export(vite_prod_exports, {
  serveStatic: () => serveStatic,
  setupVite: () => setupVite
});
async function setupVite(_app, _server) {
  throw new Error("setupVite n\xE3o deve ser chamado em produ\xE7\xE3o");
}
var init_vite_prod = __esm({
  "server/_core/vite.prod.ts"() {
    init_serve_static();
  }
});

// server/_core/index.ts
import "dotenv/config";
import express2 from "express";
import { createServer } from "http";
import net from "net";
import path6 from "path";
import fs7 from "fs";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

// server/_core/oauth.ts
init_const();
init_db();

// server/_core/cookies.ts
function isIpAddress(host) {
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host)) return true;
  if (host.includes(":")) return true;
  return false;
}
function isLocalHost(host) {
  return host === "localhost" || host === "127.0.0.1" || host === "::1";
}
function getSessionCookieOptions(req) {
  const hostname = req.hostname ?? "";
  const hasRealDomain = !isIpAddress(hostname) && !isLocalHost(hostname) && hostname.includes(".");
  const forwardedProto = req.headers["x-forwarded-proto"];
  const protoList = Array.isArray(forwardedProto) ? forwardedProto : (forwardedProto ?? "").split(",");
  const isHttps = protoList.some((p) => p.trim().toLowerCase() === "https") || req.protocol === "https";
  const useSecure = hasRealDomain && isHttps;
  return {
    httpOnly: true,
    path: "/",
    sameSite: useSecure ? "none" : "lax",
    secure: useSecure
  };
}

// server/_core/sdk.ts
init_const();

// shared/_core/errors.ts
var HttpError = class extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = "HttpError";
  }
};
var ForbiddenError = (msg) => new HttpError(403, msg);

// server/_core/sdk.ts
init_db();
init_env();
import axios from "axios";
import { parse as parseCookieHeader } from "cookie";
import { SignJWT, jwtVerify } from "jose";
var isNonEmptyString = (value) => typeof value === "string" && value.length > 0;
var EXCHANGE_TOKEN_PATH = `/webdev.v1.WebDevAuthPublicService/ExchangeToken`;
var GET_USER_INFO_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfo`;
var GET_USER_INFO_WITH_JWT_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfoWithJwt`;
var OAuthService = class {
  constructor(client) {
    this.client = client;
    console.log("[OAuth] Initialized with baseURL:", ENV.oAuthServerUrl);
    if (!ENV.oAuthServerUrl) {
      console.error(
        "[OAuth] ERROR: OAUTH_SERVER_URL is not configured! Set OAUTH_SERVER_URL environment variable."
      );
    }
  }
  decodeState(state) {
    const redirectUri = atob(state);
    return redirectUri;
  }
  async getTokenByCode(code, state) {
    const payload = {
      clientId: ENV.appId,
      grantType: "authorization_code",
      code,
      redirectUri: this.decodeState(state)
    };
    const { data } = await this.client.post(
      EXCHANGE_TOKEN_PATH,
      payload
    );
    return data;
  }
  async getUserInfoByToken(token) {
    const { data } = await this.client.post(
      GET_USER_INFO_PATH,
      {
        accessToken: token.accessToken
      }
    );
    return data;
  }
};
var createOAuthHttpClient = () => axios.create({
  baseURL: ENV.oAuthServerUrl,
  timeout: AXIOS_TIMEOUT_MS
});
var SDKServer = class {
  client;
  oauthService;
  constructor(client = createOAuthHttpClient()) {
    this.client = client;
    this.oauthService = new OAuthService(this.client);
  }
  deriveLoginMethod(platforms, fallback) {
    if (fallback && fallback.length > 0) return fallback;
    if (!Array.isArray(platforms) || platforms.length === 0) return null;
    const set = new Set(
      platforms.filter((p) => typeof p === "string")
    );
    if (set.has("REGISTERED_PLATFORM_EMAIL")) return "email";
    if (set.has("REGISTERED_PLATFORM_GOOGLE")) return "google";
    if (set.has("REGISTERED_PLATFORM_APPLE")) return "apple";
    if (set.has("REGISTERED_PLATFORM_MICROSOFT") || set.has("REGISTERED_PLATFORM_AZURE"))
      return "microsoft";
    if (set.has("REGISTERED_PLATFORM_GITHUB")) return "github";
    const first = Array.from(set)[0];
    return first ? first.toLowerCase() : null;
  }
  /**
   * Exchange OAuth authorization code for access token
   * @example
   * const tokenResponse = await sdk.exchangeCodeForToken(code, state);
   */
  async exchangeCodeForToken(code, state) {
    return this.oauthService.getTokenByCode(code, state);
  }
  /**
   * Get user information using access token
   * @example
   * const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
   */
  async getUserInfo(accessToken) {
    const data = await this.oauthService.getUserInfoByToken({
      accessToken
    });
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  parseCookies(cookieHeader) {
    if (!cookieHeader) {
      return /* @__PURE__ */ new Map();
    }
    const parsed = parseCookieHeader(cookieHeader);
    return new Map(Object.entries(parsed));
  }
  getSessionSecret() {
    const secret = ENV.cookieSecret;
    return new TextEncoder().encode(secret);
  }
  /**
   * Create a session token for a Manus user openId
   * @example
   * const sessionToken = await sdk.createSessionToken(userInfo.openId);
   */
  async createSessionToken(openId, options = {}) {
    return this.signSession(
      {
        openId,
        appId: ENV.appId,
        name: options.name || ""
      },
      options
    );
  }
  async signSession(payload, options = {}) {
    const issuedAt = Date.now();
    const expiresInMs = options.expiresInMs ?? ONE_YEAR_MS;
    const expirationSeconds = Math.floor((issuedAt + expiresInMs) / 1e3);
    const secretKey = this.getSessionSecret();
    return new SignJWT({
      openId: payload.openId,
      appId: payload.appId,
      name: payload.name
    }).setProtectedHeader({ alg: "HS256", typ: "JWT" }).setExpirationTime(expirationSeconds).sign(secretKey);
  }
  async verifySession(cookieValue) {
    if (!cookieValue) {
      console.warn("[Auth] Missing session cookie");
      return null;
    }
    try {
      const secretKey = this.getSessionSecret();
      const { payload } = await jwtVerify(cookieValue, secretKey, {
        algorithms: ["HS256"]
      });
      const { openId, appId, name } = payload;
      if (!isNonEmptyString(openId) || !isNonEmptyString(appId)) {
        console.warn("[Auth] Session payload missing required fields");
        return null;
      }
      return {
        openId,
        appId,
        name: typeof name === "string" ? name : ""
      };
    } catch (error) {
      console.warn("[Auth] Session verification failed", String(error));
      return null;
    }
  }
  async getUserInfoWithJwt(jwtToken) {
    const payload = {
      jwtToken,
      projectId: ENV.appId
    };
    const { data } = await this.client.post(
      GET_USER_INFO_WITH_JWT_PATH,
      payload
    );
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  async authenticateRequest(req) {
    const cookies = this.parseCookies(req.headers.cookie);
    const sessionCookie = cookies.get(COOKIE_NAME);
    const session = await this.verifySession(sessionCookie);
    if (!session) {
      throw ForbiddenError("Invalid session cookie");
    }
    const sessionUserId = session.openId;
    const signedInAt = /* @__PURE__ */ new Date();
    let user = await getUserByOpenId(sessionUserId);
    if (!user && ENV.oAuthServerUrl) {
      try {
        const userInfo = await this.getUserInfoWithJwt(sessionCookie ?? "");
        await upsertUser({
          openId: userInfo.openId,
          name: userInfo.name || null,
          email: userInfo.email ?? null,
          loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
          lastSignedIn: signedInAt
        });
        user = await getUserByOpenId(userInfo.openId);
      } catch (error) {
        console.error("[Auth] Failed to sync user from OAuth:", error);
        throw ForbiddenError("Failed to sync user info");
      }
    }
    if (!user) {
      throw ForbiddenError("User not found");
    }
    await upsertUser({
      openId: user.openId,
      lastSignedIn: signedInAt
    });
    return user;
  }
};
var sdk = new SDKServer();

// server/_core/oauth.ts
function getQueryParam(req, key) {
  const value = req.query[key];
  return typeof value === "string" ? value : void 0;
}
function registerOAuthRoutes(app) {
  app.get("/api/oauth/callback", async (req, res) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");
    if (!code || !state) {
      res.status(400).json({ error: "code and state are required" });
      return;
    }
    try {
      const tokenResponse = await sdk.exchangeCodeForToken(code, state);
      const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
      if (!userInfo.openId) {
        res.status(400).json({ error: "openId missing from user info" });
        return;
      }
      await upsertUser({
        openId: userInfo.openId,
        name: userInfo.name || null,
        email: userInfo.email ?? null,
        loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
        lastSignedIn: /* @__PURE__ */ new Date()
      });
      const sessionToken = await sdk.createSessionToken(userInfo.openId, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS
      });
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      res.redirect(302, "/");
    } catch (error) {
      console.error("[OAuth] Callback failed", error);
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });
}

// server/localAuth.ts
init_const();
import { compare, hash } from "bcryptjs";
import { eq as eq2 } from "drizzle-orm";
init_db();
init_tenantContext();
init_schema();
function registerLocalAuthRoutes(app) {
  app.post("/api/local-login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: "Email e senha s\xE3o obrigat\xF3rios" });
      }
      const tenantDb = req.tenantDb;
      const doLogin = async () => {
        const user = await getUserByEmail(email.trim().toLowerCase());
        if (!user || !user.passwordHash) {
          return res.status(401).json({ error: "Usu\xE1rio ou senha inv\xE1lidos" });
        }
        const valid = await compare(password, user.passwordHash);
        if (!valid) {
          return res.status(401).json({ error: "Usu\xE1rio ou senha inv\xE1lidos" });
        }
        const sessionToken = await sdk.signSession(
          { openId: user.openId, appId: "local", name: user.name || user.email || "usuario" },
          { expiresInMs: ONE_YEAR_MS }
        );
        await upsertUser({ openId: user.openId, lastSignedIn: /* @__PURE__ */ new Date() });
        const cookieOptions = getSessionCookieOptions(req);
        res.cookie(COOKIE_NAME, sessionToken, {
          ...cookieOptions,
          maxAge: ONE_YEAR_MS
        });
        return res.json({
          ok: true,
          mustChangePassword: user.mustChangePassword === true,
          user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
      };
      if (tenantDb) {
        return await runWithTenantDb(tenantDb, doLogin);
      } else {
        return await doLogin();
      }
    } catch (err) {
      console.error("[local-login] erro:", err);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  });
  app.post("/api/local-change-password", async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: "Senha atual e nova senha s\xE3o obrigat\xF3rias" });
      }
      if (newPassword.length < 6) {
        return res.status(400).json({ error: "A nova senha deve ter pelo menos 6 caracteres" });
      }
      const cookieHeader = req.headers.cookie ?? "";
      const cookieMatch = cookieHeader.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
      if (!cookieMatch) {
        return res.status(401).json({ error: "N\xE3o autenticado" });
      }
      let sessionData = null;
      try {
        sessionData = await sdk.verifySession(cookieMatch[1]);
      } catch {
        return res.status(401).json({ error: "Sess\xE3o inv\xE1lida" });
      }
      const tenantDb = req.tenantDb;
      const doChangePassword = async () => {
        const db = await getDb();
        if (!db) return res.status(503).json({ error: "Banco de dados indispon\xEDvel" });
        const rows = await db.select().from(users).where(eq2(users.openId, sessionData.openId)).limit(1);
        const user = rows[0];
        if (!user || !user.passwordHash) {
          return res.status(404).json({ error: "Usu\xE1rio n\xE3o encontrado" });
        }
        const valid = await compare(currentPassword, user.passwordHash);
        if (!valid) {
          return res.status(401).json({ error: "Senha atual incorreta" });
        }
        const newHash = await hash(newPassword, 12);
        await db.update(users).set({ passwordHash: newHash, mustChangePassword: false }).where(eq2(users.id, user.id));
        return res.json({ ok: true });
      };
      if (tenantDb) {
        return await runWithTenantDb(tenantDb, doChangePassword);
      } else {
        return await doChangePassword();
      }
    } catch (err) {
      console.error("[local-change-password] erro:", err);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  });
  app.get("/api/local-auth-enabled", (_req, res) => {
    const isLocal = !process.env.OAUTH_SERVER_URL;
    res.json({ enabled: isLocal });
  });
}
async function seedDefaultAdmin() {
  if (process.env.OAUTH_SERVER_URL) return;
  const DEFAULT_EMAIL = "admin@fiberdoc.local";
  const DEFAULT_PASSWORD = "fiberdoc2025";
  const DEFAULT_NAME = "Administrador";
  const openId = `local:${DEFAULT_EMAIL}`;
  try {
    const db = await getDb();
    if (!db) {
      console.warn("[localAuth] seedDefaultAdmin: banco de dados indispon\xEDvel");
      return;
    }
    const existing = await db.select({ id: users.id }).from(users).where(eq2(users.loginMethod, "local")).limit(1);
    if (existing.length > 0) {
      console.log("[localAuth] Admin local j\xE1 existe, senha preservada.");
      return;
    }
    const passwordHash = await hash(DEFAULT_PASSWORD, 12);
    await db.insert(users).values({
      openId,
      name: DEFAULT_NAME,
      email: DEFAULT_EMAIL,
      role: "admin",
      loginMethod: "local",
      passwordHash,
      mustChangePassword: true,
      lastSignedIn: /* @__PURE__ */ new Date()
    });
    console.log("[localAuth] \u2705 Usu\xE1rio admin padr\xE3o criado:");
    console.log(`[localAuth]   Email: ${DEFAULT_EMAIL}`);
    console.log(`[localAuth]   Senha: ${DEFAULT_PASSWORD}`);
    console.log("[localAuth]   \u26A0\uFE0F  Altere a senha no primeiro acesso!");
  } catch (err) {
    console.error("[localAuth] Erro ao criar admin padr\xE3o:", err);
  }
}

// server/routers.ts
init_const();
import { z as z5 } from "zod";
import path2 from "path";
import fs3 from "fs";

// server/_core/systemRouter.ts
import { z } from "zod";

// server/_core/notification.ts
init_env();
import { TRPCError } from "@trpc/server";
var TITLE_MAX_LENGTH = 1200;
var CONTENT_MAX_LENGTH = 2e4;
var trimValue = (value) => value.trim();
var isNonEmptyString2 = (value) => typeof value === "string" && value.trim().length > 0;
var buildEndpointUrl = (baseUrl) => {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return new URL(
    "webdevtoken.v1.WebDevService/SendNotification",
    normalizedBase
  ).toString();
};
var validatePayload = (input) => {
  if (!isNonEmptyString2(input.title)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification title is required."
    });
  }
  if (!isNonEmptyString2(input.content)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification content is required."
    });
  }
  const title = trimValue(input.title);
  const content = trimValue(input.content);
  if (title.length > TITLE_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification title must be at most ${TITLE_MAX_LENGTH} characters.`
    });
  }
  if (content.length > CONTENT_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification content must be at most ${CONTENT_MAX_LENGTH} characters.`
    });
  }
  return { title, content };
};
async function notifyOwner(payload) {
  const { title, content } = validatePayload(payload);
  if (!ENV.forgeApiUrl) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service URL is not configured."
    });
  }
  if (!ENV.forgeApiKey) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service API key is not configured."
    });
  }
  const endpoint = buildEndpointUrl(ENV.forgeApiUrl);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1"
      },
      body: JSON.stringify({ title, content })
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Notification] Failed to notify owner (${response.status} ${response.statusText})${detail ? `: ${detail}` : ""}`
      );
      return false;
    }
    return true;
  } catch (error) {
    console.warn("[Notification] Error calling notification service:", error);
    return false;
  }
}

// server/_core/systemRouter.ts
init_trpc();
var systemRouter = router({
  health: publicProcedure.input(
    z.object({
      timestamp: z.number().min(0, "timestamp cannot be negative")
    })
  ).query(() => ({
    ok: true
  })),
  notifyOwner: adminProcedure.input(
    z.object({
      title: z.string().min(1, "title is required"),
      content: z.string().min(1, "content is required")
    })
  ).mutation(async ({ input }) => {
    const delivered = await notifyOwner(input);
    return {
      success: delivered
    };
  })
});

// server/sslManager.ts
import { execSync } from "child_process";
import fs from "fs";
var sslStatus = {
  running: false,
  progress: 0,
  step: "idle",
  log: []
};
function getSslStatus() {
  return { ...sslStatus, log: [...sslStatus.log] };
}
function setStatus(progress, step, logLine) {
  sslStatus.progress = progress;
  sslStatus.step = step;
  if (logLine) {
    const ts = (/* @__PURE__ */ new Date()).toLocaleTimeString("pt-BR");
    sslStatus.log.push(`[${ts}] ${logLine}`);
  }
}
var NGINX_CONF_PATH = "/etc/nginx/sites-enabled/fiberdoc";
var NGINX_CONF_AVAILABLE = "/etc/nginx/sites-available/fiberdoc";
function writeNginxConf(domain, useSSL, certPath, keyPath) {
  let conf;
  if (useSSL && certPath && keyPath) {
    conf = `# Configura\xE7\xE3o gerada automaticamente pelo FiberDoc
# Redireciona HTTP para HTTPS
server {
    listen 80;
    server_name ${domain};
    return 301 https://$host$request_uri;
}

# HTTPS com certificado Let's Encrypt
server {
    listen 443 ssl;
    server_name ${domain};

    ssl_certificate     ${certPath};
    ssl_certificate_key ${keyPath};
    ssl_protocols       TLSv1.2 TLSv1.3;
    ssl_ciphers         HIGH:!aNULL:!MD5;
    ssl_session_cache   shared:SSL:10m;
    ssl_session_timeout 10m;

    proxy_read_timeout  120s;
    proxy_send_timeout  120s;
    client_max_body_size 50M;

    location / {
        proxy_pass         http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto https;
        proxy_cache_bypass $http_upgrade;
    }
}
`;
  } else {
    conf = `# Configura\xE7\xE3o tempor\xE1ria para valida\xE7\xE3o Let's Encrypt
server {
    listen 80;
    server_name ${domain};

    proxy_read_timeout  120s;
    proxy_send_timeout  120s;
    client_max_body_size 50M;

    location / {
        proxy_pass         http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto http;
        proxy_cache_bypass $http_upgrade;
    }
}
`;
  }
  fs.writeFileSync(NGINX_CONF_AVAILABLE, conf, "utf-8");
  if (!fs.existsSync(NGINX_CONF_PATH)) {
    try {
      execSync(`ln -sf ${NGINX_CONF_AVAILABLE} ${NGINX_CONF_PATH}`);
    } catch {
      fs.writeFileSync(NGINX_CONF_PATH, conf, "utf-8");
    }
  } else {
    fs.writeFileSync(NGINX_CONF_PATH, conf, "utf-8");
  }
}
function reloadNginx() {
  try {
    execSync("nginx -t 2>&1", { timeout: 1e4 });
    execSync("systemctl reload nginx 2>&1", { timeout: 1e4 });
    return true;
  } catch (e) {
    throw new Error(`Falha ao recarregar Nginx: ${e.message}`);
  }
}
function certbotExists() {
  try {
    execSync("which certbot", { timeout: 5e3 });
    return true;
  } catch {
    return false;
  }
}
function nginxExists() {
  try {
    execSync("which nginx", { timeout: 5e3 });
    return true;
  } catch {
    return false;
  }
}
function certificateExists(domain) {
  const certPath = `/etc/letsencrypt/live/${domain}/fullchain.pem`;
  return fs.existsSync(certPath);
}
async function configureDomainSsl(domain, email) {
  if (sslStatus.running) {
    throw new Error("Configura\xE7\xE3o SSL j\xE1 est\xE1 em andamento.");
  }
  const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
  if (!domainRegex.test(domain)) {
    throw new Error("Dom\xEDnio inv\xE1lido. Use o formato: exemplo.com.br");
  }
  sslStatus = {
    running: true,
    progress: 0,
    step: "iniciando",
    log: [],
    domain
  };
  setImmediate(async () => {
    try {
      setStatus(5, "verificando", "Verificando depend\xEAncias (nginx, certbot)...");
      if (!nginxExists()) {
        throw new Error("Nginx n\xE3o encontrado. Instale com: apt install nginx");
      }
      setStatus(10, "verificando", "\u2713 Nginx encontrado.");
      if (!certbotExists()) {
        setStatus(12, "instalando-certbot", "Certbot n\xE3o encontrado. Instalando...");
        execSync("apt-get install -y certbot python3-certbot-nginx 2>&1", { timeout: 12e4 });
        setStatus(20, "instalando-certbot", "\u2713 Certbot instalado.");
      } else {
        setStatus(20, "verificando", "\u2713 Certbot encontrado.");
      }
      setStatus(25, "nginx-temp", `Configurando Nginx para o dom\xEDnio ${domain}...`);
      writeNginxConf(domain, false);
      reloadNginx();
      setStatus(35, "nginx-temp", "\u2713 Nginx configurado com dom\xEDnio.");
      const certPath = `/etc/letsencrypt/live/${domain}/fullchain.pem`;
      const keyPath = `/etc/letsencrypt/live/${domain}/privkey.pem`;
      if (certificateExists(domain)) {
        setStatus(40, "cert-exists", `Certificado para ${domain} j\xE1 existe. Renovando se necess\xE1rio...`);
        try {
          execSync(`certbot renew --cert-name ${domain} --non-interactive 2>&1`, { timeout: 12e4 });
          setStatus(70, "cert-renewed", "\u2713 Certificado verificado/renovado.");
        } catch {
          setStatus(70, "cert-exists", "\u2713 Certificado existente ainda v\xE1lido.");
        }
      } else {
        setStatus(40, "certbot", `Solicitando certificado Let's Encrypt para ${domain}...`);
        setStatus(45, "certbot", "Isso pode levar at\xE9 2 minutos...");
        try {
          const certbotCmd = [
            "certbot",
            "certonly",
            "--nginx",
            "-d",
            domain,
            "--non-interactive",
            "--agree-tos",
            "--email",
            email,
            "--redirect"
          ].join(" ");
          execSync(`${certbotCmd} 2>&1`, { timeout: 18e4 });
          setStatus(70, "certbot", "\u2713 Certificado Let's Encrypt obtido com sucesso!");
        } catch (certErr) {
          setStatus(50, "certbot-webroot", "Tentando m\xE9todo alternativo (webroot)...");
          try {
            const webrootCmd = [
              "certbot",
              "certonly",
              "--webroot",
              "-w",
              "/var/www/html",
              "-d",
              domain,
              "--non-interactive",
              "--agree-tos",
              "--email",
              email
            ].join(" ");
            execSync(`${webrootCmd} 2>&1`, { timeout: 18e4 });
            setStatus(70, "certbot-webroot", "\u2713 Certificado obtido via webroot.");
          } catch (webErr) {
            throw new Error(
              `Falha ao obter certificado. Verifique se o dom\xEDnio ${domain} aponta para este servidor e se a porta 80 est\xE1 acess\xEDvel.
Erro: ${certErr.message}`
            );
          }
        }
      }
      setStatus(80, "nginx-ssl", "Configurando Nginx com SSL...");
      writeNginxConf(domain, true, certPath, keyPath);
      reloadNginx();
      setStatus(90, "nginx-ssl", "\u2713 Nginx configurado com SSL Let's Encrypt.");
      setStatus(95, "salvando", "Salvando configura\xE7\xF5es...");
      try {
        const { getDb: getDb2 } = await Promise.resolve().then(() => (init_db(), db_exports));
        const { systemSettings: systemSettings2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
        const { eq: eq14 } = await import("drizzle-orm");
        const db = await getDb2();
        if (db) {
          const publicUrl = `https://${domain}`;
          const existing = await db.select().from(systemSettings2).where(eq14(systemSettings2.key, "serverPublicUrl")).limit(1);
          if (existing.length > 0) {
            await db.update(systemSettings2).set({ value: publicUrl }).where(eq14(systemSettings2.key, "serverPublicUrl"));
          } else {
            await db.insert(systemSettings2).values({ key: "serverPublicUrl", value: publicUrl });
          }
        }
      } catch (dbErr) {
        setStatus(95, "salvando", `Aviso: n\xE3o foi poss\xEDvel salvar URL nas configura\xE7\xF5es: ${dbErr.message}`);
      }
      setStatus(100, "concluido", `\u2705 Dom\xEDnio ${domain} configurado com SSL com sucesso!`);
      setStatus(100, "concluido", `\u{1F512} Acesse: https://${domain}`);
      sslStatus.running = false;
      sslStatus.success = true;
    } catch (err) {
      const msg = err?.message ?? String(err);
      sslStatus.running = false;
      sslStatus.error = msg;
      sslStatus.step = "erro";
      sslStatus.log.push(`[${(/* @__PURE__ */ new Date()).toLocaleTimeString("pt-BR")}] \u274C Erro: ${msg}`);
    }
  });
}

// server/routers.ts
init_trpc();
init_db();
init_db();
import { TRPCError as TRPCError5 } from "@trpc/server";

// server/backupScheduler.ts
init_storage();
init_db();
import path from "path";
import fs2 from "fs";
init_env();
var schedulerInterval = null;
var LOCAL_BACKUP_DIR = process.env.BACKUP_LOCAL_DIR || (process.env.NODE_ENV === "production" ? "/opt/fiberdoc/backups" : path.join(process.cwd(), ".local-backups"));
function hasS3Credentials() {
  return !!(ENV.forgeApiUrl && ENV.forgeApiKey);
}
function calcNextRun(frequency, hour, dayOfWeek, dayOfMonth, from = /* @__PURE__ */ new Date()) {
  const next = new Date(from);
  next.setSeconds(0);
  next.setMilliseconds(0);
  next.setMinutes(0);
  next.setHours(hour);
  if (frequency === "daily") {
    if (next <= from) next.setDate(next.getDate() + 1);
    return next;
  }
  if (frequency === "weekly") {
    const target = dayOfWeek ?? 0;
    const current = next.getDay();
    let daysUntil = (target - current + 7) % 7;
    if (daysUntil === 0 && next <= from) daysUntil = 7;
    next.setDate(next.getDate() + daysUntil);
    return next;
  }
  if (frequency === "monthly") {
    const target = Math.min(dayOfMonth ?? 1, 28);
    next.setDate(target);
    if (next <= from) {
      next.setMonth(next.getMonth() + 1);
      next.setDate(target);
    }
    return next;
  }
  return next;
}
function saveLocalBackup(filename, buffer) {
  if (!fs2.existsSync(LOCAL_BACKUP_DIR)) {
    fs2.mkdirSync(LOCAL_BACKUP_DIR, { recursive: true });
  }
  const filePath = path.join(LOCAL_BACKUP_DIR, filename);
  fs2.writeFileSync(filePath, buffer);
  return filePath;
}
async function runBackup(trigger) {
  const now = /* @__PURE__ */ new Date();
  const dateStr = now.toISOString().slice(0, 19).replace(/[T:]/g, "-");
  const filename = `fiberdoc-backup-${dateStr}.json`;
  try {
    const backup = await exportFullBackup();
    const json = JSON.stringify(backup, null, 2);
    const buffer = Buffer.from(json, "utf-8");
    const totalRecords = Object.values(backup.counts).reduce((a, b) => a + b, 0);
    const fileSizeBytes = buffer.byteLength;
    let fileUrl;
    let localPath;
    let storageMode;
    if (hasS3Credentials()) {
      const fileKey = `backups/${filename}`;
      const result = await storagePut(fileKey, buffer, "application/json");
      fileUrl = result.url;
      storageMode = "s3";
      console.log(`[BackupScheduler] Backup uploaded to S3: ${fileUrl}`);
    } else {
      localPath = saveLocalBackup(filename, buffer);
      storageMode = "local";
      console.log(`[BackupScheduler] Backup saved locally: ${localPath}`);
    }
    await createBackupHistoryEntry({
      filename,
      fileUrl,
      fileKey: fileUrl ? `backups/${filename}` : void 0,
      localPath,
      fileSizeBytes,
      totalRecords,
      status: "success",
      trigger
    });
    if (trigger === "scheduled") {
      await notifyOwner({
        title: "\u2705 Backup autom\xE1tico gerado",
        content: `Backup gerado em ${now.toLocaleString("pt-BR")}
Arquivo: ${filename}
Registros: ${totalRecords}
Tamanho: ${(fileSizeBytes / 1024).toFixed(1)} KB
Armazenamento: ${storageMode === "s3" ? "Nuvem (S3)" : "Local (" + localPath + ")"}`
      }).catch(() => {
      });
    }
    return { success: true, filename, fileUrl, localPath, storageMode, totalRecords, fileSizeBytes };
  } catch (err) {
    const errorMessage = err?.message ?? String(err);
    console.error("[BackupScheduler] Backup failed:", errorMessage);
    await createBackupHistoryEntry({
      filename,
      status: "error",
      trigger,
      errorMessage,
      totalRecords: 0,
      fileSizeBytes: 0
    }).catch(() => {
    });
    if (trigger === "scheduled") {
      await notifyOwner({
        title: "\u274C Falha no backup autom\xE1tico",
        content: `Erro ao gerar backup em ${now.toLocaleString("pt-BR")}: ${errorMessage}`
      }).catch(() => {
      });
    }
    return { success: false, filename, storageMode: "local", totalRecords: 0, fileSizeBytes: 0, error: errorMessage };
  }
}
async function checkAndRunSchedule() {
  try {
    const schedule = await getBackupSchedule();
    if (!schedule || !schedule.enabled) return;
    const now = /* @__PURE__ */ new Date();
    if (!schedule.nextRunAt || schedule.nextRunAt > now) return;
    console.log("[BackupScheduler] Running scheduled backup...");
    await runBackup("scheduled");
    const nextRunAt = calcNextRun(
      schedule.frequency,
      schedule.hour,
      schedule.dayOfWeek,
      schedule.dayOfMonth,
      now
    );
    await updateScheduleNextRun(schedule.id, nextRunAt, now);
    if (schedule.retentionDays > 0) {
      const deleted = await deleteOldBackupEntries(schedule.retentionDays);
      if (deleted > 0) {
        console.log(`[BackupScheduler] Deleted ${deleted} old backup entries.`);
      }
    }
  } catch (err) {
    console.error("[BackupScheduler] Error during scheduled check:", err);
  }
}
function startBackupScheduler() {
  if (schedulerInterval) return;
  const mode = hasS3Credentials() ? "S3 (Manus cloud)" : `local (${LOCAL_BACKUP_DIR})`;
  console.log(`[BackupScheduler] Started (checking every 5 minutes). Storage mode: ${mode}`);
  checkAndRunSchedule();
  schedulerInterval = setInterval(checkAndRunSchedule, 5 * 60 * 1e3);
}

// server/ipdb.ts
init_db();
init_schema();
import { eq as eq3, and as and2, sql as sql2, inArray as inArray2 } from "drizzle-orm";
function parseCidr(cidr) {
  const [baseIp, prefixStr] = cidr.split("/");
  const prefix = parseInt(prefixStr, 10);
  if (isNaN(prefix) || prefix < 0 || prefix > 32) {
    throw new Error(`Prefixo inv\xE1lido: ${prefixStr}`);
  }
  const ipToNum = (ip) => {
    const parts = ip.split(".").map(Number);
    if (parts.length !== 4 || parts.some((p) => isNaN(p) || p < 0 || p > 255)) {
      throw new Error(`IP inv\xE1lido: ${ip}`);
    }
    return (parts[0] << 24 | parts[1] << 16 | parts[2] << 8 | parts[3]) >>> 0;
  };
  const numToIp = (num) => [num >>> 24 & 255, num >>> 16 & 255, num >>> 8 & 255, num & 255].join(".");
  const mask = prefix === 0 ? 0 : 4294967295 << 32 - prefix >>> 0;
  const network = (ipToNum(baseIp) & mask) >>> 0;
  const broadcast = (network | ~mask >>> 0) >>> 0;
  const totalHosts = prefix >= 31 ? Math.pow(2, 32 - prefix) : Math.max(0, broadcast - network - 1);
  return {
    networkAddress: numToIp(network),
    broadcastAddress: numToIp(broadcast),
    totalHosts,
    firstUsable: prefix >= 31 ? numToIp(network) : numToIp(network + 1),
    lastUsable: prefix >= 31 ? numToIp(broadcast) : numToIp(broadcast - 1),
    prefixLength: prefix
  };
}
async function getIpBlocks(filters) {
  const db = await getDb();
  if (!db) return [];
  const rows = await db.select().from(ipBlocks).orderBy(ipBlocks.name);
  let result = rows;
  if (filters?.type) result = result.filter((r) => r.type === filters.type);
  if (filters?.status) result = result.filter((r) => r.status === filters.status);
  if (filters?.roomId) result = result.filter((r) => r.roomId === filters.roomId);
  return result;
}
async function getIpBlockById(id) {
  const db = await getDb();
  if (!db) return null;
  const [row] = await db.select().from(ipBlocks).where(eq3(ipBlocks.id, id));
  return row ?? null;
}
async function createIpBlock(data) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const parsed = parseCidr(data.cidr);
  const [result] = await db.insert(ipBlocks).values({
    name: data.name,
    cidr: data.cidr,
    networkAddress: parsed.networkAddress,
    broadcastAddress: parsed.broadcastAddress,
    totalHosts: parsed.totalHosts,
    gateway: data.gateway ?? null,
    dns1: data.dns1 ?? null,
    dns2: data.dns2 ?? null,
    vlan: data.vlan ?? null,
    type: data.type ?? "other",
    status: data.status ?? "active",
    description: data.description ?? null,
    roomId: data.roomId ?? null,
    notes: data.notes ?? null
  });
  return result.insertId;
}
async function updateIpBlock(id, data) {
  const db = await getDb();
  if (!db) return;
  await db.update(ipBlocks).set(data).where(eq3(ipBlocks.id, id));
}
async function deleteIpBlock(id) {
  const db = await getDb();
  if (!db) return;
  await db.delete(ipBlocks).where(eq3(ipBlocks.id, id));
}
async function getIpAddressesByBlock(blockId) {
  const db = await getDb();
  if (!db) return [];
  return db.select({
    id: ipAddresses.id,
    blockId: ipAddresses.blockId,
    address: ipAddresses.address,
    status: ipAddresses.status,
    hostname: ipAddresses.hostname,
    description: ipAddresses.description,
    equipmentId: ipAddresses.equipmentId,
    macAddress: ipAddresses.macAddress,
    owner: ipAddresses.owner,
    lastSeen: ipAddresses.lastSeen,
    notes: ipAddresses.notes,
    createdAt: ipAddresses.createdAt,
    updatedAt: ipAddresses.updatedAt,
    equipmentName: equipments.name
  }).from(ipAddresses).leftJoin(equipments, eq3(ipAddresses.equipmentId, equipments.id)).where(eq3(ipAddresses.blockId, blockId)).orderBy(ipAddresses.address);
}
async function allocateIpAddress(data) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const [existing] = await db.select().from(ipAddresses).where(and2(eq3(ipAddresses.blockId, data.blockId), eq3(ipAddresses.address, data.address)));
  if (existing) {
    await db.update(ipAddresses).set({
      status: data.status ?? "allocated",
      hostname: data.hostname ?? null,
      description: data.description ?? null,
      equipmentId: data.equipmentId ?? null,
      macAddress: data.macAddress ?? null,
      owner: data.owner ?? null,
      notes: data.notes ?? null
    }).where(eq3(ipAddresses.id, existing.id));
    return existing.id;
  } else {
    const [result] = await db.insert(ipAddresses).values({
      blockId: data.blockId,
      address: data.address,
      status: data.status ?? "allocated",
      hostname: data.hostname ?? null,
      description: data.description ?? null,
      equipmentId: data.equipmentId ?? null,
      macAddress: data.macAddress ?? null,
      owner: data.owner ?? null,
      notes: data.notes ?? null
    });
    return result.insertId;
  }
}
async function releaseIpAddress(id) {
  const db = await getDb();
  if (!db) return;
  await db.update(ipAddresses).set({
    status: "free",
    hostname: null,
    description: null,
    equipmentId: null,
    macAddress: null,
    owner: null
  }).where(eq3(ipAddresses.id, id));
}
async function updateIpAddress(id, data) {
  const db = await getDb();
  if (!db) return;
  await db.update(ipAddresses).set(data).where(eq3(ipAddresses.id, id));
}
async function deleteIpAddress(id) {
  const db = await getDb();
  if (!db) return;
  await db.delete(ipAddresses).where(eq3(ipAddresses.id, id));
}
async function addIpAuditLog(entry) {
  const db = await getDb();
  if (!db) return;
  await db.insert(ipAuditLog).values({
    blockId: entry.blockId,
    addressId: entry.addressId ?? null,
    address: entry.address,
    action: entry.action,
    previousStatus: entry.previousStatus ?? null,
    newStatus: entry.newStatus ?? null,
    hostname: entry.hostname ?? null,
    owner: entry.owner ?? null,
    equipmentId: entry.equipmentId ?? null,
    equipmentName: entry.equipmentName ?? null,
    performedBy: entry.performedBy ?? null,
    userId: entry.userId ?? null,
    notes: entry.notes ?? null
  });
}
async function getIpAuditByBlock(blockId, limit = 100) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(ipAuditLog).where(eq3(ipAuditLog.blockId, blockId)).orderBy(sql2`${ipAuditLog.createdAt} DESC`).limit(limit);
}
async function getIpBlockStats(blockId) {
  const db = await getDb();
  if (!db) return { free: 0, allocated: 0, reserved: 0, dhcp: 0 };
  const rows = await db.select({ status: ipAddresses.status, count: sql2`count(*)` }).from(ipAddresses).where(eq3(ipAddresses.blockId, blockId)).groupBy(ipAddresses.status);
  const stats = { free: 0, allocated: 0, reserved: 0, dhcp: 0 };
  for (const row of rows) stats[row.status] = Number(row.count);
  return stats;
}
async function getIpDashboardSummary() {
  const db = await getDb();
  if (!db) return {
    totalBlocks: 0,
    totalHosts: 0,
    totalAllocated: 0,
    totalReserved: 0,
    totalFree: 0,
    utilizationPct: 0,
    blocks: []
  };
  const blocks = await db.select().from(ipBlocks);
  const addresses = await db.select({ blockId: ipAddresses.blockId, status: ipAddresses.status, count: sql2`count(*)` }).from(ipAddresses).groupBy(ipAddresses.blockId, ipAddresses.status);
  const statsMap = {};
  for (const row of addresses) {
    if (!statsMap[row.blockId]) statsMap[row.blockId] = { free: 0, allocated: 0, reserved: 0, dhcp: 0 };
    statsMap[row.blockId][row.status] = Number(row.count);
  }
  const blocksWithStats = blocks.map((b) => {
    const s = statsMap[b.id] ?? { free: 0, allocated: 0, reserved: 0, dhcp: 0 };
    const used = s.allocated + s.reserved + s.dhcp;
    const utilizationPct = b.totalHosts > 0 ? Math.round(used / b.totalHosts * 100) : 0;
    return { ...b, stats: s, used, utilizationPct };
  });
  const totalBlocks = blocks.length;
  const totalHosts = blocks.reduce((acc, b) => acc + b.totalHosts, 0);
  const totalAllocated = addresses.filter((a) => a.status === "allocated").reduce((acc, a) => acc + Number(a.count), 0);
  const totalReserved = addresses.filter((a) => a.status === "reserved").reduce((acc, a) => acc + Number(a.count), 0);
  const totalFree = totalHosts - totalAllocated - totalReserved;
  return {
    totalBlocks,
    totalHosts,
    totalAllocated,
    totalReserved,
    totalFree,
    utilizationPct: totalHosts > 0 ? Math.round((totalAllocated + totalReserved) / totalHosts * 100) : 0,
    blocks: blocksWithStats
  };
}
async function getPrimaryIpByEquipment(equipmentId) {
  const db = await getDb();
  if (!db) return null;
  const [row] = await db.select({
    id: ipAddresses.id,
    address: ipAddresses.address,
    blockId: ipAddresses.blockId,
    status: ipAddresses.status,
    hostname: ipAddresses.hostname
  }).from(ipAddresses).where(and2(eq3(ipAddresses.equipmentId, equipmentId), eq3(ipAddresses.status, "allocated"))).limit(1);
  return row ?? null;
}
async function getPrimaryIpsByEquipments(equipmentIds) {
  if (equipmentIds.length === 0) return {};
  const db = await getDb();
  if (!db) return {};
  const rows = await db.select({
    id: ipAddresses.id,
    address: ipAddresses.address,
    blockId: ipAddresses.blockId,
    status: ipAddresses.status,
    hostname: ipAddresses.hostname,
    equipmentId: ipAddresses.equipmentId
  }).from(ipAddresses).where(and2(inArray2(ipAddresses.equipmentId, equipmentIds), eq3(ipAddresses.status, "allocated")));
  const map = {};
  for (const row of rows) {
    if (row.equipmentId && !map[row.equipmentId]) {
      map[row.equipmentId] = {
        id: row.id,
        address: row.address,
        blockId: row.blockId,
        hostname: row.hostname
      };
    }
  }
  return map;
}
async function getInterfacesByEquipment(equipmentId) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(equipmentInterfaces).where(eq3(equipmentInterfaces.equipmentId, equipmentId)).orderBy(equipmentInterfaces.isPrimary, equipmentInterfaces.name);
}
async function createInterface(data) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  if (data.isPrimary) {
    await db.update(equipmentInterfaces).set({ isPrimary: false }).where(eq3(equipmentInterfaces.equipmentId, data.equipmentId));
  }
  const [result] = await db.insert(equipmentInterfaces).values({
    equipmentId: data.equipmentId,
    name: data.name,
    vlan: data.vlan ?? null,
    ipAddress: data.ipAddress ?? null,
    macAddress: data.macAddress ?? null,
    ipBlockId: data.ipBlockId ?? null,
    serviceDescription: data.serviceDescription ?? null,
    isPrimary: data.isPrimary ?? false,
    notes: data.notes ?? null
  });
  return result.insertId;
}
async function updateInterface(id, data) {
  const db = await getDb();
  if (!db) return;
  if (data.isPrimary && data.equipmentId) {
    await db.update(equipmentInterfaces).set({ isPrimary: false }).where(eq3(equipmentInterfaces.equipmentId, data.equipmentId));
  }
  const { equipmentId: _eq, ...updateData } = data;
  await db.update(equipmentInterfaces).set(updateData).where(eq3(equipmentInterfaces.id, id));
}
async function deleteInterface(id) {
  const db = await getDb();
  if (!db) return;
  await db.delete(equipmentInterfaces).where(eq3(equipmentInterfaces.id, id));
}

// server/routers.ts
init_db();

// server/snmpPoller.ts
init_db();
import * as snmp from "net-snmp";

// server/telegram.ts
var TELEGRAM_API = "https://api.telegram.org";
async function sendTelegramMessage(config, text3, parseMode = "HTML") {
  if (!config.botToken || !config.chatId) {
    return { ok: false, error: "Bot token ou Chat ID n\xE3o configurado" };
  }
  try {
    const url = `${TELEGRAM_API}/bot${config.botToken}/sendMessage`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: config.chatId,
        text: text3,
        parse_mode: parseMode,
        disable_web_page_preview: true
      })
    });
    const data = await res.json();
    if (!data.ok) {
      console.error("[Telegram] Erro ao enviar mensagem:", data.description);
      return { ok: false, error: data.description };
    }
    return { ok: true };
  } catch (e) {
    console.error("[Telegram] Falha na requisi\xE7\xE3o:", e.message);
    return { ok: false, error: e.message };
  }
}
var SEVERITY_EMOJI = {
  warning: "\u26A0\uFE0F",
  critical: "\u{1F6A8}"
};
var ALERT_TYPE_LABEL = {
  temp_high: "Temperatura alta",
  voltage_low: "Tens\xE3o de sa\xEDda baixa",
  voltage_high: "Tens\xE3o de sa\xEDda alta",
  battery_low: "Bateria baixa",
  battery_high: "Bateria alta",
  current_high: "Corrente alta",
  load_high: "Carga alta",
  ac_fail: "Falta de tens\xE3o AC",
  snmp_unreachable: "Equipamento inacess\xEDvel via SNMP"
};
var ALERT_TYPE_UNIT = {
  temp_high: "\xB0C",
  voltage_low: "V",
  voltage_high: "V",
  battery_low: "V",
  battery_high: "V",
  current_high: "A",
  load_high: "%",
  ac_fail: "",
  snmp_unreachable: ""
};
function buildAlertMessage(opts) {
  const emoji = SEVERITY_EMOJI[opts.severity] ?? "\u26A0\uFE0F";
  const label = ALERT_TYPE_LABEL[opts.alertType] ?? opts.alertType;
  const unit = ALERT_TYPE_UNIT[opts.alertType] ?? "";
  const now = (/* @__PURE__ */ new Date()).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
  let lines = [
    `${emoji} <b>ALERTA SNMP \u2014 ${label.toUpperCase()}</b>`,
    ``,
    `\u{1F4CD} <b>Fonte:</b> ${opts.sourceName}`
  ];
  if (opts.sourceLocation) {
    lines.push(`\u{1F3E2} <b>Local:</b> ${opts.sourceLocation}`);
  }
  if (opts.currentValue != null && unit) {
    lines.push(`\u{1F4CA} <b>Valor atual:</b> ${opts.currentValue}${unit}`);
  }
  if (opts.thresholdValue != null && unit) {
    const direction = ["voltage_low", "battery_low"].includes(opts.alertType) ? "M\xEDnimo" : "M\xE1ximo";
    lines.push(`\u{1F3AF} <b>${direction} configurado:</b> ${opts.thresholdValue}${unit}`);
  }
  lines.push(`\u{1F550} <b>Hor\xE1rio:</b> ${now}`);
  lines.push(``);
  lines.push(`<i>${opts.message}</i>`);
  return lines.join("\n");
}
function buildResolvedMessage(opts) {
  const label = ALERT_TYPE_LABEL[opts.alertType] ?? opts.alertType;
  const unit = ALERT_TYPE_UNIT[opts.alertType] ?? "";
  const now = (/* @__PURE__ */ new Date()).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
  let lines = [
    `\u2705 <b>ALERTA RESOLVIDO \u2014 ${label.toUpperCase()}</b>`,
    ``,
    `\u{1F4CD} <b>Fonte:</b> ${opts.sourceName}`
  ];
  if (opts.currentValue != null && unit) {
    lines.push(`\u{1F4CA} <b>Valor atual:</b> ${opts.currentValue}${unit}`);
  }
  lines.push(`\u{1F550} <b>Hor\xE1rio:</b> ${now}`);
  lines.push(``);
  lines.push(`<i>O valor voltou ao intervalo normal.</i>`);
  return lines.join("\n");
}

// server/snmpPoller.ts
function createSession2(ps) {
  const target = ps.snmpHost;
  const port = ps.snmpPort ?? 161;
  if (ps.snmpVersion === "v3") {
    const options = {
      port,
      retries: 1,
      timeout: 5e3,
      version: snmp.Version3
    };
    const user = {
      name: ps.snmpV3User ?? "admin",
      level: snmp.SecurityLevel.noAuthNoPriv
    };
    if (ps.snmpV3AuthKey) {
      user.level = ps.snmpV3PrivKey ? snmp.SecurityLevel.authPriv : snmp.SecurityLevel.authNoPriv;
      user.authProtocol = ps.snmpV3AuthProto === "SHA" ? snmp.AuthProtocols.sha : snmp.AuthProtocols.md5;
      user.authKey = ps.snmpV3AuthKey;
    }
    if (ps.snmpV3PrivKey) {
      user.privProtocol = ps.snmpV3PrivProto === "AES" ? snmp.PrivProtocols.aes : snmp.PrivProtocols.des;
      user.privKey = ps.snmpV3PrivKey;
    }
    return snmp.createV3Session(target, user, options);
  }
  const version = ps.snmpVersion === "v1" ? snmp.Version1 : snmp.Version2c;
  const community = ps.snmpCommunity ?? "public";
  return snmp.createSession(target, community, {
    port,
    retries: 1,
    timeout: 5e3,
    version
  });
}
function oidGet(session, oid) {
  return new Promise((resolve) => {
    session.get([oid], (error, varbinds) => {
      if (error) return resolve(null);
      if (!varbinds || varbinds.length === 0) return resolve(null);
      const vb = varbinds[0];
      if (snmp.isVarbindError(vb)) return resolve(null);
      const val = vb.value;
      if (val === null || val === void 0) return resolve(null);
      const num = Number(val);
      return resolve(isNaN(num) ? String(val) : num);
    });
  });
}
async function pollPowerSource(ps) {
  if (!ps.snmpEnabled || !ps.snmpHost) {
    return { error: "SNMP n\xE3o habilitado ou host n\xE3o configurado" };
  }
  let session;
  try {
    session = createSession2(ps);
  } catch (e) {
    return { error: `Erro ao criar sess\xE3o SNMP: ${e.message}` };
  }
  const result = {};
  try {
    const oids = [
      { key: "voltage", oid: ps.oidOutputVoltage ?? null },
      { key: "current", oid: ps.oidOutputCurrent ?? null },
      { key: "temperature", oid: ps.oidTemperature ?? null },
      { key: "alarmStatus", oid: ps.oidAlarmStatus ?? null },
      { key: "batteryLevel", oid: ps.oidBatteryLevel ?? null },
      { key: "loadPercent", oid: ps.oidLoadPercent ?? null }
    ];
    const divisors = {
      voltage: typeof ps.snmpVoltageDivisor === "number" && ps.snmpVoltageDivisor > 0 ? ps.snmpVoltageDivisor : 1,
      current: typeof ps.snmpCurrentDivisor === "number" && ps.snmpCurrentDivisor > 0 ? ps.snmpCurrentDivisor : 1,
      temperature: typeof ps.snmpTempDivisor === "number" && ps.snmpTempDivisor > 0 ? ps.snmpTempDivisor : 1,
      batteryLevel: typeof ps.snmpBatteryDivisor === "number" && ps.snmpBatteryDivisor > 0 ? ps.snmpBatteryDivisor : 1,
      loadPercent: 1,
      alarmStatus: 1
    };
    for (const { key, oid } of oids) {
      if (!oid) continue;
      const val = await oidGet(session, oid);
      const divisor = divisors[key] ?? 1;
      if (typeof val === "number" && divisor !== 1) {
        result[key] = Math.round(val / divisor * 100) / 100;
      } else {
        result[key] = val;
      }
    }
  } catch (e) {
    result.error = e.message;
  } finally {
    try {
      session.close();
    } catch (_) {
    }
  }
  return result;
}
function evaluateThresholds(ps, result) {
  const checks = [];
  if (ps.alertTempMax != null && typeof result.temperature === "number") {
    const violated = result.temperature > ps.alertTempMax;
    checks.push({
      alertType: "temp_high",
      severity: result.temperature > ps.alertTempMax + 5 ? "critical" : "warning",
      currentValue: result.temperature,
      thresholdValue: ps.alertTempMax,
      violated,
      message: violated ? `Temperatura ${result.temperature}\xB0C acima do limite de ${ps.alertTempMax}\xB0C` : ""
    });
  }
  if (ps.alertVoltageMin != null && typeof result.voltage === "number") {
    const violated = result.voltage < ps.alertVoltageMin;
    checks.push({
      alertType: "voltage_low",
      severity: "critical",
      currentValue: result.voltage,
      thresholdValue: ps.alertVoltageMin,
      violated,
      message: violated ? `Tens\xE3o de sa\xEDda ${result.voltage}V abaixo do m\xEDnimo de ${ps.alertVoltageMin}V` : ""
    });
  }
  if (ps.alertVoltageMax != null && typeof result.voltage === "number") {
    const violated = result.voltage > ps.alertVoltageMax;
    checks.push({
      alertType: "voltage_high",
      severity: "warning",
      currentValue: result.voltage,
      thresholdValue: ps.alertVoltageMax,
      violated,
      message: violated ? `Tens\xE3o de sa\xEDda ${result.voltage}V acima do m\xE1ximo de ${ps.alertVoltageMax}V` : ""
    });
  }
  if (ps.alertBatteryMin != null && typeof result.batteryLevel === "number") {
    const violated = result.batteryLevel < ps.alertBatteryMin;
    checks.push({
      alertType: "battery_low",
      severity: result.batteryLevel < ps.alertBatteryMin - 2 ? "critical" : "warning",
      currentValue: result.batteryLevel,
      thresholdValue: ps.alertBatteryMin,
      violated,
      message: violated ? `Bateria ${result.batteryLevel}V abaixo do m\xEDnimo de ${ps.alertBatteryMin}V` : ""
    });
  }
  if (ps.alertBatteryMax != null && typeof result.batteryLevel === "number") {
    const violated = result.batteryLevel > ps.alertBatteryMax;
    checks.push({
      alertType: "battery_high",
      severity: "warning",
      currentValue: result.batteryLevel,
      thresholdValue: ps.alertBatteryMax,
      violated,
      message: violated ? `Bateria ${result.batteryLevel}V acima do m\xE1ximo de ${ps.alertBatteryMax}V` : ""
    });
  }
  if (ps.alertCurrentMax != null && typeof result.current === "number") {
    const violated = result.current > ps.alertCurrentMax;
    checks.push({
      alertType: "current_high",
      severity: "warning",
      currentValue: result.current,
      thresholdValue: ps.alertCurrentMax,
      violated,
      message: violated ? `Corrente ${result.current}A acima do m\xE1ximo de ${ps.alertCurrentMax}A` : ""
    });
  }
  if (ps.alertLoadMax != null && typeof result.loadPercent === "number") {
    const violated = result.loadPercent > ps.alertLoadMax;
    checks.push({
      alertType: "load_high",
      severity: result.loadPercent > 95 ? "critical" : "warning",
      currentValue: result.loadPercent,
      thresholdValue: ps.alertLoadMax,
      violated,
      message: violated ? `Carga ${result.loadPercent}% acima do m\xE1ximo de ${ps.alertLoadMax}%` : ""
    });
  }
  if (ps.alertAcFailEnabled) {
    const acFail = typeof result.voltage === "number" && result.voltage < 5 || result.alarmStatus != null && ["0", "fail", "alarm", "2", "3"].includes(String(result.alarmStatus).toLowerCase());
    checks.push({
      alertType: "ac_fail",
      severity: "critical",
      currentValue: typeof result.voltage === "number" ? result.voltage : null,
      thresholdValue: null,
      violated: acFail,
      message: acFail ? `Falta de tens\xE3o AC detectada na fonte ${ps.name}` : ""
    });
  }
  return checks;
}
async function processAlerts(ps, result, telegramConfig) {
  if (!ps.alertsEnabled) return;
  const checks = evaluateThresholds(ps, result);
  for (const check of checks) {
    const alreadyActive = await hasActiveAlertOfType(ps.id, check.alertType);
    if (check.violated && !alreadyActive) {
      await createSnmpAlert({
        powerSourceId: ps.id,
        alertType: check.alertType,
        severity: check.severity,
        message: check.message,
        currentValue: check.currentValue,
        thresholdValue: check.thresholdValue
      });
      if (telegramConfig) {
        const text3 = buildAlertMessage({
          sourceName: ps.name,
          sourceLocation: ps.location,
          alertType: check.alertType,
          severity: check.severity,
          currentValue: check.currentValue,
          thresholdValue: check.thresholdValue,
          message: check.message
        });
        await sendTelegramMessage(telegramConfig, text3).catch(
          (e) => console.error("[Telegram] Falha ao enviar alerta:", e)
        );
      }
      console.log(`[SNMP Alert] NOVO alerta ${check.alertType} para fonte ${ps.name} (id=${ps.id})`);
    } else if (!check.violated && alreadyActive) {
      await resolveAlertsByTypeAndSource(ps.id, check.alertType);
      if (telegramConfig) {
        const text3 = buildResolvedMessage({
          sourceName: ps.name,
          alertType: check.alertType,
          currentValue: check.currentValue
        });
        await sendTelegramMessage(telegramConfig, text3).catch(
          (e) => console.error("[Telegram] Falha ao enviar resolu\xE7\xE3o:", e)
        );
      }
      console.log(`[SNMP Alert] RESOLVIDO alerta ${check.alertType} para fonte ${ps.name} (id=${ps.id})`);
    }
  }
  if (result.error && ps.snmpEnabled) {
    const alreadyActive = await hasActiveAlertOfType(ps.id, "snmp_unreachable");
    if (!alreadyActive) {
      await createSnmpAlert({
        powerSourceId: ps.id,
        alertType: "snmp_unreachable",
        severity: "warning",
        message: `Equipamento n\xE3o responde via SNMP: ${result.error}`,
        currentValue: null,
        thresholdValue: null
      });
      if (telegramConfig) {
        const text3 = buildAlertMessage({
          sourceName: ps.name,
          sourceLocation: ps.location,
          alertType: "snmp_unreachable",
          severity: "warning",
          currentValue: null,
          thresholdValue: null,
          message: `Equipamento n\xE3o responde via SNMP: ${result.error}`
        });
        await sendTelegramMessage(telegramConfig, text3).catch(() => {
        });
      }
    }
  } else if (!result.error) {
    const alreadyActive = await hasActiveAlertOfType(ps.id, "snmp_unreachable");
    if (alreadyActive) {
      await resolveAlertsByTypeAndSource(ps.id, "snmp_unreachable");
      if (telegramConfig) {
        const text3 = buildResolvedMessage({ sourceName: ps.name, alertType: "snmp_unreachable", currentValue: null });
        await sendTelegramMessage(telegramConfig, text3).catch(() => {
        });
      }
    }
  }
}
async function pollSinglePowerSource(psId) {
  const sources = await getPowerSources();
  const ps = sources.find((s) => s.id === psId);
  if (!ps) return { success: false, error: "Fonte n\xE3o encontrada" };
  const result = await pollPowerSource(ps);
  await updatePowerSourceSnmpData(psId, {
    lastPollAt: /* @__PURE__ */ new Date(),
    lastVoltage: typeof result.voltage === "number" ? result.voltage : null,
    lastCurrent: typeof result.current === "number" ? result.current : null,
    lastTemperature: typeof result.temperature === "number" ? result.temperature : null,
    lastAlarmStatus: result.alarmStatus != null ? String(result.alarmStatus) : null,
    lastBatteryLevel: typeof result.batteryLevel === "number" ? result.batteryLevel : null,
    lastLoadPercent: typeof result.loadPercent === "number" ? result.loadPercent : null,
    lastPollError: result.error ?? null
  });
  if (!result.error) {
    await saveSnmpReading(psId, {
      voltage: typeof result.voltage === "number" ? result.voltage : null,
      current: typeof result.current === "number" ? result.current : null,
      temperature: typeof result.temperature === "number" ? result.temperature : null,
      batteryLevel: typeof result.batteryLevel === "number" ? result.batteryLevel : null,
      loadPercent: typeof result.loadPercent === "number" ? result.loadPercent : null,
      alarmStatus: result.alarmStatus != null ? String(result.alarmStatus) : null
    }).catch((e) => console.error("[SNMP] Erro ao salvar hist\xF3rico:", e));
  }
  try {
    const settings = await getSystemSettings();
    const telegramConfig = settings.telegram_bot_token && settings.telegram_chat_id ? { botToken: settings.telegram_bot_token, chatId: settings.telegram_chat_id } : null;
    await processAlerts(ps, result, telegramConfig);
  } catch (e) {
    console.error("[SNMP] Erro ao processar alertas:", e);
  }
  return { success: !result.error, ...result };
}
var _pollTimer = null;
function startSnmpPoller(intervalMs = 6e4) {
  if (_pollTimer) return;
  _pollTimer = setInterval(async () => {
    try {
      const sources = await getPowerSources();
      const enabled = sources.filter((s) => s.snmpEnabled && s.snmpHost);
      for (const ps of enabled) {
        const pollInterval = (ps.snmpPollInterval ?? 300) * 1e3;
        const lastPoll = ps.lastPollAt ? new Date(ps.lastPollAt).getTime() : 0;
        if (Date.now() - lastPoll < pollInterval) continue;
        await pollSinglePowerSource(ps.id).catch(
          (e) => console.error(`[SNMP] Erro ao coletar fonte ${ps.id}:`, e)
        );
      }
    } catch (e) {
      console.error("[SNMP] Erro no poller:", e);
    }
  }, intervalMs);
  console.log("[SNMP] Poller iniciado (verifica\xE7\xE3o a cada 60s)");
}

// server/routers.ts
init_db();

// server/tuyaPoller.ts
init_db();
import crypto from "crypto";
var tokenCache = {};
var REGION_ENDPOINTS = {
  us: "https://openapi.tuyaus.com",
  eu: "https://openapi.tuyaeu.com",
  cn: "https://openapi.tuyacn.com",
  in: "https://openapi.tuyain.com"
};
function generateSign(accessId, accessSecret, t2, nonce, token, method, path7, body = "") {
  const contentHash = crypto.createHash("sha256").update(body).digest("hex");
  const stringToSign = [method, contentHash, "", path7].join("\n");
  const signStr = accessId + token + t2 + nonce + stringToSign;
  return crypto.createHmac("sha256", accessSecret).update(signStr).digest("hex").toUpperCase();
}
async function getAccessToken(config) {
  const cacheKey = `${config.accessId}:${config.region}`;
  const cached = tokenCache[cacheKey];
  if (cached && Date.now() < cached.expiresAt - 6e4) {
    return cached.token;
  }
  const baseUrl = REGION_ENDPOINTS[config.region] ?? REGION_ENDPOINTS.us;
  const t2 = Date.now();
  const nonce = crypto.randomBytes(8).toString("hex");
  const path7 = "/v1.0/token?grant_type=1";
  const sign = generateSign(config.accessId, config.accessSecret, t2, nonce, "", "GET", path7);
  const res = await fetch(`${baseUrl}${path7}`, {
    method: "GET",
    headers: {
      "client_id": config.accessId,
      "sign": sign,
      "t": String(t2),
      "sign_method": "HMAC-SHA256",
      "nonce": nonce
    }
  });
  const data = await res.json();
  if (!data.success || !data.result?.access_token) {
    throw new Error(`Falha ao obter token Tuya: ${JSON.stringify(data)}`);
  }
  const expiresAt = Date.now() + data.result.expire_time * 1e3;
  tokenCache[cacheKey] = { token: data.result.access_token, expiresAt };
  return data.result.access_token;
}
async function getTuyaDeviceStatus(config, deviceId) {
  const token = await getAccessToken(config);
  const baseUrl = REGION_ENDPOINTS[config.region] ?? REGION_ENDPOINTS.us;
  const t2 = Date.now();
  const nonce = crypto.randomBytes(8).toString("hex");
  const path7 = `/v1.0/devices/${deviceId}/status`;
  const sign = generateSign(config.accessId, config.accessSecret, t2, nonce, token, "GET", path7);
  const res = await fetch(`${baseUrl}${path7}`, {
    method: "GET",
    headers: {
      "client_id": config.accessId,
      "access_token": token,
      "sign": sign,
      "t": String(t2),
      "sign_method": "HMAC-SHA256",
      "nonce": nonce
    }
  });
  const data = await res.json();
  if (!data.success) {
    throw new Error(`Erro ao consultar dispositivo ${deviceId}: ${data.msg ?? JSON.stringify(data)}`);
  }
  return data.result ?? [];
}
async function testTuyaConnection(config) {
  try {
    await getAccessToken(config);
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message ?? "Erro desconhecido" };
  }
}
function extractValues(statuses) {
  const values = {
    temperature: null,
    humidity: null,
    co2: null,
    power: null,
    voltage: null,
    current: null
  };
  for (const s of statuses) {
    const v = typeof s.value === "number" ? s.value : null;
    if (["temp_current", "va_temperature", "temperature"].includes(s.code)) {
      values.temperature = v !== null ? v > 100 ? v / 10 : v : null;
    }
    if (["humidity_value", "va_humidity", "humidity"].includes(s.code)) {
      values.humidity = v !== null ? v > 100 ? v / 10 : v : null;
    }
    if (["co2_value", "co2"].includes(s.code)) {
      values.co2 = v;
    }
    if (["cur_power", "power"].includes(s.code)) {
      values.power = v !== null ? v / 10 : null;
    }
    if (["cur_voltage", "voltage"].includes(s.code)) {
      values.voltage = v !== null ? v / 10 : null;
    }
    if (["cur_current", "current"].includes(s.code)) {
      values.current = v !== null ? v / 1e3 : null;
    }
    if (["phase_a", "phase_b", "phase_c"].includes(s.code) && typeof s.value === "string") {
      try {
        const buf = Buffer.from(s.value, "base64");
        if (buf.length >= 6) {
          const vRaw = buf[0] << 8 | buf[1];
          const cRaw = buf[2] << 8 | buf[3];
          const pRaw = buf[4] | buf[5] << 8;
          if (s.code === "phase_a" || values.voltage === null) {
            values.voltage = vRaw / 10;
            values.current = cRaw / 1e3;
            values.power = pRaw / 10;
          }
        }
      } catch (_) {
      }
    }
  }
  return values;
}
async function evaluateAlerts(device, values, telegramConfig) {
  if (!device.alertsEnabled) return;
  const checks = [
    {
      condition: values.temperature !== null && device.alertTempMax !== null && values.temperature > device.alertTempMax,
      type: "temp_high",
      message: `\u{1F321}\uFE0F Temperatura alta: ${values.temperature?.toFixed(1)}\xB0C (limite: ${device.alertTempMax}\xB0C)`,
      currentValue: values.temperature,
      thresholdValue: device.alertTempMax
    },
    {
      condition: values.temperature !== null && device.alertTempMin !== null && values.temperature < device.alertTempMin,
      type: "temp_low",
      message: `\u{1F321}\uFE0F Temperatura baixa: ${values.temperature?.toFixed(1)}\xB0C (m\xEDnimo: ${device.alertTempMin}\xB0C)`,
      currentValue: values.temperature,
      thresholdValue: device.alertTempMin
    },
    {
      condition: values.humidity !== null && device.alertHumidityMax !== null && values.humidity > device.alertHumidityMax,
      type: "humidity_high",
      message: `\u{1F4A7} Umidade alta: ${values.humidity?.toFixed(0)}% (limite: ${device.alertHumidityMax}%)`,
      currentValue: values.humidity,
      thresholdValue: device.alertHumidityMax
    },
    {
      condition: values.humidity !== null && device.alertHumidityMin !== null && values.humidity < device.alertHumidityMin,
      type: "humidity_low",
      message: `\u{1F4A7} Umidade baixa: ${values.humidity?.toFixed(0)}% (m\xEDnimo: ${device.alertHumidityMin}%)`,
      currentValue: values.humidity,
      thresholdValue: device.alertHumidityMin
    },
    {
      condition: values.co2 !== null && device.alertCo2Max !== null && values.co2 > device.alertCo2Max,
      type: "co2_high",
      message: `\u{1F3ED} CO\u2082 alto: ${values.co2} ppm (limite: ${device.alertCo2Max} ppm)`,
      currentValue: values.co2,
      thresholdValue: device.alertCo2Max
    },
    {
      condition: values.power !== null && device.alertPowerMax !== null && values.power > device.alertPowerMax,
      type: "power_high",
      message: `\u26A1 Pot\xEAncia alta: ${values.power?.toFixed(1)}W (limite: ${device.alertPowerMax}W)`,
      currentValue: values.power,
      thresholdValue: device.alertPowerMax
    }
  ];
  for (const check of checks) {
    if (!check.condition) continue;
    const fullMessage = `\u{1F514} <b>Alerta Tuya \u2014 ${device.name}</b>
${check.message}
\u{1F550} ${(/* @__PURE__ */ new Date()).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}`;
    try {
      await createSnmpAlert({
        powerSourceId: device.powerSourceId ?? 0,
        alertType: "temp_high",
        // mapeamento genérico
        severity: "warning",
        message: check.message,
        currentValue: check.currentValue ?? void 0,
        thresholdValue: check.thresholdValue ?? void 0
      });
    } catch {
    }
    if (telegramConfig) {
      await sendTelegramMessage(telegramConfig, fullMessage);
    }
  }
}
async function pollSingleTuyaDevice(deviceId) {
  const device = await getTuyaDeviceById(deviceId);
  if (!device) return;
  const settings = await getSystemSettings();
  let accessId;
  let accessSecret;
  let region = "us";
  if (device.tuyaAccountId) {
    const account = await getTuyaAccountById(device.tuyaAccountId);
    if (account) {
      accessId = account.accessId;
      accessSecret = account.accessSecret;
      region = account.region;
    }
  }
  if (!accessId || !accessSecret) {
    accessId = settings.tuya_access_id;
    accessSecret = settings.tuya_access_secret;
    region = settings.tuya_region ?? "us";
  }
  if (!accessId || !accessSecret) {
    await updateTuyaDeviceStatus(deviceId, {
      status: "unknown",
      lastPolledAt: /* @__PURE__ */ new Date(),
      lastPollError: "Credenciais Tuya n\xE3o configuradas. Vincule uma conta ao dispositivo ou configure a conta global em Sistema \u2192 Tuya IoT."
    });
    return;
  }
  const config = { accessId, accessSecret, region };
  try {
    const statuses = await getTuyaDeviceStatus(config, device.deviceId);
    const values = extractValues(statuses);
    const rawData = JSON.stringify(statuses);
    await updateTuyaDeviceStatus(deviceId, {
      status: "online",
      lastPolledAt: /* @__PURE__ */ new Date(),
      lastPollError: null,
      lastTemperature: values.temperature,
      lastHumidity: values.humidity,
      lastCo2: values.co2,
      lastPower: values.power,
      lastVoltage: values.voltage,
      lastCurrent: values.current,
      lastRawData: rawData
    });
    await createTuyaReading({
      deviceId,
      temperature: values.temperature ?? void 0,
      humidity: values.humidity ?? void 0,
      co2: values.co2 ?? void 0,
      power: values.power ?? void 0,
      voltage: values.voltage ?? void 0,
      current: values.current ?? void 0,
      rawData
    }).catch(console.error);
    const telegramConfig = settings.telegram_bot_token && settings.telegram_chat_id ? { botToken: settings.telegram_bot_token, chatId: settings.telegram_chat_id } : null;
    await evaluateAlerts(device, values, telegramConfig);
  } catch (err) {
    await updateTuyaDeviceStatus(deviceId, {
      status: "offline",
      lastPolledAt: /* @__PURE__ */ new Date(),
      lastPollError: err.message ?? "Erro desconhecido"
    });
  }
}
function inferDeviceType(category, dps) {
  const cat = (category ?? "").toLowerCase();
  if (["wsdcg", "mcs", "ldcg", "wsd"].includes(cat)) return "temperature_humidity";
  if (["co2bj", "co2"].includes(cat)) return "co2";
  if (["ywbj", "smoke"].includes(cat)) return "smoke";
  if (["pir", "motion"].includes(cat)) return "motion";
  if (["mc", "door", "mcs2"].includes(cat)) return "door";
  if (["cz", "kg", "pc", "dlq", "dlq2", "tdq", "socket", "plug"].includes(cat)) return "power_meter";
  if (dps.some((d) => ["co2_value", "co2"].includes(d))) return "co2";
  if (dps.some((d) => ["cur_power", "phase_a", "power"].includes(d))) return "power_meter";
  if (dps.some((d) => ["temp_current", "va_temperature"].includes(d)) && dps.some((d) => ["humidity_value", "va_humidity"].includes(d))) return "temperature_humidity";
  if (dps.some((d) => ["temp_current", "va_temperature"].includes(d))) return "temperature";
  if (dps.some((d) => ["humidity_value", "va_humidity"].includes(d))) return "humidity";
  return "other";
}
async function syncDevicesFromTuya(accountId) {
  const account = await getTuyaAccountById(accountId);
  if (!account) throw new Error(`Conta Tuya #${accountId} n\xE3o encontrada`);
  const config = {
    accessId: account.accessId,
    accessSecret: account.accessSecret,
    region: account.region
  };
  const token = await getAccessToken(config);
  const baseUrl = REGION_ENDPOINTS[config.region] ?? REGION_ENDPOINTS.us;
  const allDevices = [];
  let lastRowKey = "";
  let hasMore = true;
  while (hasMore) {
    const path7 = `/v1.0/iot-01/associated-users/devices?last_row_key=${encodeURIComponent(lastRowKey)}&page_size=100`;
    const t2 = Date.now();
    const nonce = crypto.randomBytes(8).toString("hex");
    const sign = generateSign(config.accessId, config.accessSecret, t2, nonce, token, "GET", path7.split("?")[0]);
    const res = await fetch(`${baseUrl}${path7}`, {
      method: "GET",
      headers: {
        "client_id": config.accessId,
        "access_token": token,
        "sign": sign,
        "t": String(t2),
        "sign_method": "HMAC-SHA256",
        "nonce": nonce
      }
    });
    const data = await res.json();
    if (!data.success) {
      const path22 = `/v1.0/devices/mine?page_no=1&page_size=100`;
      const t22 = Date.now();
      const nonce2 = crypto.randomBytes(8).toString("hex");
      const sign2 = generateSign(config.accessId, config.accessSecret, t22, nonce2, token, "GET", path22.split("?")[0]);
      const res2 = await fetch(`${baseUrl}${path22}`, {
        method: "GET",
        headers: {
          "client_id": config.accessId,
          "access_token": token,
          "sign": sign2,
          "t": String(t22),
          "sign_method": "HMAC-SHA256",
          "nonce": nonce2
        }
      });
      const data2 = await res2.json();
      if (data2.success && data2.result?.list) {
        allDevices.push(...data2.result.list ?? []);
      } else if (data2.success && Array.isArray(data2.result)) {
        allDevices.push(...data2.result);
      }
      break;
    }
    const list = data.result?.devices ?? data.result?.list ?? data.result ?? [];
    allDevices.push(...list);
    const nextKey = data.result?.last_row_key ?? "";
    if (!nextKey || list.length < 100) {
      hasMore = false;
    } else {
      lastRowKey = nextKey;
    }
  }
  const existingDevices = await getTuyaDevices();
  const existingByDeviceId = new Map(existingDevices.map((d) => [d.deviceId, d]));
  const result = { total: allDevices.length, imported: 0, updated: 0, skipped: 0, errors: 0, details: [] };
  for (const remote of allDevices) {
    try {
      const existing = existingByDeviceId.get(remote.id);
      const dps = remote.dps ?? [];
      const type = inferDeviceType(remote.category ?? "", dps);
      if (!existing) {
        const { createTuyaDevice: createTuyaDevice2 } = await Promise.resolve().then(() => (init_db(), db_exports));
        const newId = await createTuyaDevice2({
          name: remote.name ?? `Dispositivo ${remote.id}`,
          deviceId: remote.id,
          type,
          tuyaAccountId: accountId,
          pollInterval: 300,
          alertsEnabled: false,
          status: remote.online ? "online" : "offline"
        });
        scheduleTuyaDevice(newId, 300);
        result.imported++;
        result.details.push({ deviceId: remote.id, name: remote.name ?? remote.id, action: "imported" });
      } else {
        const { updateTuyaDevice: updateTuyaDevice2 } = await Promise.resolve().then(() => (init_db(), db_exports));
        const nameChanged = remote.name && remote.name !== existing.name;
        const statusChanged = (remote.online ? "online" : "offline") !== existing.status;
        if (nameChanged || statusChanged) {
          await updateTuyaDevice2(existing.id, {
            ...nameChanged ? { name: remote.name } : {},
            ...statusChanged ? { status: remote.online ? "online" : "offline" } : {}
          });
          result.updated++;
          result.details.push({ deviceId: remote.id, name: remote.name ?? remote.id, action: "updated" });
        } else {
          result.skipped++;
          result.details.push({ deviceId: remote.id, name: remote.name ?? remote.id, action: "skipped", reason: "Sem altera\xE7\xF5es" });
        }
      }
    } catch (err) {
      result.errors++;
      result.details.push({ deviceId: remote.id, name: remote.name ?? remote.id, action: "error", reason: err.message });
    }
  }
  return result;
}
var pollTimers = /* @__PURE__ */ new Map();
function scheduleTuyaDevice(deviceId, intervalSeconds) {
  if (pollTimers.has(deviceId)) {
    clearInterval(pollTimers.get(deviceId));
  }
  const timer = setInterval(() => {
    pollSingleTuyaDevice(deviceId).catch(console.error);
  }, intervalSeconds * 1e3);
  pollTimers.set(deviceId, timer);
}
function unscheduleTuyaDevice(deviceId) {
  if (pollTimers.has(deviceId)) {
    clearInterval(pollTimers.get(deviceId));
    pollTimers.delete(deviceId);
  }
}

// server/sgpCache.ts
import { request as undiciRequest, FormData as UndiciFormData } from "undici";
async function sgpFetch(url, cfg, options = {}) {
  const { method = "GET", extraFields = {}, timeoutMs = 15e3 } = options;
  const form = new UndiciFormData();
  form.append("token", cfg.token);
  form.append("app", cfg.app);
  for (const [k, v] of Object.entries(extraFields)) form.append(k, v);
  const { statusCode, body } = await undiciRequest(url, {
    method,
    headers: { Authorization: cfg.token },
    body: form,
    bodyTimeout: timeoutMs,
    headersTimeout: timeoutMs
  });
  return {
    ok: statusCode >= 200 && statusCode < 300,
    status: statusCode,
    json: () => body.json()
  };
}
var SGP_CACHE_TTL_MS = 5 * 60 * 1e3;
var cache = /* @__PURE__ */ new Map();
async function sgpCacheGet(key, fetcher, ttlMs = SGP_CACHE_TTL_MS) {
  const now = Date.now();
  const entry = cache.get(key);
  if (entry && entry.expiresAt > now) {
    return entry.data;
  }
  const data = await fetcher();
  cache.set(key, { data, expiresAt: now + ttlMs });
  return data;
}
function sgpCacheInvalidateAll() {
  for (const key of Array.from(cache.keys())) {
    if (key.startsWith("sgp:")) cache.delete(key);
  }
}

// server/routers.ts
init_db();
init_db();

// server/sshCommanderRouter.ts
init_trpc();
init_db();
init_schema();
import { TRPCError as TRPCError3 } from "@trpc/server";
import { z as z2 } from "zod";
import { eq as eq4, desc as desc2 } from "drizzle-orm";

// server/sshExecutor.ts
import { Client } from "ssh2";
function cleanOutput(raw) {
  if (raw.includes("Interface") || raw.includes("GE0/") || raw.includes("Eth-Trunk")) {
    const escaped = raw.slice(0, 500).replace(/[\x00-\x1f\x7f]/g, (c) => `\\x${c.charCodeAt(0).toString(16).padStart(2, "0")}`);
    console.log("[SSH RAW DEBUG]", escaped);
  }
  return raw.replace(/\x1b\[[0-9;]*[mGKHFJABCDEFsuhl]/g, "").replace(/\x1b\[?[0-9;]*[a-zA-Z]/g, "").replace(/\x08+/g, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n").replace(/\n{3,}/g, "\n\n");
}
function isPrompt(data, deviceType) {
  const trimmed = data.trimEnd();
  if (deviceType === "linux") {
    return /[\$#]\s*$/.test(trimmed);
  }
  return /[<\[]\S+[>\]]\s*$/.test(trimmed);
}
function executeSSH(config, commands, onData, timeoutMs = 3e4) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const conn = new Client();
    let fullOutput = "";
    let settled = false;
    const finish = (success, error) => {
      if (settled) return;
      settled = true;
      conn.end();
      resolve({
        output: cleanOutput(fullOutput),
        success,
        durationMs: Date.now() - startTime,
        error
      });
    };
    const globalTimeout = setTimeout(() => {
      finish(false, "Timeout: o equipamento n\xE3o respondeu dentro do prazo");
    }, timeoutMs);
    conn.on("ready", () => {
      const deviceType = config.deviceType || "generic";
      conn.shell({ term: "dumb", cols: 512, rows: 50 }, (err, stream) => {
        if (err) {
          clearTimeout(globalTimeout);
          finish(false, err.message);
          return;
        }
        let buffer = "";
        let cmdIndex = 0;
        const allCommands = [];
        if (deviceType !== "linux") {
          allCommands.push("screen-length 0 temporary");
        }
        allCommands.push(...commands);
        const sendNextCommand = () => {
          if (cmdIndex >= allCommands.length) {
            setTimeout(() => {
              clearTimeout(globalTimeout);
              finish(true);
            }, 500);
            return;
          }
          const cmd = allCommands[cmdIndex++];
          stream.write(cmd + "\n");
        };
        stream.on("data", (data) => {
          const chunk = data.toString("utf8");
          buffer += chunk;
          fullOutput += chunk;
          if (onData) {
            onData(cleanOutput(chunk));
          }
          if (isPrompt(buffer, deviceType)) {
            buffer = "";
            setTimeout(sendNextCommand, 150);
          }
        });
        stream.stderr.on("data", (data) => {
          const chunk = data.toString("utf8");
          fullOutput += chunk;
          if (onData) onData(cleanOutput(chunk));
        });
        stream.on("close", () => {
          clearTimeout(globalTimeout);
          finish(true);
        });
        setTimeout(() => {
          sendNextCommand();
        }, 800);
      });
    });
    conn.on("error", (err) => {
      clearTimeout(globalTimeout);
      finish(false, `Erro de conex\xE3o SSH: ${err.message}`);
    });
    const connectConfig = {
      host: config.host,
      port: config.port,
      username: config.username,
      readyTimeout: 15e3,
      keepaliveInterval: 5e3,
      // Aceitar qualquer fingerprint (equivalente a StrictHostKeyChecking=no)
      hostVerifier: () => true
    };
    if (config.authType === "key" && config.privateKey) {
      connectConfig.privateKey = config.privateKey;
    } else {
      connectConfig.password = config.password || "";
    }
    conn.connect(connectConfig);
  });
}
function testSSHConnection(config) {
  return new Promise((resolve) => {
    const start = Date.now();
    const conn = new Client();
    let settled = false;
    const finish = (success, error) => {
      if (settled) return;
      settled = true;
      conn.end();
      resolve({ success, error, latencyMs: Date.now() - start });
    };
    const timeout = setTimeout(() => {
      finish(false, "Timeout: n\xE3o foi poss\xEDvel conectar em 10s");
    }, 1e4);
    conn.on("ready", () => {
      clearTimeout(timeout);
      finish(true);
    });
    conn.on("error", (err) => {
      clearTimeout(timeout);
      finish(false, err.message);
    });
    const connectConfig = {
      host: config.host,
      port: config.port,
      username: config.username,
      readyTimeout: 1e4,
      // Aceitar qualquer fingerprint (equivalente a StrictHostKeyChecking=no)
      hostVerifier: () => true
    };
    if (config.authType === "key" && config.privateKey) {
      connectConfig.privateKey = config.privateKey;
    } else {
      connectConfig.password = config.password || "";
    }
    conn.connect(connectConfig);
  });
}

// server/sshCommanderRouter.ts
var sshCommanderRouter = router({
  // ─── Dispositivos ─────────────────────────────────────────────────────────
  listDevices: protectedProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR" });
    const devices = await db.select().from(sshDevices).orderBy(sshDevices.name);
    return devices.map((d) => ({
      ...d,
      password: d.password ? "***" : null,
      privateKey: d.privateKey ? "***" : null
    }));
  }),
  createDevice: protectedProcedure.input(z2.object({
    name: z2.string().min(1),
    host: z2.string().min(1),
    port: z2.number().default(22),
    username: z2.string().min(1),
    authType: z2.enum(["password", "key"]),
    password: z2.string().optional(),
    privateKey: z2.string().optional(),
    deviceType: z2.string().default("generic"),
    notes: z2.string().optional()
  })).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR" });
    const [result] = await db.insert(sshDevices).values(input);
    return { id: result.insertId };
  }),
  updateDevice: protectedProcedure.input(z2.object({
    id: z2.number(),
    name: z2.string().optional(),
    host: z2.string().optional(),
    port: z2.number().optional(),
    username: z2.string().optional(),
    authType: z2.enum(["password", "key"]).optional(),
    password: z2.string().optional(),
    privateKey: z2.string().optional(),
    deviceType: z2.string().optional(),
    notes: z2.string().optional()
  })).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR" });
    const { id, ...data } = input;
    const updateData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== void 0)
    );
    await db.update(sshDevices).set(updateData).where(eq4(sshDevices.id, id));
    return { updated: true };
  }),
  deleteDevice: protectedProcedure.input(z2.object({ id: z2.number() })).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR" });
    await db.delete(sshDevices).where(eq4(sshDevices.id, input.id));
    return { deleted: true };
  }),
  testConnection: protectedProcedure.input(z2.object({ id: z2.number() })).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR" });
    const [device] = await db.select().from(sshDevices).where(eq4(sshDevices.id, input.id));
    if (!device) throw new TRPCError3({ code: "NOT_FOUND", message: "Dispositivo n\xE3o encontrado" });
    const result = await testSSHConnection({
      host: device.host,
      port: device.port,
      username: device.username,
      authType: device.authType,
      password: device.password || void 0,
      privateKey: device.privateKey || void 0,
      deviceType: device.deviceType || "generic"
    });
    return result;
  }),
  // ─── Execução SSH ─────────────────────────────────────────────────────────
  execute: protectedProcedure.input(z2.object({
    deviceId: z2.number(),
    commands: z2.array(z2.string()).min(1),
    commandName: z2.string().optional()
  })).mutation(async ({ input, ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR" });
    const [device] = await db.select().from(sshDevices).where(eq4(sshDevices.id, input.deviceId));
    if (!device) throw new TRPCError3({ code: "NOT_FOUND", message: "Dispositivo n\xE3o encontrado" });
    const result = await executeSSH(
      {
        host: device.host,
        port: device.port,
        username: device.username,
        authType: device.authType,
        password: device.password || void 0,
        privateKey: device.privateKey || void 0,
        deviceType: device.deviceType || "generic"
      },
      input.commands
    );
    await db.insert(sshExecutions).values({
      deviceId: input.deviceId,
      commandName: input.commandName || null,
      commandText: input.commands.join("\n"),
      output: result.output,
      status: result.success ? "success" : "error",
      durationMs: result.durationMs,
      executedBy: ctx.user?.id || null
    });
    return result;
  }),
  listExecutions: protectedProcedure.input(z2.object({ deviceId: z2.number(), limit: z2.number().default(20) })).query(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR" });
    return db.select().from(sshExecutions).where(eq4(sshExecutions.deviceId, input.deviceId)).orderBy(desc2(sshExecutions.executedAt)).limit(input.limit);
  }),
  clearHistory: protectedProcedure.input(z2.object({ deviceId: z2.number() })).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR" });
    await db.delete(sshExecutions).where(eq4(sshExecutions.deviceId, input.deviceId));
    return { cleared: true };
  }),
  // ─── Comandos Rápidos ─────────────────────────────────────────────────────
  listQuickCommands: protectedProcedure.input(z2.object({ deviceType: z2.string().optional() })).query(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR" });
    const all = await db.select().from(sshQuickCommands).orderBy(sshQuickCommands.category, sshQuickCommands.name);
    if (input.deviceType && input.deviceType !== "all") {
      return all.filter((c) => !c.deviceType || c.deviceType === input.deviceType || c.deviceType === "generic");
    }
    return all;
  }),
  createQuickCommand: protectedProcedure.input(z2.object({
    name: z2.string().min(1),
    description: z2.string().optional(),
    command: z2.string().min(1),
    category: z2.string().default("diagnostico"),
    deviceType: z2.string().default("generic"),
    isDangerous: z2.number().default(0),
    color: z2.string().default("#3B82F6")
  })).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR" });
    const [result] = await db.insert(sshQuickCommands).values(input);
    return { id: result.insertId };
  }),
  updateQuickCommand: protectedProcedure.input(z2.object({
    id: z2.number(),
    name: z2.string().optional(),
    description: z2.string().optional(),
    command: z2.string().optional(),
    category: z2.string().optional(),
    deviceType: z2.string().optional(),
    isDangerous: z2.number().optional(),
    color: z2.string().optional()
  })).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR" });
    const { id, ...data } = input;
    await db.update(sshQuickCommands).set(data).where(eq4(sshQuickCommands.id, id));
    return { updated: true };
  }),
  deleteQuickCommand: protectedProcedure.input(z2.object({ id: z2.number() })).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR" });
    await db.delete(sshQuickCommands).where(eq4(sshQuickCommands.id, input.id));
    return { deleted: true };
  }),
  seedQuickCommands: protectedProcedure.input(z2.object({ deviceType: z2.string().default("all"), overwrite: z2.boolean().default(false) })).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR" });
    const existing = await db.select().from(sshQuickCommands);
    if (existing.length > 0 && !input.overwrite) {
      return { inserted: 0, skipped: existing.length, message: "Comandos j\xE1 existem. Use overwrite=true para substituir." };
    }
    const s6730 = [
      { name: "Display Version", description: "Vers\xE3o do VRP e informa\xE7\xF5es do switch", command: "display version", category: "diagnostico", deviceType: "switch", isDangerous: 0, color: "#3B82F6" },
      { name: "Display Interface Brief", description: "Resumo de todas as interfaces", command: "display interface brief", category: "diagnostico", deviceType: "switch", isDangerous: 0, color: "#3B82F6" },
      { name: "Display IP Routing Table", description: "Tabela de roteamento IP", command: "display ip routing-table", category: "diagnostico", deviceType: "switch", isDangerous: 0, color: "#06B6D4" },
      { name: "Display VLAN", description: "Lista todas as VLANs configuradas", command: "display vlan", category: "vlan", deviceType: "switch", isDangerous: 0, color: "#F59E0B" },
      { name: "Display MAC Address Table", description: "Tabela de endere\xE7os MAC", command: "display mac-address", category: "diagnostico", deviceType: "switch", isDangerous: 0, color: "#3B82F6" },
      { name: "Display CPU Usage", description: "Uso actual da CPU", command: "display cpu-usage", category: "diagnostico", deviceType: "switch", isDangerous: 0, color: "#10B981" },
      { name: "Display Memory Usage", description: "Uso actual da mem\xF3ria", command: "display memory-usage", category: "diagnostico", deviceType: "switch", isDangerous: 0, color: "#10B981" },
      { name: "Display BGP Peer", description: "Resumo dos peers BGP", command: "display bgp peer", category: "bgp", deviceType: "switch", isDangerous: 0, color: "#8B5CF6" },
      { name: "Salvar Configura\xE7\xE3o", description: "Guarda a configura\xE7\xE3o actual na flash", command: "save\ny", category: "manutencao", deviceType: "switch", isDangerous: 0, color: "#10B981" },
      { name: "Display Current Configuration", description: "Mostra a configura\xE7\xE3o actual completa", command: "display current-configuration", category: "manutencao", deviceType: "switch", isDangerous: 0, color: "#10B981" },
      { name: "Reiniciar Switch", description: "Reinicia o equipamento imediatamente", command: "reboot\ny", category: "manutencao", deviceType: "switch", isDangerous: 1, color: "#EF4444" }
    ];
    const ne8000 = [
      { name: "Display Version", description: "Vers\xE3o do VRP e informa\xE7\xF5es do NE8000", command: "display version", category: "diagnostico", deviceType: "ne8000", isDangerous: 0, color: "#3B82F6" },
      { name: "Display BGP Peer", description: "Resumo de todos os peers BGP", command: "display bgp peer", category: "bgp", deviceType: "ne8000", isDangerous: 0, color: "#8B5CF6" },
      { name: "Display BGP Peer Verbose", description: "Detalhes completos de todos os peers BGP", command: "display bgp peer verbose", category: "bgp", deviceType: "ne8000", isDangerous: 0, color: "#8B5CF6" },
      { name: "Display IP Routing Table", description: "Tabela de roteamento IP completa", command: "display ip routing-table", category: "diagnostico", deviceType: "ne8000", isDangerous: 0, color: "#06B6D4" },
      { name: "Display Interface Brief", description: "Resumo de todas as interfaces", command: "display interface brief", category: "diagnostico", deviceType: "ne8000", isDangerous: 0, color: "#3B82F6" },
      { name: "Display MPLS LDP Session", description: "Sess\xF5es LDP activas", command: "display mpls ldp session", category: "diagnostico", deviceType: "ne8000", isDangerous: 0, color: "#8B5CF6" },
      { name: "Display MPLS LSP", description: "Label Switched Paths activos", command: "display mpls lsp", category: "diagnostico", deviceType: "ne8000", isDangerous: 0, color: "#8B5CF6" },
      { name: "Salvar Configura\xE7\xE3o", description: "Guarda a configura\xE7\xE3o actual", command: "save\ny", category: "manutencao", deviceType: "ne8000", isDangerous: 0, color: "#10B981" },
      { name: "Reiniciar NE8000", description: "Reinicia o roteador imediatamente", command: "reboot\ny", category: "manutencao", deviceType: "ne8000", isDangerous: 1, color: "#EF4444" }
    ];
    let templates = [];
    const dt = input.deviceType.toLowerCase();
    if (dt === "switch" || dt === "all") templates = [...templates, ...s6730];
    if (dt === "ne8000" || dt === "all") templates = [...templates, ...ne8000];
    if (templates.length === 0) templates = [...s6730, ...ne8000];
    if (input.overwrite && existing.length > 0) {
      await db.delete(sshQuickCommands);
    }
    await db.insert(sshQuickCommands).values(templates);
    return { inserted: templates.length, skipped: 0, message: `${templates.length} templates inseridos com sucesso` };
  }),
  // ─── BGP Peers ────────────────────────────────────────────────────────────
  listBgpPeers: protectedProcedure.input(z2.object({ deviceId: z2.number() })).query(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR" });
    return db.select().from(bgpPeers).where(eq4(bgpPeers.deviceId, input.deviceId));
  }),
  createBgpPeer: protectedProcedure.input(z2.object({
    deviceId: z2.number(),
    peerIp: z2.string().min(1),
    remoteAs: z2.number(),
    description: z2.string().optional(),
    peerType: z2.enum(["ebgp", "ibgp"]).default("ebgp"),
    localAs: z2.number().optional(),
    activateScript: z2.string().optional(),
    deactivateScript: z2.string().optional(),
    peerIpv6: z2.string().optional(),
    activateScriptV6: z2.string().optional(),
    deactivateScriptV6: z2.string().optional(),
    notes: z2.string().optional()
  })).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR" });
    const [result] = await db.insert(bgpPeers).values(input);
    return { id: result.insertId };
  }),
  updateBgpPeer: protectedProcedure.input(z2.object({
    id: z2.number(),
    peerIp: z2.string().optional(),
    remoteAs: z2.number().optional(),
    description: z2.string().optional(),
    peerType: z2.enum(["ebgp", "ibgp"]).optional(),
    localAs: z2.number().optional(),
    activateScript: z2.string().optional(),
    deactivateScript: z2.string().optional(),
    peerIpv6: z2.string().optional().nullable(),
    activateScriptV6: z2.string().optional().nullable(),
    deactivateScriptV6: z2.string().optional().nullable(),
    notes: z2.string().optional()
  })).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR" });
    const { id, ...data } = input;
    await db.update(bgpPeers).set(data).where(eq4(bgpPeers.id, id));
    return { updated: true };
  }),
  deleteBgpPeer: protectedProcedure.input(z2.object({ id: z2.number() })).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR" });
    await db.delete(bgpPeers).where(eq4(bgpPeers.id, input.id));
    return { deleted: true };
  }),
  executeBgpAction: protectedProcedure.input(z2.object({
    deviceId: z2.number(),
    peerId: z2.number(),
    action: z2.enum(["activate", "deactivate", "status", "activate_v6", "deactivate_v6"])
  })).mutation(async ({ input, ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR" });
    const [device] = await db.select().from(sshDevices).where(eq4(sshDevices.id, input.deviceId));
    if (!device) throw new TRPCError3({ code: "NOT_FOUND", message: "Dispositivo n\xE3o encontrado" });
    const [peer] = await db.select().from(bgpPeers).where(eq4(bgpPeers.id, input.peerId));
    if (!peer) throw new TRPCError3({ code: "NOT_FOUND", message: "BGP Peer n\xE3o encontrado" });
    const replacePeerVars = (script, ip) => script.replace(/\{PEER_IP\}/g, ip).replace(/\{LOCAL_AS\}/g, String(peer.localAs ?? "")).replace(/\{REMOTE_AS\}/g, String(peer.remoteAs ?? ""));
    let commands = [];
    if (input.action === "status") {
      const ipv6Part = peer.peerIpv6 ? `
display bgp ipv6 peer ${peer.peerIpv6} verbose` : "";
      commands = [`display bgp peer ${peer.peerIp} verbose${ipv6Part}`].flatMap((s) => s.split("\n"));
    } else if (input.action === "activate" && peer.activateScript) {
      commands = replacePeerVars(peer.activateScript, peer.peerIp).split("\n").filter(Boolean);
    } else if (input.action === "deactivate" && peer.deactivateScript) {
      commands = replacePeerVars(peer.deactivateScript, peer.peerIp).split("\n").filter(Boolean);
    } else if (input.action === "activate_v6" && peer.activateScriptV6 && peer.peerIpv6) {
      commands = replacePeerVars(peer.activateScriptV6, peer.peerIpv6).split("\n").filter(Boolean);
    } else if (input.action === "deactivate_v6" && peer.deactivateScriptV6 && peer.peerIpv6) {
      commands = replacePeerVars(peer.deactivateScriptV6, peer.peerIpv6).split("\n").filter(Boolean);
    } else {
      commands = [`display bgp peer ${peer.peerIp}`];
    }
    const result = await executeSSH(
      {
        host: device.host,
        port: device.port,
        username: device.username,
        authType: device.authType,
        password: device.password || void 0,
        privateKey: device.privateKey || void 0,
        deviceType: device.deviceType || "generic"
      },
      commands
    );
    await db.insert(sshExecutions).values({
      deviceId: input.deviceId,
      commandName: `BGP ${input.action} \u2014 ${peer.peerIp}`,
      commandText: commands.join("\n"),
      output: result.output,
      status: result.success ? "success" : "error",
      durationMs: result.durationMs,
      executedBy: ctx.user?.id || null
    });
    return result;
  }),
  // ─── Comandos por Dispositivo ────────────────────────────────────────────────
  listDeviceCommands: protectedProcedure.input(z2.object({ deviceId: z2.number() })).query(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR" });
    return db.select().from(sshDeviceCommands).where(eq4(sshDeviceCommands.deviceId, input.deviceId)).orderBy(sshDeviceCommands.sortOrder, sshDeviceCommands.name);
  }),
  createDeviceCommand: protectedProcedure.input(z2.object({
    deviceId: z2.number(),
    name: z2.string().min(1),
    description: z2.string().optional(),
    command: z2.string().min(1),
    category: z2.string().default("diagnostico"),
    isDangerous: z2.number().default(0),
    color: z2.string().default("#3B82F6"),
    sortOrder: z2.number().default(0)
  })).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR" });
    const [result] = await db.insert(sshDeviceCommands).values(input);
    return { id: result.insertId };
  }),
  updateDeviceCommand: protectedProcedure.input(z2.object({
    id: z2.number(),
    name: z2.string().optional(),
    description: z2.string().optional(),
    command: z2.string().optional(),
    category: z2.string().optional(),
    isDangerous: z2.number().optional(),
    color: z2.string().optional(),
    sortOrder: z2.number().optional()
  })).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR" });
    const { id, ...data } = input;
    const updateData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== void 0)
    );
    await db.update(sshDeviceCommands).set(updateData).where(eq4(sshDeviceCommands.id, id));
    return { updated: true };
  }),
  deleteDeviceCommand: protectedProcedure.input(z2.object({ id: z2.number() })).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR" });
    await db.delete(sshDeviceCommands).where(eq4(sshDeviceCommands.id, input.id));
    return { deleted: true };
  })
});

// server/routers.ts
init_genieacsRouter();

// server/routers/networkSnmpRouter.ts
init_trpc();
init_db();
init_schema();
import { z as z4 } from "zod";
import { eq as eq8, and as and4, desc as desc3, isNull as isNull3, sql as sql4 } from "drizzle-orm";
import { TRPCError as TRPCError4 } from "@trpc/server";

// server/networkSnmpPoller.ts
init_db();
init_schema();
import * as snmp2 from "net-snmp";
import { eq as eq7, and as and3, isNull as isNull2 } from "drizzle-orm";
var OID = {
  // System
  sysDescr: "1.3.6.1.2.1.1.1.0",
  sysUpTime: "1.3.6.1.2.1.1.3.0",
  sysName: "1.3.6.1.2.1.1.5.0",
  // IF-MIB (tabela de interfaces)
  ifNumber: "1.3.6.1.2.1.2.1.0",
  ifDescr: "1.3.6.1.2.1.2.2.1.2",
  // tabela: ifDescr.ifIndex
  ifType: "1.3.6.1.2.1.2.2.1.3",
  ifSpeed: "1.3.6.1.2.1.2.2.1.5",
  ifOperStatus: "1.3.6.1.2.1.2.2.1.8",
  ifAdminStatus: "1.3.6.1.2.1.2.2.1.7",
  ifInOctets: "1.3.6.1.2.1.2.2.1.10",
  ifOutOctets: "1.3.6.1.2.1.2.2.1.16",
  // IF-MIB HC (64-bit) — obrigatório para portas 10G/100G (RFC 2863)
  ifHCInOctets: "1.3.6.1.2.1.31.1.1.1.6",
  // ifHCInOctets  (64-bit)
  ifHCOutOctets: "1.3.6.1.2.1.31.1.1.1.10",
  // ifHCOutOctets (64-bit)
  ifHighSpeed: "1.3.6.1.2.1.31.1.1.1.15",
  // ifHighSpeed em Mbps (para portas >1G)
  ifAlias: "1.3.6.1.2.1.31.1.1.1.18",
  // IF-MIB ifAlias
  // HOST-RESOURCES-MIB (CPU e memória)
  hrProcessorLoad: "1.3.6.1.2.1.25.3.3.1.2",
  // tabela: hrProcessorLoad.index
  hrStorageUsed: "1.3.6.1.2.1.25.2.3.1.6",
  hrStorageSize: "1.3.6.1.2.1.25.2.3.1.5",
  hrStorageType: "1.3.6.1.2.1.25.2.3.1.2",
  hrStorageRam: "1.3.6.1.2.1.25.2.1.2",
  // OID do tipo RAM
  // Temperatura — varia por fabricante, tentamos os mais comuns
  // Cisco: 1.3.6.1.4.1.9.9.13.1.3.1.3
  // Huawei: 1.3.6.1.4.1.2011.5.25.31.1.1.1.1.11
  // MikroTik: 1.3.6.1.4.1.14988.1.1.3.10.0
  // Datacom: 1.3.6.1.4.1.3709.3.5.203.1.1.5.1.1
  tempCisco: "1.3.6.1.4.1.9.9.13.1.3.1.3.1",
  tempHuawei: "1.3.6.1.4.1.2011.5.25.31.1.1.1.1.11.0",
  tempMikrotik: "1.3.6.1.4.1.14988.1.1.3.10.0",
  // GBIC / DOM (Digital Optical Monitoring) — ENTITY-SENSOR-MIB ou vendor-specific
  // MikroTik: 1.3.6.1.4.1.14988.1.1.19.1.1 (sfp table)
  sfpRxPowerMikrotik: "1.3.6.1.4.1.14988.1.1.19.1.1.4",
  sfpTxPowerMikrotik: "1.3.6.1.4.1.14988.1.1.19.1.1.5",
  sfpTempMikrotik: "1.3.6.1.4.1.14988.1.1.19.1.1.2",
  // Huawei DOM — hwEntityOpticalInfoTable (1.3.6.1.4.1.2011.5.25.31.1.1.3.1)
  // Índice = entPhysicalIndex do módulo óptico (obtido via hwEntityOpticalIfIndex)
  hwOptRxPower: "1.3.6.1.4.1.2011.5.25.31.1.1.3.1.4",
  // RX em 0.01 dBm
  hwOptTxPower: "1.3.6.1.4.1.2011.5.25.31.1.1.3.1.6",
  // TX em 0.01 dBm
  hwOptTemp: "1.3.6.1.4.1.2011.5.25.31.1.1.3.1.2",
  // Temperatura em 0.01 °C
  hwOptIfIndex: "1.3.6.1.4.1.2011.5.25.31.1.1.3.1.13"
  // ifIndex da porta associada
};
function createSession4(config) {
  const version = config.snmpVersion === "v3" ? snmp2.Version3 : config.snmpVersion === "v1" ? snmp2.Version1 : snmp2.Version2c;
  if (config.snmpVersion === "v3" && config.snmpV3User) {
    return snmp2.createV3Session(
      config.snmpHost,
      {
        name: config.snmpV3User,
        level: config.snmpV3AuthKey && config.snmpV3PrivKey ? snmp2.SecurityLevel.authPriv : config.snmpV3AuthKey ? snmp2.SecurityLevel.authNoPriv : snmp2.SecurityLevel.noAuthNoPriv,
        authProtocol: config.snmpV3AuthProto === "SHA" ? snmp2.AuthProtocols.sha : snmp2.AuthProtocols.md5,
        authKey: config.snmpV3AuthKey ?? "",
        privProtocol: config.snmpV3PrivProto === "AES" ? snmp2.PrivProtocols.aes : snmp2.PrivProtocols.des,
        privKey: config.snmpV3PrivKey ?? ""
      },
      { port: config.snmpPort ?? 161, version }
    );
  }
  return snmp2.createSession(
    config.snmpHost,
    config.snmpCommunity ?? "public",
    { port: config.snmpPort ?? 161, version, timeout: 5e3, retries: 1 }
  );
}
function snmpGet(session, oids) {
  return new Promise((resolve, reject) => {
    session.get(oids, (error, varbinds) => {
      if (error) return reject(error);
      const result = {};
      for (const vb of varbinds ?? []) {
        if (!snmp2.isVarbindError(vb)) {
          result[vb.oid] = vb;
        }
      }
      resolve(result);
    });
  });
}
function snmpGetSubtree(session, rootOid, debug = false) {
  return new Promise((resolve) => {
    const results = [];
    const MAX_ITER = 2e3;
    let iterations = 0;
    const root = rootOid.endsWith(".") ? rootOid.slice(0, -1) : rootOid;
    function step(currentOid) {
      if (iterations++ > MAX_ITER) {
        if (debug) console.log(`[snmpGetSubtree] MAX_ITER atingido em ${currentOid}, retornando ${results.length} entradas`);
        return resolve(results);
      }
      session.getNext([currentOid], (error, varbinds) => {
        if (error) {
          if (debug) console.log(`[snmpGetSubtree] getNext erro em ${currentOid}: ${error.message}`);
          return resolve(results);
        }
        if (!varbinds || varbinds.length === 0) {
          if (debug) console.log(`[snmpGetSubtree] getNext retornou array vazio em ${currentOid}`);
          return resolve(results);
        }
        const vb = varbinds[0];
        if (!vb || !vb.oid) {
          if (debug) console.log(`[snmpGetSubtree] Varbind undefined/null em ${currentOid}`);
          return resolve(results);
        }
        if (!vb.oid.startsWith(root + ".") && vb.oid !== root) {
          if (debug) console.log(`[snmpGetSubtree] Saiu da \xE1rvore: ${vb.oid} (raiz=${root}), total=${results.length}`);
          return resolve(results);
        }
        if (snmp2.isVarbindError(vb)) {
          if (debug) console.log(`[snmpGetSubtree] Erro SNMP no varbind ${vb.oid}: type=${vb.type}`);
          return resolve(results);
        }
        if (results.length > 0 && results[results.length - 1].oid === vb.oid) {
          if (debug) console.log(`[snmpGetSubtree] OID repetido ${vb.oid}, parando`);
          return resolve(results);
        }
        if (debug) console.log(`[snmpGetSubtree] [${iterations}] ${vb.oid} = ${JSON.stringify(vb.value)}`);
        results.push(vb);
        step(vb.oid);
      });
    }
    step(root);
  });
}
function varbindValue(vb) {
  if (!vb) return null;
  const v = vb.value;
  if (Buffer.isBuffer(v)) return v.toString("utf8").replace(/\0/g, "").trim();
  if (typeof v === "number") return v;
  if (typeof v === "string") return v;
  return null;
}
function toNumber(v) {
  if (v === null) return null;
  const n = typeof v === "number" ? v : parseFloat(v);
  return isNaN(n) ? null : n;
}
function ticksToSeconds(ticks) {
  return Math.floor(ticks / 100);
}
var SNMP_OID = OID;
async function pollNetworkEquipment(equipmentId) {
  const db = await getDb();
  if (!db) return;
  const [cfg] = await db.select().from(networkSnmpConfig).where(eq7(networkSnmpConfig.equipmentId, equipmentId));
  if (!cfg || !cfg.enabled || !cfg.snmpHost) {
    console.log(`[NetworkSNMP] poll(${equipmentId}): cfg ausente/disabled/sem host. cfg=${JSON.stringify(cfg ? { enabled: cfg.enabled, host: cfg.snmpHost } : null)}`);
    return;
  }
  console.log(`[NetworkSNMP] Iniciando poll equipmentId=${equipmentId} host=${cfg.snmpHost}:${cfg.snmpPort} version=${cfg.snmpVersion}`);
  const [eq_] = await db.select({ name: equipments.name, manufacturer: equipments.manufacturer }).from(equipments).where(eq7(equipments.id, equipmentId));
  const session = createSession4(cfg);
  const now = /* @__PURE__ */ new Date();
  try {
    let cpuPercent = null;
    let memPercent = null;
    let temperature = null;
    let uptimeSeconds = null;
    try {
      const sysVbs = await snmpGet(session, [OID.sysUpTime]);
      const uptime = toNumber(varbindValue(sysVbs[OID.sysUpTime]));
      if (uptime !== null) uptimeSeconds = ticksToSeconds(uptime);
    } catch (_) {
    }
    try {
      const cpuVbs = await snmpGetSubtree(session, OID.hrProcessorLoad);
      if (cpuVbs.length > 0) {
        const loads = cpuVbs.map((v) => toNumber(varbindValue(v))).filter((v) => v !== null);
        if (loads.length > 0) {
          cpuPercent = Math.round(loads.reduce((a, b) => a + b, 0) / loads.length);
        }
      }
    } catch (_) {
    }
    try {
      const storageTypes = await snmpGetSubtree(session, OID.hrStorageType);
      for (const typeVb of storageTypes) {
        const oidParts = typeVb.oid.split(".");
        const idx = oidParts[oidParts.length - 1];
        const typeVal = varbindValue(typeVb);
        if (typeof typeVal === "string" && typeVal.includes("1.3.6.1.2.1.25.2.1.2")) {
          const usedOid = `${OID.hrStorageUsed}.${idx}`;
          const sizeOid = `${OID.hrStorageSize}.${idx}`;
          const memVbs = await snmpGet(session, [usedOid, sizeOid]);
          const used = toNumber(varbindValue(memVbs[usedOid]));
          const size = toNumber(varbindValue(memVbs[sizeOid]));
          if (used !== null && size !== null && size > 0) {
            memPercent = Math.round(used / size * 100);
          }
          break;
        }
      }
    } catch (_) {
    }
    const manufacturer = (eq_?.manufacturer ?? "").toLowerCase();
    const tempOids = [];
    if (manufacturer.includes("mikrotik")) tempOids.push(OID.tempMikrotik);
    if (manufacturer.includes("huawei")) tempOids.push(OID.tempHuawei);
    if (manufacturer.includes("cisco")) tempOids.push(OID.tempCisco);
    if (tempOids.length === 0) {
      tempOids.push(OID.tempMikrotik, OID.tempHuawei, OID.tempCisco);
    }
    for (const tempOid of tempOids) {
      try {
        const tempVbs = await snmpGet(session, [tempOid]);
        const t2 = toNumber(varbindValue(tempVbs[tempOid]));
        if (t2 !== null && t2 > 0 && t2 < 200) {
          temperature = t2;
          break;
        }
      } catch (_) {
      }
    }
    await db.insert(networkSnmpReadings).values({
      equipmentId,
      cpuPercent: cpuPercent ?? void 0,
      memPercent: memPercent ?? void 0,
      temperature: temperature ?? void 0,
      uptimeSeconds: uptimeSeconds ?? void 0
    });
    try {
      const ifDescrVbs = await snmpGetSubtree(session, OID.ifDescr);
      console.log(`[NetworkSNMP] poll(${equipmentId}): ifDescr subtree retornou ${ifDescrVbs.length} entradas`);
      const ifIndexes = ifDescrVbs.map((v) => {
        const parts = v.oid.split(".");
        return parseInt(parts[parts.length - 1]);
      });
      for (const ifIndex of ifIndexes) {
        const oids = [
          `${OID.ifDescr}.${ifIndex}`,
          `${OID.ifType}.${ifIndex}`,
          `${OID.ifSpeed}.${ifIndex}`,
          `${OID.ifHighSpeed}.${ifIndex}`,
          // Mbps para portas >1G
          `${OID.ifOperStatus}.${ifIndex}`,
          `${OID.ifAdminStatus}.${ifIndex}`,
          `${OID.ifInOctets}.${ifIndex}`,
          `${OID.ifOutOctets}.${ifIndex}`,
          `${OID.ifHCInOctets}.${ifIndex}`,
          // 64-bit (10G/100G)
          `${OID.ifHCOutOctets}.${ifIndex}`,
          // 64-bit (10G/100G)
          `${OID.ifAlias}.${ifIndex}`
        ];
        let ifVbs = {};
        try {
          ifVbs = await snmpGet(session, oids);
        } catch (_) {
          continue;
        }
        const ifName = String(varbindValue(ifVbs[`${OID.ifDescr}.${ifIndex}`]) ?? "");
        const ifAlias = String(varbindValue(ifVbs[`${OID.ifAlias}.${ifIndex}`]) ?? "");
        const rawSpeed = toNumber(varbindValue(ifVbs[`${OID.ifSpeed}.${ifIndex}`]));
        const rawHighSpeed = toNumber(varbindValue(ifVbs[`${OID.ifHighSpeed}.${ifIndex}`]));
        const ifSpeed = rawHighSpeed !== null && rawHighSpeed > 0 ? rawHighSpeed * 1e6 : rawSpeed === null || rawSpeed >= 4294967295 ? null : rawSpeed;
        const ifType = String(varbindValue(ifVbs[`${OID.ifType}.${ifIndex}`]) ?? "");
        const operStatusRaw = toNumber(varbindValue(ifVbs[`${OID.ifOperStatus}.${ifIndex}`]));
        const adminStatusRaw = toNumber(varbindValue(ifVbs[`${OID.ifAdminStatus}.${ifIndex}`]));
        const MAX_SAFE_BIGINT = 9007199254740991;
        const rawHCIn = toNumber(varbindValue(ifVbs[`${OID.ifHCInOctets}.${ifIndex}`]));
        const rawHCOut = toNumber(varbindValue(ifVbs[`${OID.ifHCOutOctets}.${ifIndex}`]));
        const rawIn = toNumber(varbindValue(ifVbs[`${OID.ifInOctets}.${ifIndex}`]));
        const rawOut = toNumber(varbindValue(ifVbs[`${OID.ifOutOctets}.${ifIndex}`]));
        const bestIn = rawHCIn !== null ? rawHCIn : rawIn;
        const bestOut = rawHCOut !== null ? rawHCOut : rawOut;
        const inOctets = bestIn !== null ? Math.min(bestIn, MAX_SAFE_BIGINT) : null;
        const outOctets = bestOut !== null ? Math.min(bestOut, MAX_SAFE_BIGINT) : null;
        const operStatusMap = {
          1: "up",
          2: "down",
          3: "testing",
          4: "unknown",
          5: "dormant",
          6: "notPresent",
          7: "lowerLayerDown"
        };
        const adminStatusMap = { 1: "up", 2: "down", 3: "testing" };
        const operStatus = operStatusMap[operStatusRaw ?? 4] ?? "unknown";
        const adminStatus = adminStatusMap[adminStatusRaw ?? 1] ?? "up";
        const [existingPort] = await db.select().from(networkSnmpPorts).where(
          and3(
            eq7(networkSnmpPorts.equipmentId, equipmentId),
            eq7(networkSnmpPorts.ifIndex, ifIndex)
          )
        );
        let inBps = null;
        let outBps = null;
        if (existingPort && existingPort.lastInOctets !== null && inOctets !== null && existingPort.lastOutOctets !== null && outOctets !== null) {
          const lastPollMs = existingPort.lastPollAt ? new Date(existingPort.lastPollAt).getTime() : 0;
          const elapsedMs = lastPollMs > 0 ? now.getTime() - lastPollMs : (cfg.pollInterval ?? 300) * 1e3;
          const elapsed = elapsedMs / 1e3;
          const WRAP32 = 4294967296;
          let inDiff = inOctets - existingPort.lastInOctets;
          let outDiff = outOctets - existingPort.lastOutOctets;
          if (inDiff < 0 && inDiff > -WRAP32) inDiff += WRAP32;
          if (outDiff < 0 && outDiff > -WRAP32) outDiff += WRAP32;
          const MAX_BPS = 1e11;
          const maxOctets = MAX_BPS / 8 * elapsed;
          if (inDiff >= 0 && inDiff <= maxOctets && elapsed > 0)
            inBps = Math.round(inDiff * 8 / elapsed);
          if (outDiff >= 0 && outDiff <= maxOctets && elapsed > 0)
            outBps = Math.round(outDiff * 8 / elapsed);
        }
        if (existingPort) {
          await db.update(networkSnmpPorts).set({
            ifName: ifName || void 0,
            ifAlias: ifAlias || void 0,
            ifSpeed: ifSpeed ?? void 0,
            ifType: ifType || void 0,
            ifOperStatus: operStatus,
            ifAdminStatus: adminStatus,
            lastInBps: inBps ?? void 0,
            lastOutBps: outBps ?? void 0,
            lastInOctets: inOctets ?? void 0,
            lastOutOctets: outOctets ?? void 0,
            lastPollAt: now
          }).where(eq7(networkSnmpPorts.id, existingPort.id));
          if (inBps !== null || outBps !== null) {
            try {
              await db.insert(networkPortReadings).values({
                portId: existingPort.id,
                equipmentId,
                inBps: inBps ?? void 0,
                outBps: outBps ?? void 0
              });
              console.log(`[NetworkSNMP] poll(${equipmentId}): INSERT portReadings portId=${existingPort.id} inBps=${inBps} outBps=${outBps}`);
            } catch (insertErr) {
              console.error(`[NetworkSNMP] poll(${equipmentId}): ERRO INSERT portReadings portId=${existingPort.id}:`, insertErr?.message ?? insertErr);
            }
          }
          if (existingPort.alertBpsMax !== null && existingPort.alertBpsMax !== void 0) {
            const maxBps = Math.max(inBps ?? 0, outBps ?? 0);
            if (maxBps > existingPort.alertBpsMax) {
              const maxMbps = (maxBps / 1e6).toFixed(2);
              const threshMbps = (existingPort.alertBpsMax / 1e6).toFixed(2);
              await createNetworkAlert(
                equipmentId,
                existingPort.id,
                "traffic_high",
                "warning",
                `Tr\xE1fego alto em ${ifName}: ${maxMbps} Mbps (limite: ${threshMbps} Mbps)`,
                maxBps,
                existingPort.alertBpsMax
              );
            }
          }
          if (operStatus === "down" && adminStatus === "up") {
            await createNetworkAlert(
              equipmentId,
              existingPort.id,
              "port_down",
              "warning",
              `Porta ${ifName} (ifIndex ${ifIndex}) est\xE1 DOWN`,
              null,
              null
            );
          }
        } else {
          await db.insert(networkSnmpPorts).values({
            equipmentId,
            ifIndex,
            ifName: ifName || void 0,
            ifAlias: ifAlias || void 0,
            ifSpeed: ifSpeed ?? void 0,
            ifType: ifType || void 0,
            ifOperStatus: operStatus,
            ifAdminStatus: adminStatus,
            lastInOctets: inOctets ?? void 0,
            lastOutOctets: outOctets ?? void 0,
            lastPollAt: now
          });
        }
      }
    } catch (ifErr) {
      console.error(`[NetworkSNMP] poll(${equipmentId}): erro na se\xE7\xE3o de interfaces:`, ifErr);
    }
    if (manufacturer.includes("mikrotik")) {
      try {
        const rxVbs = await snmpGetSubtree(session, OID.sfpRxPowerMikrotik);
        const txVbs = await snmpGetSubtree(session, OID.sfpTxPowerMikrotik);
        const tempVbs = await snmpGetSubtree(session, OID.sfpTempMikrotik);
        for (const rxVb of rxVbs) {
          const parts = rxVb.oid.split(".");
          const sfpIdx = parseInt(parts[parts.length - 1]);
          const rxRaw = toNumber(varbindValue(rxVb));
          const txVb = txVbs.find((v) => v.oid.endsWith(`.${sfpIdx}`));
          const tempVb = tempVbs.find((v) => v.oid.endsWith(`.${sfpIdx}`));
          const rxDbm = rxRaw !== null ? rxRaw / 1e3 : null;
          const txDbm = txVb ? (toNumber(varbindValue(txVb)) ?? 0) / 1e3 : null;
          const gbicTemp = tempVb ? toNumber(varbindValue(tempVb)) : null;
          const [port] = await db.select().from(networkSnmpPorts).where(
            and3(
              eq7(networkSnmpPorts.equipmentId, equipmentId),
              eq7(networkSnmpPorts.ifIndex, sfpIdx)
            )
          );
          if (port) {
            await db.update(networkSnmpPorts).set({
              gbicEnabled: true,
              lastRxPowerDbm: rxDbm ?? void 0,
              lastTxPowerDbm: txDbm ?? void 0,
              lastGbicTemp: gbicTemp ?? void 0
            }).where(eq7(networkSnmpPorts.id, port.id));
            await db.insert(networkPortReadings).values({
              portId: port.id,
              equipmentId,
              rxPowerDbm: rxDbm ?? void 0,
              txPowerDbm: txDbm ?? void 0,
              gbicTemp: gbicTemp ?? void 0
            });
            if (rxDbm !== null && port.alertRxMin !== null && rxDbm < port.alertRxMin) {
              await createNetworkAlert(
                equipmentId,
                port.id,
                "rx_power_low",
                "warning",
                `Sinal RX baixo em ${port.ifName}: ${rxDbm.toFixed(2)} dBm (m\xEDn: ${port.alertRxMin} dBm)`,
                rxDbm,
                port.alertRxMin
              );
            }
          }
        }
      } catch (_) {
      }
    }
    if (manufacturer.includes("huawei")) {
      try {
        const ifIndexVbs = await snmpGetSubtree(session, OID.hwOptIfIndex);
        console.log(`[NetworkSNMP] GBIC Huawei(${equipmentId}): hwOptIfIndex retornou ${ifIndexVbs.length} entradas`);
        if (ifIndexVbs.length > 0) {
          const rxVbs = await snmpGetSubtree(session, OID.hwOptRxPower);
          const txVbs = await snmpGetSubtree(session, OID.hwOptTxPower);
          const tmpVbs = await snmpGetSubtree(session, OID.hwOptTemp);
          console.log(`[NetworkSNMP] GBIC Huawei(${equipmentId}): rxVbs=${rxVbs.length} txVbs=${txVbs.length} tmpVbs=${tmpVbs.length}`);
          for (const ifIdxVb of ifIndexVbs) {
            const parts = ifIdxVb.oid.split(".");
            const physIdx = parts[parts.length - 1];
            const ifIdxVal = toNumber(varbindValue(ifIdxVb));
            if (ifIdxVal === null || ifIdxVal === 0) continue;
            const rxVb = rxVbs.find((v) => v.oid.endsWith(`.${physIdx}`));
            const txVb = txVbs.find((v) => v.oid.endsWith(`.${physIdx}`));
            const tmpVb = tmpVbs.find((v) => v.oid.endsWith(`.${physIdx}`));
            const rxRaw = rxVb ? toNumber(varbindValue(rxVb)) : null;
            const txRaw = txVb ? toNumber(varbindValue(txVb)) : null;
            const tRaw = tmpVb ? toNumber(varbindValue(tmpVb)) : null;
            const rxDbm = rxRaw !== null ? rxRaw / 100 : null;
            const txDbm = txRaw !== null ? txRaw / 100 : null;
            const gbicTemp = tRaw !== null ? tRaw / 100 : null;
            console.log(`[NetworkSNMP] GBIC Huawei(${equipmentId}): physIdx=${physIdx} ifIdx=${ifIdxVal} rxRaw=${rxRaw} txRaw=${txRaw} rxDbm=${rxDbm} txDbm=${txDbm}`);
            if (rxDbm === null && txDbm === null) continue;
            if (rxDbm !== null && (rxDbm < -50 || rxDbm > 10)) {
              console.log(`[NetworkSNMP] GBIC Huawei(${equipmentId}): physIdx=${physIdx} IGNORADO rxDbm=${rxDbm} fora do range [-50,10]`);
              continue;
            }
            const [port] = await db.select().from(networkSnmpPorts).where(
              and3(
                eq7(networkSnmpPorts.equipmentId, equipmentId),
                eq7(networkSnmpPorts.ifIndex, ifIdxVal)
              )
            );
            if (port) {
              await db.update(networkSnmpPorts).set({
                gbicEnabled: true,
                lastRxPowerDbm: rxDbm ?? void 0,
                lastTxPowerDbm: txDbm ?? void 0,
                lastGbicTemp: gbicTemp ?? void 0
              }).where(eq7(networkSnmpPorts.id, port.id));
              await db.insert(networkPortReadings).values({
                portId: port.id,
                equipmentId,
                rxPowerDbm: rxDbm ?? void 0,
                txPowerDbm: txDbm ?? void 0,
                gbicTemp: gbicTemp ?? void 0
              });
              if (rxDbm !== null && port.alertRxMin !== null && rxDbm < port.alertRxMin) {
                await createNetworkAlert(
                  equipmentId,
                  port.id,
                  "rx_power_low",
                  "warning",
                  `Sinal RX baixo em ${port.ifName}: ${rxDbm.toFixed(2)} dBm (m\xEDn: ${port.alertRxMin} dBm)`,
                  rxDbm,
                  port.alertRxMin
                );
              }
            }
          }
        }
      } catch (_) {
      }
    }
    if (cfg.alertsEnabled) {
      if (cpuPercent !== null && cfg.alertCpuMax !== null && cpuPercent > cfg.alertCpuMax) {
        await createNetworkAlert(
          equipmentId,
          null,
          "cpu_high",
          "warning",
          `CPU alta em ${eq_?.name}: ${cpuPercent}% (m\xE1x: ${cfg.alertCpuMax}%)`,
          cpuPercent,
          cfg.alertCpuMax
        );
      }
      if (memPercent !== null && cfg.alertMemMax !== null && memPercent > cfg.alertMemMax) {
        await createNetworkAlert(
          equipmentId,
          null,
          "mem_high",
          "warning",
          `Mem\xF3ria alta em ${eq_?.name}: ${memPercent}% (m\xE1x: ${cfg.alertMemMax}%)`,
          memPercent,
          cfg.alertMemMax
        );
      }
      if (temperature !== null && cfg.alertTempMax !== null && temperature > cfg.alertTempMax) {
        await createNetworkAlert(
          equipmentId,
          null,
          "temp_high",
          "critical",
          `Temperatura alta em ${eq_?.name}: ${temperature}\xB0C (m\xE1x: ${cfg.alertTempMax}\xB0C)`,
          temperature,
          cfg.alertTempMax
        );
      }
    }
    await db.update(networkSnmpConfig).set({
      lastPollAt: now,
      lastPollError: null,
      lastCpuPercent: cpuPercent ?? void 0,
      lastMemPercent: memPercent ?? void 0,
      lastTemperature: temperature ?? void 0,
      lastUptimeSeconds: uptimeSeconds ?? void 0
    }).where(eq7(networkSnmpConfig.equipmentId, equipmentId));
  } catch (err) {
    const errorMsg = err?.message ?? String(err);
    await db.update(networkSnmpConfig).set({ lastPollAt: now, lastPollError: errorMsg }).where(eq7(networkSnmpConfig.equipmentId, equipmentId));
    if (cfg.alertsEnabled) {
      await createNetworkAlert(
        equipmentId,
        null,
        "snmp_unreachable",
        "critical",
        `Equipamento ${eq_?.name} n\xE3o responde ao SNMP: ${errorMsg}`,
        null,
        null
      );
    }
  } finally {
    session.close();
  }
}
async function createNetworkAlert(equipmentId, portId, alertType, severity, message, currentValue, thresholdValue) {
  const db = await getDb();
  if (!db) return;
  const existing = await db.select({ id: networkSnmpAlerts.id }).from(networkSnmpAlerts).where(
    and3(
      eq7(networkSnmpAlerts.equipmentId, equipmentId),
      eq7(networkSnmpAlerts.alertType, alertType),
      isNull2(networkSnmpAlerts.resolvedAt)
    )
  );
  if (existing.length > 0) return;
  await db.insert(networkSnmpAlerts).values({
    equipmentId,
    portId: portId ?? void 0,
    alertType,
    severity,
    message,
    currentValue: currentValue ?? void 0,
    thresholdValue: thresholdValue ?? void 0
  });
  if (severity === "critical") {
    try {
      await notifyOwner({ title: `\u{1F6A8} Alerta SNMP: ${alertType}`, content: message });
    } catch (_) {
    }
  }
}
var pollerTimer = null;
var activePolls = /* @__PURE__ */ new Set();
function startNetworkSnmpPoller() {
  if (pollerTimer) return;
  const CHECK_INTERVAL_MS = 6e4;
  pollerTimer = setInterval(async () => {
    try {
      const db = await getDb();
      if (!db) return;
      const configs = await db.select().from(networkSnmpConfig).where(eq7(networkSnmpConfig.enabled, true));
      const now = Date.now();
      for (const cfg of configs) {
        if (!cfg.snmpHost) continue;
        if (activePolls.has(cfg.equipmentId)) {
          console.log(`[NetworkSNMP] poll(${cfg.equipmentId}): j\xE1 em curso, a saltar`);
          continue;
        }
        const pollIntervalMs = (cfg.pollInterval ?? 300) * 1e3;
        const lastPoll = cfg.lastPollAt ? new Date(cfg.lastPollAt).getTime() : 0;
        if (now - lastPoll >= pollIntervalMs) {
          activePolls.add(cfg.equipmentId);
          pollNetworkEquipment(cfg.equipmentId).catch((e) => console.error(`[NetworkSNMP] Erro ao fazer poll do equipamento ${cfg.equipmentId}:`, e)).finally(() => activePolls.delete(cfg.equipmentId));
        }
      }
    } catch (e) {
      console.error("[NetworkSNMP] Erro no scheduler:", e);
    }
  }, CHECK_INTERVAL_MS);
  console.log("[NetworkSNMP] Poller iniciado (verifica\xE7\xE3o a cada 60s)");
}

// server/routers/networkSnmpRouter.ts
var snmpConfigSchema = z4.object({
  enabled: z4.boolean().optional(),
  snmpHost: z4.string().max(128).optional(),
  snmpPort: z4.number().int().min(1).max(65535).optional(),
  snmpVersion: z4.enum(["v1", "v2c", "v3"]).optional(),
  snmpCommunity: z4.string().max(128).optional(),
  snmpV3User: z4.string().max(128).optional(),
  snmpV3AuthProto: z4.enum(["MD5", "SHA"]).optional(),
  snmpV3AuthKey: z4.string().max(255).optional(),
  snmpV3PrivProto: z4.enum(["DES", "AES"]).optional(),
  snmpV3PrivKey: z4.string().max(255).optional(),
  pollInterval: z4.number().int().min(30).max(86400).optional(),
  alertsEnabled: z4.boolean().optional(),
  alertCpuMax: z4.number().min(0).max(100).optional().nullable(),
  alertMemMax: z4.number().min(0).max(100).optional().nullable(),
  alertTempMax: z4.number().min(0).max(200).optional().nullable()
});
function calcLimit(periodMinutes) {
  if (periodMinutes <= 60) return 500;
  if (periodMinutes <= 1440) return 720;
  return 1e3;
}
var networkSnmpRouter = router({
  // Obter configuração SNMP de um equipamento
  getConfig: protectedProcedure.input(z4.object({ equipmentId: z4.number().int() })).query(async ({ input }) => {
    const db = await getDb();
    if (!db) return null;
    const [cfg] = await db.select().from(networkSnmpConfig).where(eq8(networkSnmpConfig.equipmentId, input.equipmentId));
    return cfg ?? null;
  }),
  // Criar ou atualizar configuração SNMP
  upsertConfig: protectedProcedure.input(z4.object({ equipmentId: z4.number().int() }).merge(snmpConfigSchema)).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError4({ code: "INTERNAL_SERVER_ERROR", message: "DB n\xE3o dispon\xEDvel" });
    const { equipmentId, ...data } = input;
    const [eq_] = await db.select({ id: equipments.id }).from(equipments).where(eq8(equipments.id, equipmentId));
    if (!eq_) throw new TRPCError4({ code: "NOT_FOUND", message: "Equipamento n\xE3o encontrado" });
    const [existing] = await db.select({ id: networkSnmpConfig.id }).from(networkSnmpConfig).where(eq8(networkSnmpConfig.equipmentId, equipmentId));
    if (existing) {
      await db.update(networkSnmpConfig).set(data).where(eq8(networkSnmpConfig.equipmentId, equipmentId));
    } else {
      await db.insert(networkSnmpConfig).values({ equipmentId, ...data });
    }
    const [cfg] = await db.select().from(networkSnmpConfig).where(eq8(networkSnmpConfig.equipmentId, equipmentId));
    return cfg;
  }),
  // Forçar poll imediato
  pollNow: protectedProcedure.input(z4.object({ equipmentId: z4.number().int() })).mutation(async ({ input }) => {
    await pollNetworkEquipment(input.equipmentId);
    const db = await getDb();
    if (!db) return null;
    const [cfg] = await db.select().from(networkSnmpConfig).where(eq8(networkSnmpConfig.equipmentId, input.equipmentId));
    return cfg ?? null;
  }),
  // Listar portas de um equipamento
  getPorts: protectedProcedure.input(z4.object({ equipmentId: z4.number().int() })).query(async ({ input }) => {
    const db = await getDb();
    if (!db) return [];
    return db.select().from(networkSnmpPorts).where(eq8(networkSnmpPorts.equipmentId, input.equipmentId)).orderBy(networkSnmpPorts.ifIndex);
  }),
  // Atualizar configuração de alertas de porta (GBIC + threshold de tráfego)
  updatePortAlerts: protectedProcedure.input(z4.object({
    portId: z4.number().int(),
    alertRxMin: z4.number().optional().nullable(),
    alertRxMax: z4.number().optional().nullable(),
    alertBpsMax: z4.number().min(0).optional().nullable()
    // threshold de tráfego em bps
  })).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError4({ code: "INTERNAL_SERVER_ERROR", message: "DB n\xE3o dispon\xEDvel" });
    await db.update(networkSnmpPorts).set({
      alertRxMin: input.alertRxMin ?? void 0,
      alertRxMax: input.alertRxMax ?? void 0,
      alertBpsMax: input.alertBpsMax ?? void 0
    }).where(eq8(networkSnmpPorts.id, input.portId));
    return { ok: true };
  }),
  // Histórico de leituras gerais (CPU, memória, temperatura)
  // periodMinutes: 5, 15, 30, 60, 180, 360, 720, 1440, 2880, 10080, 43200
  getReadings: protectedProcedure.input(z4.object({
    equipmentId: z4.number().int(),
    periodMinutes: z4.number().int().min(5).max(43200).default(60)
  })).query(async ({ input }) => {
    const db = await getDb();
    if (!db) return [];
    return db.select().from(networkSnmpReadings).where(
      and4(
        eq8(networkSnmpReadings.equipmentId, input.equipmentId),
        sql4`${networkSnmpReadings.collectedAt} >= NOW() - INTERVAL ${input.periodMinutes} MINUTE`
      )
    ).orderBy(networkSnmpReadings.collectedAt).limit(calcLimit(input.periodMinutes));
  }),
  // Histórico de tráfego e GBIC por porta
  // periodMinutes: 5, 15, 30, 60, 180, 360, 720, 1440, 2880, 10080, 43200
  getPortReadings: protectedProcedure.input(z4.object({
    portId: z4.number().int(),
    periodMinutes: z4.number().int().min(5).max(43200).default(60)
  })).query(async ({ input }) => {
    const db = await getDb();
    if (!db) return [];
    return db.select().from(networkPortReadings).where(
      and4(
        eq8(networkPortReadings.portId, input.portId),
        sql4`${networkPortReadings.collectedAt} >= NOW() - INTERVAL ${input.periodMinutes} MINUTE`
      )
    ).orderBy(networkPortReadings.collectedAt).limit(calcLimit(input.periodMinutes));
  }),
  // Detalhe completo de um equipamento monitorado (config + portas + últimas leituras + alertas)
  getEquipmentDetail: protectedProcedure.input(z4.object({ equipmentId: z4.number().int() })).query(async ({ input }) => {
    const db = await getDb();
    if (!db) return null;
    const [equipment] = await db.select().from(equipments).where(eq8(equipments.id, input.equipmentId));
    if (!equipment) return null;
    const [config] = await db.select().from(networkSnmpConfig).where(eq8(networkSnmpConfig.equipmentId, input.equipmentId));
    const ports2 = await db.select().from(networkSnmpPorts).where(eq8(networkSnmpPorts.equipmentId, input.equipmentId)).orderBy(networkSnmpPorts.ifIndex);
    const [lastReading] = await db.select().from(networkSnmpReadings).where(eq8(networkSnmpReadings.equipmentId, input.equipmentId)).orderBy(desc3(networkSnmpReadings.collectedAt)).limit(1);
    const activeAlerts = await db.select().from(networkSnmpAlerts).where(
      and4(
        eq8(networkSnmpAlerts.equipmentId, input.equipmentId),
        isNull3(networkSnmpAlerts.resolvedAt)
      )
    ).orderBy(desc3(networkSnmpAlerts.createdAt)).limit(20);
    return {
      equipment,
      config: config ?? null,
      ports: ports2,
      lastReading: lastReading ?? null,
      activeAlerts
    };
  }),
  // Listar alertas ativos
  getAlerts: protectedProcedure.input(z4.object({
    equipmentId: z4.number().int().optional(),
    onlyActive: z4.boolean().default(true),
    limit: z4.number().int().min(1).max(200).default(50)
  })).query(async ({ input }) => {
    const db = await getDb();
    if (!db) return [];
    const conditions = [];
    if (input.equipmentId) {
      conditions.push(eq8(networkSnmpAlerts.equipmentId, input.equipmentId));
    }
    if (input.onlyActive) {
      conditions.push(isNull3(networkSnmpAlerts.resolvedAt));
    }
    return db.select({
      alert: networkSnmpAlerts,
      equipmentName: equipments.name
    }).from(networkSnmpAlerts).leftJoin(equipments, eq8(networkSnmpAlerts.equipmentId, equipments.id)).where(conditions.length > 0 ? and4(...conditions) : void 0).orderBy(desc3(networkSnmpAlerts.createdAt)).limit(input.limit);
  }),
  // Reconhecer alerta
  acknowledgeAlert: protectedProcedure.input(z4.object({
    alertId: z4.number().int(),
    acknowledgedBy: z4.string().max(128).optional()
  })).mutation(async ({ input, ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError4({ code: "INTERNAL_SERVER_ERROR", message: "DB n\xE3o dispon\xEDvel" });
    await db.update(networkSnmpAlerts).set({
      acknowledgedAt: /* @__PURE__ */ new Date(),
      acknowledgedBy: input.acknowledgedBy ?? ctx.user?.name ?? "sistema"
    }).where(eq8(networkSnmpAlerts.id, input.alertId));
    return { ok: true };
  }),
  // Resolver alerta
  resolveAlert: protectedProcedure.input(z4.object({ alertId: z4.number().int() })).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError4({ code: "INTERNAL_SERVER_ERROR", message: "DB n\xE3o dispon\xEDvel" });
    await db.update(networkSnmpAlerts).set({ resolvedAt: /* @__PURE__ */ new Date() }).where(eq8(networkSnmpAlerts.id, input.alertId));
    return { ok: true };
  }),
  // Testar conexão SNMP em tempo real
  testConnection: protectedProcedure.input(z4.object({ equipmentId: z4.number().int() })).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError4({ code: "INTERNAL_SERVER_ERROR", message: "DB n\xE3o dispon\xEDvel" });
    const [cfg] = await db.select().from(networkSnmpConfig).where(eq8(networkSnmpConfig.equipmentId, input.equipmentId));
    if (!cfg || !cfg.snmpHost) {
      return {
        ok: false,
        error: "Equipamento sem configura\xE7\xE3o SNMP. Configure o host e community primeiro.",
        details: null
      };
    }
    const session = createSession4(cfg);
    const startMs = Date.now();
    try {
      const vbs = await snmpGet(session, [
        SNMP_OID.sysDescr,
        SNMP_OID.sysName,
        SNMP_OID.sysUpTime
      ]);
      const rttMs = Date.now() - startMs;
      const sysDescr = String(varbindValue(vbs[SNMP_OID.sysDescr]) ?? "");
      const sysName = String(varbindValue(vbs[SNMP_OID.sysName]) ?? "");
      const uptimeTicks = varbindValue(vbs[SNMP_OID.sysUpTime]);
      const uptimeSec = uptimeTicks !== null ? ticksToSeconds(Number(uptimeTicks)) : null;
      let uptimeStr = null;
      if (uptimeSec !== null) {
        const d = Math.floor(uptimeSec / 86400);
        const h = Math.floor(uptimeSec % 86400 / 3600);
        const m = Math.floor(uptimeSec % 3600 / 60);
        const s = uptimeSec % 60;
        uptimeStr = `${d}d ${h}h ${m}m ${s}s`;
      }
      session.close();
      return {
        ok: true,
        error: null,
        details: {
          host: cfg.snmpHost,
          port: cfg.snmpPort ?? 161,
          version: cfg.snmpVersion ?? "v2c",
          rttMs,
          sysDescr: sysDescr || null,
          sysName: sysName || null,
          uptimeStr,
          uptimeSec,
          respondedAt: (/* @__PURE__ */ new Date()).toISOString()
        }
      };
    } catch (err) {
      session.close();
      const rttMs = Date.now() - startMs;
      return {
        ok: false,
        error: err?.message ?? "Timeout ou equipamento inacess\xEDvel",
        details: {
          host: cfg.snmpHost,
          port: cfg.snmpPort ?? 161,
          version: cfg.snmpVersion ?? "v2c",
          rttMs,
          sysDescr: null,
          sysName: null,
          uptimeStr: null,
          uptimeSec: null,
          respondedAt: null
        }
      };
    }
  }),
  // Redescobrir interfaces: apaga portas existentes e força novo poll
  rediscoverPorts: protectedProcedure.input(z4.object({ equipmentId: z4.number().int() })).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError4({ code: "INTERNAL_SERVER_ERROR", message: "DB n\xE3o dispon\xEDvel" });
    const ports2 = await db.select({ id: networkSnmpPorts.id }).from(networkSnmpPorts).where(eq8(networkSnmpPorts.equipmentId, input.equipmentId));
    for (const port of ports2) {
      await db.delete(networkPortReadings).where(eq8(networkPortReadings.portId, port.id));
    }
    await db.delete(networkSnmpPorts).where(eq8(networkSnmpPorts.equipmentId, input.equipmentId));
    pollNetworkEquipment(input.equipmentId).catch(
      (e) => console.error(`[NetworkSNMP] Erro ao redescobrir portas do equipamento ${input.equipmentId}:`, e)
    );
    return { ok: true, message: "Interfaces apagadas. Novo poll iniciado \u2014 aguarde 30 segundos." };
  }),
  // Limpar histórico antigo (network_port_readings e network_snmp_readings)
  cleanupHistory: protectedProcedure.input(z4.object({
    equipmentId: z4.number().int(),
    olderThanDays: z4.number().int().min(1).max(365).default(30)
  })).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new TRPCError4({ code: "INTERNAL_SERVER_ERROR", message: "DB n\xE3o dispon\xEDvel" });
    await db.delete(networkSnmpReadings).where(and4(
      eq8(networkSnmpReadings.equipmentId, input.equipmentId),
      sql4`${networkSnmpReadings.collectedAt} < NOW() - INTERVAL ${input.olderThanDays} DAY`
    ));
    const ports2 = await db.select({ id: networkSnmpPorts.id }).from(networkSnmpPorts).where(eq8(networkSnmpPorts.equipmentId, input.equipmentId));
    for (const port of ports2) {
      await db.delete(networkPortReadings).where(and4(
        eq8(networkPortReadings.portId, port.id),
        sql4`${networkPortReadings.collectedAt} < NOW() - INTERVAL ${input.olderThanDays} DAY`
      ));
    }
    return { ok: true, message: `Hist\xF3rico com mais de ${input.olderThanDays} dias apagado.` };
  }),
  // Resumo de todos os equipamentos com SNMP habilitado
  getSummary: protectedProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    const configs = await db.select({
      config: networkSnmpConfig,
      equipment: {
        id: equipments.id,
        name: equipments.name,
        type: equipments.type,
        manufacturer: equipments.manufacturer,
        ipAddress: equipments.ipAddress
      }
    }).from(networkSnmpConfig).leftJoin(equipments, eq8(networkSnmpConfig.equipmentId, equipments.id)).where(eq8(networkSnmpConfig.enabled, true));
    const activeAlerts = await db.select().from(networkSnmpAlerts).where(isNull3(networkSnmpAlerts.resolvedAt));
    const alertsByEquipment = {};
    for (const alert of activeAlerts) {
      alertsByEquipment[alert.equipmentId] = (alertsByEquipment[alert.equipmentId] ?? 0) + 1;
    }
    return configs.map((row) => ({
      ...row,
      activeAlertCount: alertsByEquipment[row.config.equipmentId] ?? 0
    }));
  })
});

// server/routers.ts
init_db();
var LOCAL_UPLOADS_DIR = process.env.BACKUP_LOCAL_DIR ? path2.join(path2.dirname(process.env.BACKUP_LOCAL_DIR), "uploads") : "/opt/fiberdoc/uploads";
async function uploadFile(buffer, key, mimeType) {
  const hasS3 = !!(process.env.BUILT_IN_FORGE_API_URL && process.env.BUILT_IN_FORGE_API_KEY);
  if (hasS3) {
    const { storagePut: storagePut2 } = await Promise.resolve().then(() => (init_storage(), storage_exports));
    const { url } = await storagePut2(key, buffer, mimeType);
    return url;
  }
  const fname = key.replace(/\//g, "-");
  fs3.mkdirSync(LOCAL_UPLOADS_DIR, { recursive: true });
  fs3.writeFileSync(path2.join(LOCAL_UPLOADS_DIR, fname), buffer);
  return `/api/uploads/${fname}`;
}
var equipmentTypeEnum2 = z5.enum(["switch", "olt", "dgo", "splitter", "router", "server", "patch_panel", "amplifier", "other"]);
var equipmentStatusEnum = z5.enum(["active", "inactive", "maintenance"]);
var portTypeEnum = z5.enum(["sc", "lc", "fc", "st", "rj45", "sfp", "sfp_plus", "qsfp", "qsfp28", "qsfp_dd", "cfp", "cfp2", "cfp4", "gpon", "xgspon", "dag", "other"]);
var portSpeedEnum = z5.enum(["1g", "10g", "25g", "40g", "100g", "400g", "other"]);
var portStatusEnum = z5.enum(["free", "occupied", "reserved", "faulty"]);
var fiberColorEnum2 = z5.enum(["blue", "orange", "green", "brown", "slate", "white", "red", "black", "yellow", "violet", "rose", "aqua"]);
var fiberTypeEnum = z5.enum(["single_mode", "multi_mode", "armored", "aerial", "underground"]);
var fiberStatusEnum = z5.enum(["active", "inactive", "reserved", "faulty"]);
var connectionTypeEnum = z5.enum(["direct", "spliced", "patch", "cross_connect"]);
var connectionStatusEnum = z5.enum(["active", "inactive", "testing"]);
var entityTypeEnum = z5.enum(["equipment", "fiber", "port", "connection", "room"]);
var actionEnum = z5.enum(["created", "updated", "deleted", "maintenance", "repaired", "inspected"]);
var appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true };
    })
  }),
  // ─── Rooms ─────────────────────────────────────────────────────────────────
  rooms: router({
    list: publicProcedure.query(() => getRooms()),
    byId: publicProcedure.input(z5.object({ id: z5.number() })).query(({ input }) => getRoomById(input.id)),
    create: protectedProcedure.input(z5.object({
      name: z5.string().min(1),
      type: z5.enum(["datacenter", "noc", "pop", "cabinet", "outdoor", "other"]).optional(),
      description: z5.string().optional(),
      location: z5.string().optional(),
      address: z5.string().optional(),
      floor: z5.string().optional(),
      city: z5.string().optional(),
      state: z5.string().optional(),
      notes: z5.string().optional()
    })).mutation(async ({ input, ctx }) => {
      const result = await createRoom(input);
      await createMaintenanceRecord({
        entityType: "room",
        entityId: 0,
        action: "created",
        description: `Sala "${input.name}" criada`,
        performedBy: ctx.user.name ?? void 0,
        userId: ctx.user.id
      });
      return result;
    }),
    update: protectedProcedure.input(z5.object({
      id: z5.number(),
      name: z5.string().min(1).optional(),
      type: z5.enum(["datacenter", "noc", "pop", "cabinet", "outdoor", "other"]).optional(),
      description: z5.string().optional(),
      location: z5.string().optional(),
      address: z5.string().optional(),
      floor: z5.string().optional(),
      city: z5.string().optional(),
      state: z5.string().optional(),
      notes: z5.string().optional()
    })).mutation(async ({ input, ctx }) => {
      const { id, ...data } = input;
      await updateRoom(id, data);
      await createMaintenanceRecord({
        entityType: "room",
        entityId: id,
        action: "updated",
        description: `Sala #${id} atualizada`,
        performedBy: ctx.user.name ?? void 0,
        userId: ctx.user.id
      });
      return { success: true };
    }),
    delete: protectedProcedure.input(z5.object({ id: z5.number() })).mutation(async ({ input, ctx }) => {
      await deleteRoom(input.id);
      await createMaintenanceRecord({
        entityType: "room",
        entityId: input.id,
        action: "deleted",
        description: `Sala #${input.id} removida`,
        performedBy: ctx.user.name ?? void 0,
        userId: ctx.user.id
      });
      return { success: true };
    })
  }),
  // ─── Equipments ────────────────────────────────────────────────────────────
  equipments: router({
    list: publicProcedure.input(z5.object({
      search: z5.string().optional(),
      type: z5.string().optional(),
      roomId: z5.number().optional(),
      status: z5.string().optional(),
      ipSearch: z5.string().optional()
    }).optional()).query(({ input }) => getEquipments(input?.search, input?.type, input?.roomId, input?.status, input?.ipSearch)),
    byId: publicProcedure.input(z5.object({ id: z5.number() })).query(({ input }) => getEquipmentById(input.id)),
    create: protectedProcedure.input(z5.object({
      name: z5.string().min(1),
      type: equipmentTypeEnum2,
      model: z5.string().optional(),
      manufacturer: z5.string().optional(),
      serialNumber: z5.string().optional(),
      roomId: z5.number().optional(),
      rack: z5.string().optional(),
      rackPosition: z5.string().optional(),
      rackUnits: z5.number().int().min(1).max(50).optional(),
      ipAddress: z5.string().optional(),
      macAddress: z5.string().optional(),
      totalPorts: z5.number().optional(),
      notes: z5.string().optional(),
      status: equipmentStatusEnum.optional(),
      autoCreatePorts: z5.boolean().optional(),
      portType: portTypeEnum.optional(),
      imageUrl: z5.string().optional(),
      powerType: z5.enum(["ac", "dc"]).optional(),
      powerSource: z5.enum(["rectifier", "inverter", "ups", "grid", "other"]).optional(),
      powerSourceLabel: z5.string().optional(),
      powerSourceId: z5.number().optional().nullable(),
      voltage: z5.number().optional().nullable(),
      powerConsumptionW: z5.number().optional().nullable(),
      // Campo óptico
      txPowerDbm: z5.number().optional().nullable(),
      // Campos de rede
      vlan: z5.number().int().min(1).max(4094).optional().nullable(),
      interfaceIp: z5.string().optional().nullable(),
      ipBlockId: z5.number().optional().nullable(),
      serviceDescription: z5.string().max(255).optional().nullable(),
      // Campos SSH
      sshUser: z5.string().max(64).optional().nullable(),
      sshPassword: z5.string().optional().nullable(),
      // recebida em plain text, encriptada no servidor
      sshPort: z5.number().int().min(1).max(65535).optional().nullable()
    })).mutation(async ({ input, ctx }) => {
      const { autoCreatePorts, portType, sshPassword, ...equipData } = input;
      if (sshPassword) {
        const { encryptPassword: encryptPassword2 } = await Promise.resolve().then(() => (init_ssh(), ssh_exports));
        equipData.sshPasswordEnc = encryptPassword2(sshPassword);
      }
      await createEquipment(equipData);
      const newEquip = await getEquipments(input.name);
      const created = newEquip[0];
      if (autoCreatePorts && created && input.totalPorts && input.totalPorts > 0) {
        await bulkCreatePorts(created.id, input.totalPorts, portType ?? "lc");
      }
      await createMaintenanceRecord({
        entityType: "equipment",
        entityId: created?.id ?? 0,
        action: "created",
        description: `Equipamento "${input.name}" (${input.type}) criado`,
        performedBy: ctx.user.name ?? void 0,
        userId: ctx.user.id
      });
      return created;
    }),
    update: protectedProcedure.input(z5.object({
      id: z5.number(),
      name: z5.string().min(1).optional(),
      type: equipmentTypeEnum2.optional(),
      model: z5.string().optional(),
      manufacturer: z5.string().optional(),
      serialNumber: z5.string().optional(),
      roomId: z5.number().optional(),
      rack: z5.string().optional(),
      rackPosition: z5.string().optional(),
      rackUnits: z5.number().int().min(1).max(50).optional().nullable(),
      ipAddress: z5.string().optional(),
      macAddress: z5.string().optional(),
      totalPorts: z5.number().optional(),
      notes: z5.string().optional(),
      status: equipmentStatusEnum.optional(),
      imageUrl: z5.string().optional(),
      powerType: z5.enum(["ac", "dc"]).optional().nullable(),
      powerSource: z5.enum(["rectifier", "inverter", "ups", "grid", "other"]).optional().nullable(),
      powerSourceLabel: z5.string().optional().nullable(),
      powerSourceId: z5.number().optional().nullable(),
      voltage: z5.number().optional().nullable(),
      powerConsumptionW: z5.number().optional().nullable(),
      // Campo óptico
      txPowerDbm: z5.number().optional().nullable(),
      // Campos de rede
      vlan: z5.number().int().min(1).max(4094).optional().nullable(),
      interfaceIp: z5.string().optional().nullable(),
      ipBlockId: z5.number().optional().nullable(),
      serviceDescription: z5.string().max(255).optional().nullable(),
      // Campos SSH
      sshUser: z5.string().max(64).optional().nullable(),
      sshPassword: z5.string().optional().nullable(),
      // plain text, encriptada no servidor
      sshPort: z5.number().int().min(1).max(65535).optional().nullable()
    })).mutation(async ({ input, ctx }) => {
      const { id, sshPassword, ...data } = input;
      if (sshPassword !== void 0) {
        if (sshPassword) {
          const { encryptPassword: encryptPassword2 } = await Promise.resolve().then(() => (init_ssh(), ssh_exports));
          data.sshPasswordEnc = encryptPassword2(sshPassword);
        } else {
          data.sshPasswordEnc = null;
        }
      }
      await updateEquipment(id, data);
      await createMaintenanceRecord({
        entityType: "equipment",
        entityId: id,
        action: "updated",
        description: `Equipamento #${id} atualizado`,
        performedBy: ctx.user.name ?? void 0,
        userId: ctx.user.id
      });
      return { success: true };
    }),
    delete: protectedProcedure.input(z5.object({ id: z5.number() })).mutation(async ({ input, ctx }) => {
      await deleteEquipment(input.id);
      await createMaintenanceRecord({
        entityType: "equipment",
        entityId: input.id,
        action: "deleted",
        description: `Equipamento #${input.id} removido`,
        performedBy: ctx.user.name ?? void 0,
        userId: ctx.user.id
      });
      return { success: true };
    }),
    uploadImage: protectedProcedure.input(z5.object({
      base64: z5.string(),
      mimeType: z5.string().default("image/jpeg"),
      fileName: z5.string().optional()
    })).mutation(async ({ input }) => {
      const buffer = Buffer.from(input.base64, "base64");
      const ext = input.mimeType.split("/")[1] ?? "jpg";
      const suffix = Math.random().toString(36).slice(2, 8);
      const key = `equipment-images/${suffix}.${ext}`;
      const url = await uploadFile(buffer, key, input.mimeType);
      return { url };
    })
  }),
  // ─── Portss ─────────────────────────────────────────────────────────────────
  ports: router({
    byEquipment: publicProcedure.input(z5.object({ equipmentId: z5.number() })).query(({ input }) => getPortsByEquipment(input.equipmentId)),
    byId: publicProcedure.input(z5.object({ id: z5.number() })).query(({ input }) => getPortById(input.id)),
    allLinks: publicProcedure.query(() => getAllPortLinks()),
    create: protectedProcedure.input(z5.object({
      equipmentId: z5.number(),
      portNumber: z5.string().min(1),
      label: z5.string().optional(),
      type: portTypeEnum.optional(),
      speed: portSpeedEnum.optional(),
      status: portStatusEnum.optional(),
      notes: z5.string().optional(),
      sortOrder: z5.number().optional(),
      connectedToEquipmentId: z5.number().optional().nullable(),
      connectedToPortId: z5.number().optional().nullable(),
      txPowerDbm: z5.number().optional().nullable()
    })).mutation(async ({ input, ctx }) => {
      const newPort = await createPort(input);
      if (input.connectedToPortId && newPort) {
        const destPort = await getPortById(input.connectedToPortId);
        if (destPort) {
          await updatePort(input.connectedToPortId, {
            connectedToEquipmentId: input.equipmentId,
            connectedToPortId: newPort.insertId ?? newPort.id ?? void 0
          });
        }
      }
      await createMaintenanceRecord({
        entityType: "port",
        entityId: input.equipmentId,
        action: "created",
        description: `Porta "${input.portNumber}" criada no equipamento #${input.equipmentId}`,
        performedBy: ctx.user.name ?? void 0,
        userId: ctx.user.id
      });
      return { success: true };
    }),
    bulkCreate: protectedProcedure.input(z5.object({
      equipmentId: z5.number(),
      count: z5.number().min(1).max(256),
      type: portTypeEnum.optional(),
      speed: portSpeedEnum.optional(),
      slotId: z5.number().optional(),
      startIndex: z5.number().optional()
    })).mutation(async ({ input, ctx }) => {
      await bulkCreatePorts(input.equipmentId, input.count, input.type ?? "lc", input.speed ?? void 0, input.slotId ?? void 0, input.startIndex ?? void 0);
      const slotInfo = input.slotId ? ` no Slot #${input.slotId}` : "";
      await createMaintenanceRecord({
        entityType: "port",
        entityId: input.equipmentId,
        action: "created",
        description: `${input.count} portas criadas em lote no equipamento #${input.equipmentId}${slotInfo}`,
        performedBy: ctx.user.name ?? void 0,
        userId: ctx.user.id
      });
      return { success: true };
    }),
    update: protectedProcedure.input(z5.object({
      id: z5.number(),
      portNumber: z5.string().min(1).optional(),
      label: z5.string().optional(),
      type: portTypeEnum.optional(),
      speed: portSpeedEnum.optional(),
      status: portStatusEnum.optional(),
      notes: z5.string().optional(),
      sortOrder: z5.number().optional(),
      slotId: z5.number().optional().nullable(),
      connectedToEquipmentId: z5.number().optional().nullable(),
      connectedToPortId: z5.number().optional().nullable(),
      txPowerDbm: z5.number().optional().nullable()
    })).mutation(async ({ input, ctx }) => {
      const { id, ...data } = input;
      const prevPort = await getPortById(id);
      await updatePort(id, data);
      if ("connectedToPortId" in data) {
        const prevLinkedId = prevPort?.connectedToPortId;
        const newLinkedId = data.connectedToPortId ?? null;
        if (prevLinkedId && prevLinkedId !== newLinkedId) {
          const prevDest = await getPortById(prevLinkedId);
          if (prevDest && prevDest.connectedToPortId === id) {
            await updatePort(prevLinkedId, { connectedToEquipmentId: null, connectedToPortId: null });
          }
        }
        if (newLinkedId) {
          const destPort = await getPortById(newLinkedId);
          if (destPort) {
            const currentPort = await getPortById(id);
            await updatePort(newLinkedId, {
              connectedToEquipmentId: currentPort?.equipmentId ?? null,
              connectedToPortId: id
            });
          }
        }
      }
      await createMaintenanceRecord({
        entityType: "port",
        entityId: id,
        action: "updated",
        description: `Porta #${id} atualizada`,
        performedBy: ctx.user.name ?? void 0,
        userId: ctx.user.id
      });
      return { success: true };
    }),
    delete: protectedProcedure.input(z5.object({ id: z5.number() })).mutation(async ({ input, ctx }) => {
      const portToDelete = await getPortById(input.id);
      if (portToDelete?.connectedToPortId) {
        const destPort = await getPortById(portToDelete.connectedToPortId);
        if (destPort && destPort.connectedToPortId === input.id) {
          await updatePort(portToDelete.connectedToPortId, { connectedToEquipmentId: null, connectedToPortId: null });
        }
      }
      await deletePort(input.id);
      return { success: true };
    }),
    search: publicProcedure.input(z5.object({ query: z5.string().min(1), limit: z5.number().optional() })).query(({ input }) => searchPorts(input.query, input.limit ?? 50))
  }),
  // ─── Slots ─────────────────────────────────────────────────────────────────
  slots: router({
    byEquipment: publicProcedure.input(z5.object({ equipmentId: z5.number() })).query(({ input }) => getSlotsByEquipment(input.equipmentId)),
    create: protectedProcedure.input(z5.object({
      equipmentId: z5.number(),
      slotNumber: z5.string().min(1).max(16),
      label: z5.string().optional(),
      portType: z5.enum(["sc", "lc", "fc", "st", "rj45", "sfp", "sfp_plus", "qsfp", "qsfp28", "qsfp_dd", "cfp", "cfp2", "cfp4", "gpon", "xgspon", "dag", "other"]).optional(),
      speed: z5.enum(["1g", "10g", "25g", "40g", "100g", "400g", "other"]).optional(),
      totalPorts: z5.number().min(0).max(256).optional(),
      notes: z5.string().optional()
    })).mutation(async ({ input, ctx }) => {
      const result = await createSlot({
        equipmentId: input.equipmentId,
        slotNumber: input.slotNumber,
        label: input.label ?? null,
        portType: input.portType ?? "lc",
        speed: input.speed ?? null,
        totalPorts: input.totalPorts ?? 0,
        notes: input.notes ?? null
      });
      await createMaintenanceRecord({
        entityType: "equipment",
        entityId: input.equipmentId,
        action: "updated",
        description: `Slot ${input.slotNumber} adicionado ao equipamento #${input.equipmentId}`,
        performedBy: ctx.user.name ?? void 0,
        userId: ctx.user.id
      });
      return result;
    }),
    update: protectedProcedure.input(z5.object({
      id: z5.number(),
      slotNumber: z5.string().min(1).max(16).optional(),
      label: z5.string().optional(),
      portType: z5.enum(["sc", "lc", "fc", "st", "rj45", "sfp", "sfp_plus", "qsfp", "qsfp28", "qsfp_dd", "cfp", "cfp2", "cfp4", "gpon", "xgspon", "dag", "other"]).optional(),
      speed: z5.enum(["1g", "10g", "25g", "40g", "100g", "400g", "other"]).optional(),
      totalPorts: z5.number().min(0).max(256).optional(),
      notes: z5.string().optional()
    })).mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updateSlot(id, data);
      return { success: true };
    }),
    delete: protectedProcedure.input(z5.object({ id: z5.number() })).mutation(async ({ input }) => {
      await deleteSlot(input.id);
      return { success: true };
    })
  }),
  // ─── Fibers ────────────────────────────────────────────────────────────────
  fibers: router({
    list: publicProcedure.input(z5.object({
      search: z5.string().optional(),
      type: z5.string().optional(),
      status: z5.string().optional()
    }).optional()).query(({ input }) => getFibers(input?.search, input?.type, input?.status)),
    byId: publicProcedure.input(z5.object({ id: z5.number() })).query(({ input }) => getFiberById(input.id)),
    create: protectedProcedure.input(z5.object({
      name: z5.string().min(1),
      originEquipmentId: z5.number().optional(),
      originPortId: z5.number().optional(),
      destinationEquipmentId: z5.number().optional(),
      destinationPortId: z5.number().optional(),
      color: fiberColorEnum2.optional(),
      type: fiberTypeEnum.optional(),
      lengthMeters: z5.number().optional(),
      cableId: z5.string().optional(),
      tubeColor: z5.string().optional(),
      attenuation: z5.number().optional(),
      status: fiberStatusEnum.optional(),
      notes: z5.string().optional()
    })).mutation(async ({ input, ctx }) => {
      await createFiber(input);
      await createMaintenanceRecord({
        entityType: "fiber",
        entityId: 0,
        action: "created",
        description: `Fibra "${input.name}" cadastrada`,
        performedBy: ctx.user.name ?? void 0,
        userId: ctx.user.id
      });
      return { success: true };
    }),
    update: protectedProcedure.input(z5.object({
      id: z5.number(),
      name: z5.string().min(1).optional(),
      originEquipmentId: z5.number().optional(),
      originPortId: z5.number().optional(),
      destinationEquipmentId: z5.number().optional(),
      destinationPortId: z5.number().optional(),
      color: fiberColorEnum2.optional(),
      type: fiberTypeEnum.optional(),
      lengthMeters: z5.number().optional(),
      cableId: z5.string().optional(),
      tubeColor: z5.string().optional(),
      attenuation: z5.number().optional(),
      status: fiberStatusEnum.optional(),
      notes: z5.string().optional()
    })).mutation(async ({ input, ctx }) => {
      const { id, ...data } = input;
      await updateFiber(id, data);
      await createMaintenanceRecord({
        entityType: "fiber",
        entityId: id,
        action: "updated",
        description: `Fibra #${id} atualizada`,
        performedBy: ctx.user.name ?? void 0,
        userId: ctx.user.id
      });
      return { success: true };
    }),
    delete: protectedProcedure.input(z5.object({ id: z5.number() })).mutation(async ({ input, ctx }) => {
      await deleteFiber(input.id);
      await createMaintenanceRecord({
        entityType: "fiber",
        entityId: input.id,
        action: "deleted",
        description: `Fibra #${input.id} removida`,
        performedBy: ctx.user.name ?? void 0,
        userId: ctx.user.id
      });
      return { success: true };
    })
  }),
  // ─── Connections ───────────────────────────────────────────────────────────
  connections: router({
    list: publicProcedure.query(() => getConnections()),
    byId: publicProcedure.input(z5.object({ id: z5.number() })).query(async ({ input }) => {
      const all = await getConnections();
      return all.find((c) => c.id === input.id);
    }),
    create: protectedProcedure.input(z5.object({
      name: z5.string().optional(),
      sourcePortId: z5.number(),
      targetPortId: z5.number(),
      fiberId: z5.number().optional(),
      type: connectionTypeEnum.optional(),
      status: connectionStatusEnum.optional(),
      notes: z5.string().optional()
    })).mutation(async ({ input, ctx }) => {
      await createConnection(input);
      await createMaintenanceRecord({
        entityType: "connection",
        entityId: 0,
        action: "created",
        description: `Conex\xE3o entre porta #${input.sourcePortId} e porta #${input.targetPortId} criada`,
        performedBy: ctx.user.name ?? void 0,
        userId: ctx.user.id
      });
      return { success: true };
    }),
    update: protectedProcedure.input(z5.object({
      id: z5.number(),
      name: z5.string().optional(),
      status: connectionStatusEnum.optional(),
      notes: z5.string().optional()
    })).mutation(async ({ input, ctx }) => {
      const { id, ...data } = input;
      await updateConnection(id, data);
      await createMaintenanceRecord({
        entityType: "connection",
        entityId: id,
        action: "updated",
        description: `Conex\xE3o #${id} atualizada`,
        performedBy: ctx.user.name ?? void 0,
        userId: ctx.user.id
      });
      return { success: true };
    }),
    delete: protectedProcedure.input(z5.object({ id: z5.number() })).mutation(async ({ input, ctx }) => {
      await deleteConnection(input.id);
      await createMaintenanceRecord({
        entityType: "connection",
        entityId: input.id,
        action: "deleted",
        description: `Conex\xE3o #${input.id} removida`,
        performedBy: ctx.user.name ?? void 0,
        userId: ctx.user.id
      });
      return { success: true };
    })
  }),
  // ─── Topology ──────────────────────────────────────────────────────────────
  topology: router({
    data: publicProcedure.query(() => getTopologyData()),
    layout: router({
      get: protectedProcedure.input(z5.object({ roomFilter: z5.string().default("all") })).query(({ ctx, input }) => getTopologyLayout(ctx.user.id, input.roomFilter)),
      save: protectedProcedure.input(z5.object({
        roomFilter: z5.string().default("all"),
        nodePositions: z5.record(z5.string(), z5.object({ x: z5.number(), y: z5.number() })),
        ctrlPoints: z5.record(z5.string(), z5.object({ x: z5.number(), y: z5.number() }))
      })).mutation(
        ({ ctx, input }) => saveTopologyLayout(ctx.user.id, input.roomFilter, input.nodePositions, input.ctrlPoints)
      )
    })
  }),
  // ─── Maintenance History ───────────────────────────────────────────────────
  history: router({
    list: publicProcedure.input(z5.object({
      entityType: z5.string().optional(),
      entityId: z5.number().optional(),
      limit: z5.number().optional()
    }).optional()).query(({ input }) => getMaintenanceHistory(input?.entityType, input?.entityId, input?.limit)),
    create: protectedProcedure.input(z5.object({
      entityType: entityTypeEnum,
      entityId: z5.number(),
      action: actionEnum,
      description: z5.string().min(1),
      performedBy: z5.string().optional()
    })).mutation(async ({ input, ctx }) => {
      await createMaintenanceRecord({ ...input, userId: ctx.user.id, performedBy: input.performedBy ?? ctx.user.name ?? void 0 });
      return { success: true };
    })
  }),
  // ─── Dashboard ─────────────────────────────────────────────────────────────
  dashboard: router({
    stats: publicProcedure.query(() => getDashboardStats())
  }),
  // ─── CSV Import ────────────────────────────────────────────────────────────
  import: router({
    equipments: protectedProcedure.input(z5.object({
      rows: z5.array(z5.object({
        name: z5.string().min(1),
        type: equipmentTypeEnum2,
        model: z5.string().optional(),
        manufacturer: z5.string().optional(),
        serialNumber: z5.string().optional(),
        rack: z5.string().optional(),
        rackPosition: z5.string().optional(),
        ipAddress: z5.string().optional(),
        macAddress: z5.string().optional(),
        totalPorts: z5.number().optional(),
        status: equipmentStatusEnum.optional(),
        notes: z5.string().optional(),
        roomName: z5.string().optional()
      }))
    })).mutation(async ({ input, ctx }) => {
      return bulkImportEquipments(
        input.rows,
        ctx.user.id,
        ctx.user.name ?? void 0
      );
    }),
    fibers: protectedProcedure.input(z5.object({
      rows: z5.array(z5.object({
        name: z5.string().min(1),
        type: fiberTypeEnum.optional(),
        color: fiberColorEnum2.optional(),
        lengthMeters: z5.number().optional(),
        cableId: z5.string().optional(),
        tubeColor: z5.string().optional(),
        attenuation: z5.number().optional(),
        status: fiberStatusEnum.optional(),
        notes: z5.string().optional()
      }))
    })).mutation(async ({ input, ctx }) => {
      return bulkImportFibers(
        input.rows,
        ctx.user.id,
        ctx.user.name ?? void 0
      );
    })
  }),
  // ─── CEO (Caixa de Emenda Óptica) ─────────────────────────────────────────
  ceos: router({
    list: protectedProcedure.input(z5.object({
      roomId: z5.number().optional(),
      status: z5.enum(["active", "inactive", "maintenance"]).optional()
    })).query(async ({ input }) => getCeos(input)),
    byId: protectedProcedure.input(z5.object({ id: z5.number() })).query(async ({ input }) => getCeoById(input.id)),
    create: protectedProcedure.input(z5.object({
      name: z5.string().min(1),
      location: z5.string().optional(),
      roomId: z5.number().optional(),
      notes: z5.string().optional(),
      status: z5.enum(["active", "inactive", "maintenance"]).optional()
    })).mutation(async ({ input }) => {
      const id = await createCeo({
        name: input.name,
        location: input.location ?? null,
        roomId: input.roomId ?? null,
        notes: input.notes ?? null,
        status: input.status ?? "active"
      });
      return { id };
    }),
    update: protectedProcedure.input(z5.object({
      id: z5.number(),
      name: z5.string().min(1).optional(),
      location: z5.string().optional(),
      roomId: z5.number().nullable().optional(),
      notes: z5.string().optional(),
      status: z5.enum(["active", "inactive", "maintenance"]).optional()
    })).mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updateCeo(id, data);
    }),
    delete: protectedProcedure.input(z5.object({ id: z5.number() })).mutation(async ({ input }) => deleteCeo(input.id)),
    mapElement: protectedProcedure.input(z5.object({ ceoId: z5.number() })).query(async ({ input }) => {
      const all = await getMapElements();
      return all.find((e) => e.type === "ceo" && e.referenceId === input.ceoId) ?? null;
    })
  }),
  // ─── Tubos / Splitters do CEO ─────────────────────────────────────────────
  ceoTubes: router({
    byCeo: protectedProcedure.input(z5.object({ ceoId: z5.number() })).query(async ({ input }) => getTubesByCeo(input.ceoId)),
    create: protectedProcedure.input(z5.object({
      ceoId: z5.number(),
      bandejaId: z5.number().optional(),
      type: z5.enum(["tube", "splitter"]).default("tube"),
      identifier: z5.string().min(1),
      totalVias: z5.number().min(1).max(256).default(12),
      color: z5.string().optional().transform((v) => v === "" ? void 0 : v),
      notes: z5.string().optional().transform((v) => v === "" ? void 0 : v)
    })).mutation(async ({ input }) => {
      return createCeoTube({
        ceoId: input.ceoId,
        bandejaId: input.bandejaId ?? null,
        type: input.type,
        identifier: input.identifier,
        totalVias: input.totalVias,
        color: input.color ?? null,
        notes: input.notes ?? null
      });
    }),
    update: protectedProcedure.input(z5.object({
      id: z5.number(),
      identifier: z5.string().min(1).optional(),
      type: z5.enum(["tube", "splitter"]).optional(),
      color: z5.string().optional(),
      notes: z5.string().optional()
    })).mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updateCeoTube(id, data);
    }),
    delete: protectedProcedure.input(z5.object({ id: z5.number() })).mutation(async ({ input }) => deleteCeoTube(input.id))
  }),
  // ─── Vias do CEO ──────────────────────────────────────────────────────────
  ceoVias: router({
    byTube: protectedProcedure.input(z5.object({ tubeId: z5.number() })).query(async ({ input }) => getViasByTube(input.tubeId)),
    byCeo: protectedProcedure.input(z5.object({ ceoId: z5.number() })).query(async ({ input }) => getViasByCeo(input.ceoId)),
    setFusion: protectedProcedure.input(z5.object({
      viaId: z5.number(),
      fusedToTubeId: z5.number().nullable(),
      fusedToViaId: z5.number().nullable(),
      notes: z5.string().optional()
    })).mutation(async ({ input }) => {
      await setViaFusion(input.viaId, input.fusedToTubeId, input.fusedToViaId, input.notes);
    }),
    clearFusion: protectedProcedure.input(z5.object({ viaId: z5.number() })).mutation(async ({ input }) => clearViaFusion(input.viaId)),
    setFusionToSplitter: protectedProcedure.input(z5.object({
      viaId: z5.number(),
      ceoId: z5.number(),
      fusedToSplitterId: z5.number().nullable(),
      fusedToSplitterViaId: z5.number().nullable(),
      notes: z5.string().optional()
    })).mutation(async ({ input }) => {
      await setViaFusionToSplitter(input.viaId, input.fusedToSplitterId, input.fusedToSplitterViaId, input.notes);
      if (input.fusedToSplitterViaId != null) {
        await deleteViaAssociationByVias(input.ceoId, input.viaId, input.fusedToSplitterViaId);
        await createViaAssociation({
          ceoId: input.ceoId,
          sourceType: "tube",
          sourceViaId: input.viaId,
          targetType: "splitter",
          targetViaId: input.fusedToSplitterViaId,
          notes: input.notes ?? null
        });
      } else {
        const db = await (await Promise.resolve().then(() => (init_db(), db_exports))).getDb();
        if (db) {
          const { ceoViaAssociations: ceoViaAssociations2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
          const { eq: eq14, or: or2, and: and5 } = await import("drizzle-orm");
          await db.delete(ceoViaAssociations2).where(
            and5(
              eq14(ceoViaAssociations2.ceoId, input.ceoId),
              or2(
                eq14(ceoViaAssociations2.sourceViaId, input.viaId),
                eq14(ceoViaAssociations2.targetViaId, input.viaId)
              )
            )
          );
        }
      }
    }),
    updateLabel: protectedProcedure.input(z5.object({
      id: z5.number(),
      label: z5.string().nullable().optional(),
      notes: z5.string().nullable().optional()
    })).mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updateVia(id, data);
    }),
    setFiber: protectedProcedure.input(z5.object({
      viaId: z5.number(),
      fiberId: z5.number().nullable()
    })).mutation(async ({ input }) => {
      await setViaFiber(input.viaId, input.fiberId);
    }),
    clearFiber: protectedProcedure.input(z5.object({ viaId: z5.number() })).mutation(async ({ input }) => setViaFiber(input.viaId, null))
  }),
  // ─── Bandejas do CEO ──────────────────────────────────────────────────────
  ceoBandejas: router({
    byCeo: protectedProcedure.input(z5.object({ ceoId: z5.number() })).query(async ({ input }) => getBandejasByCeo(input.ceoId)),
    create: protectedProcedure.input(z5.object({
      ceoId: z5.number(),
      number: z5.number().min(1),
      label: z5.string().optional().transform((v) => v === "" ? void 0 : v),
      notes: z5.string().optional().transform((v) => v === "" ? void 0 : v)
    })).mutation(async ({ input }) => {
      const id = await createCeoBandeja({
        ceoId: input.ceoId,
        number: input.number,
        label: input.label ?? null,
        notes: input.notes ?? null
      });
      return { id };
    }),
    update: protectedProcedure.input(z5.object({
      id: z5.number(),
      number: z5.number().min(1).optional(),
      label: z5.string().nullable().optional(),
      notes: z5.string().nullable().optional()
    })).mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updateCeoBandeja(id, data);
    }),
    delete: protectedProcedure.input(z5.object({ id: z5.number(), deleteTubes: z5.boolean().optional().default(false) })).mutation(async ({ input }) => deleteCeoBandeja(input.id, input.deleteTubes))
  }),
  // ─── Splitters do CEO ─────────────────────────────────────────────────────
  ceoSplitters: router({
    byCeo: protectedProcedure.input(z5.object({ ceoId: z5.number() })).query(async ({ input }) => getSplittersByCeo(input.ceoId)),
    byBandeja: protectedProcedure.input(z5.object({ bandejaId: z5.number() })).query(async ({ input }) => getSplittersByBandeja(input.bandejaId)),
    create: protectedProcedure.input(z5.object({
      ceoId: z5.number(),
      bandejaId: z5.number(),
      identifier: z5.string().min(1),
      splitterType: z5.enum(["balanced", "unbalanced"]).default("balanced"),
      ratio: z5.string().min(1),
      notes: z5.string().optional().transform((v) => v === "" ? void 0 : v)
    })).mutation(async ({ input }) => {
      const id = await createCeoSplitter({
        ceoId: input.ceoId,
        bandejaId: input.bandejaId,
        identifier: input.identifier,
        splitterType: input.splitterType,
        ratio: input.ratio,
        notes: input.notes ?? null
      });
      return { id };
    }),
    update: protectedProcedure.input(z5.object({
      id: z5.number(),
      identifier: z5.string().optional(),
      notes: z5.string().nullable().optional()
    })).mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updateCeoSplitter(id, data);
    }),
    delete: protectedProcedure.input(z5.object({ id: z5.number() })).mutation(async ({ input }) => deleteCeoSplitter(input.id))
  }),
  // ─── Vias de Splitter do CEO ───────────────────────────────────────────────
  ceoSplitterVias: router({
    bySplitter: protectedProcedure.input(z5.object({ splitterId: z5.number() })).query(async ({ input }) => getSplitterViasBySplitter(input.splitterId)),
    byCeo: protectedProcedure.input(z5.object({ ceoId: z5.number() })).query(async ({ input }) => getSplitterViasByCeo(input.ceoId)),
    updateLabel: protectedProcedure.input(z5.object({
      id: z5.number(),
      label: z5.string().nullable().optional(),
      notes: z5.string().nullable().optional()
    })).mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updateCeoSplitterVia(id, data);
    })
  }),
  // ─── Associações de Vias do CEO ────────────────────────────────────────────
  ceoViaAssociations: router({
    byCeo: protectedProcedure.input(z5.object({ ceoId: z5.number() })).query(async ({ input }) => getViaAssociationsByCeo(input.ceoId)),
    create: protectedProcedure.input(z5.object({
      ceoId: z5.number(),
      sourceType: z5.enum(["tube", "splitter"]),
      sourceViaId: z5.number(),
      targetType: z5.enum(["tube", "splitter"]),
      targetViaId: z5.number(),
      notes: z5.string().optional()
    })).mutation(async ({ input }) => {
      const id = await createViaAssociation({
        ceoId: input.ceoId,
        sourceType: input.sourceType,
        sourceViaId: input.sourceViaId,
        targetType: input.targetType,
        targetViaId: input.targetViaId,
        notes: input.notes ?? null
      });
      const db = await (await Promise.resolve().then(() => (init_db(), db_exports))).getDb();
      if (db) {
        const { ceoVias: ceoVias2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
        const { eq: eq14 } = await import("drizzle-orm");
        if (input.sourceType === "splitter" && input.targetType === "tube") {
          const { ceoSplitterVias: ceoSplitterVias2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
          const [splVia] = await db.select().from(ceoSplitterVias2).where(eq14(ceoSplitterVias2.id, input.sourceViaId)).limit(1);
          if (splVia) {
            await db.update(ceoVias2).set({ fusedToSplitterId: splVia.splitterId, fusedToSplitterViaId: input.sourceViaId, fusedToTubeId: null, fusedToViaId: null }).where(eq14(ceoVias2.id, input.targetViaId));
          }
        } else if (input.sourceType === "tube" && input.targetType === "splitter") {
          const { ceoSplitterVias: ceoSplitterVias2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
          const [splVia] = await db.select().from(ceoSplitterVias2).where(eq14(ceoSplitterVias2.id, input.targetViaId)).limit(1);
          if (splVia) {
            await db.update(ceoVias2).set({ fusedToSplitterId: splVia.splitterId, fusedToSplitterViaId: input.targetViaId, fusedToTubeId: null, fusedToViaId: null }).where(eq14(ceoVias2.id, input.sourceViaId));
          }
        }
      }
      return { id };
    }),
    delete: protectedProcedure.input(z5.object({ id: z5.number() })).mutation(async ({ input }) => deleteViaAssociation(input.id)),
    deleteByVias: protectedProcedure.input(z5.object({
      ceoId: z5.number(),
      viaId1: z5.number(),
      viaId2: z5.number()
    })).mutation(async ({ input }) => deleteViaAssociationByVias(input.ceoId, input.viaId1, input.viaId2))
  }),
  // ─── CTO Tubos ────────────────────────────────────────────────────────────
  ctoTubes: router({
    byCto: protectedProcedure.input(z5.object({ ctoId: z5.number() })).query(({ input }) => getTubesByCto(input.ctoId)),
    create: protectedProcedure.input(z5.object({
      ctoId: z5.number(),
      identifier: z5.string(),
      type: z5.enum(["tube", "splitter"]).default("tube"),
      color: z5.string().optional().transform((v) => v === "" ? void 0 : v),
      totalVias: z5.number().min(1).max(288).default(12),
      splitterType: z5.enum(["balanced", "unbalanced"]).optional(),
      ratio: z5.string().optional().transform((v) => v === "" ? void 0 : v),
      notes: z5.string().optional().transform((v) => v === "" ? void 0 : v)
    })).mutation(async ({ input }) => {
      const result = await createCtoTube(input);
      return result;
    }),
    update: protectedProcedure.input(z5.object({
      id: z5.number(),
      identifier: z5.string().optional(),
      type: z5.enum(["tube", "splitter"]).optional(),
      color: z5.string().optional(),
      splitterType: z5.enum(["balanced", "unbalanced"]).optional(),
      ratio: z5.string().optional(),
      notes: z5.string().optional()
    })).mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updateCtoTube(id, data);
    }),
    delete: adminProcedure.input(z5.object({ id: z5.number() })).mutation(async ({ input }) => deleteCtoTube(input.id))
  }),
  // ─── CTO Vias ─────────────────────────────────────────────────────────────
  ctoVias: router({
    byTube: protectedProcedure.input(z5.object({ tubeId: z5.number() })).query(({ input }) => getViasByCtotube(input.tubeId)),
    byCto: protectedProcedure.input(z5.object({ ctoId: z5.number() })).query(({ input }) => getViasByCto(input.ctoId)),
    update: protectedProcedure.input(z5.object({
      id: z5.number(),
      label: z5.string().optional(),
      notes: z5.string().optional()
    })).mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updateCtoVia(id, data);
    }),
    setFusion: protectedProcedure.input(z5.object({
      viaId: z5.number(),
      fusedToTubeId: z5.number(),
      fusedToViaId: z5.number(),
      notes: z5.string().optional(),
      label: z5.string().optional()
    })).mutation(async ({ input }) => {
      await setCtoViaFusion(input.viaId, input.fusedToTubeId, input.fusedToViaId, input.notes);
      if (input.label) {
        await updateCtoVia(input.viaId, { label: input.label });
        await updateCtoVia(input.fusedToViaId, { label: input.label });
      }
    }),
    clearFusion: protectedProcedure.input(z5.object({ viaId: z5.number() })).mutation(async ({ input }) => clearCtoViaFusion(input.viaId)),
    setFiber: protectedProcedure.input(z5.object({
      viaId: z5.number(),
      fiberId: z5.number().nullable()
    })).mutation(async ({ input }) => {
      await setCtoViaFiber(input.viaId, input.fiberId);
    }),
    clearFiber: protectedProcedure.input(z5.object({ viaId: z5.number() })).mutation(async ({ input }) => setCtoViaFiber(input.viaId, null))
  }),
  // ─── CTO Via Associations (tubo ↔ splitter) ───────────────────────────────
  ctoViaAssociations: router({
    byCto: protectedProcedure.input(z5.object({ ctoId: z5.number() })).query(async ({ input }) => getViaAssociationsByCto(input.ctoId)),
    create: protectedProcedure.input(z5.object({
      ctoId: z5.number(),
      sourceType: z5.enum(["tube", "splitter"]),
      sourceViaId: z5.number(),
      targetType: z5.enum(["tube", "splitter"]),
      targetViaId: z5.number(),
      notes: z5.string().optional()
    })).mutation(async ({ input }) => {
      const id = await createCtoViaAssociation({
        ctoId: input.ctoId,
        sourceType: input.sourceType,
        sourceViaId: input.sourceViaId,
        targetType: input.targetType,
        targetViaId: input.targetViaId,
        notes: input.notes ?? null
      });
      return { id };
    }),
    delete: protectedProcedure.input(z5.object({ id: z5.number() })).mutation(async ({ input }) => deleteCtoViaAssociation(input.id)),
    deleteByVias: protectedProcedure.input(z5.object({
      ctoId: z5.number(),
      viaId1: z5.number(),
      viaId2: z5.number()
    })).mutation(async ({ input }) => deleteCtoViaAssociationByVias(input.ctoId, input.viaId1, input.viaId2))
  }),
  // ─── Gerenciamento de Usuários (apenas admin) ──────────────────────────────
  users: router({
    list: adminProcedure.query(async () => getAllUsers()),
    updateRole: adminProcedure.input(z5.object({
      userId: z5.number(),
      role: z5.enum(["admin", "operator", "user"])
    })).mutation(async ({ input, ctx }) => {
      if (ctx.user.id === input.userId) {
        throw new Error("Voc\xEA n\xE3o pode alterar seu pr\xF3prio papel.");
      }
      await updateUserRole(input.userId, input.role);
    }),
    remove: adminProcedure.input(z5.object({ userId: z5.number() })).mutation(async ({ input, ctx }) => {
      if (ctx.user.id === input.userId) {
        throw new Error("Voc\xEA n\xE3o pode remover sua pr\xF3pria conta.");
      }
      await deleteUser(input.userId);
    }),
    createLocal: adminProcedure.input(z5.object({
      name: z5.string().min(1, "Nome \xE9 obrigat\xF3rio"),
      email: z5.string().email("E-mail inv\xE1lido"),
      password: z5.string().min(6, "Senha deve ter no m\xEDnimo 6 caracteres"),
      role: z5.enum(["admin", "operator", "user"]).default("user")
    })).mutation(async ({ input }) => {
      const { hash: hash2 } = await import("bcryptjs");
      const existing = await getUserByEmail(input.email.trim().toLowerCase());
      if (existing) {
        throw new TRPCError5({ code: "CONFLICT", message: "J\xE1 existe um usu\xE1rio com este e-mail" });
      }
      const passwordHash = await hash2(input.password, 12);
      const openId = `local:${input.email.trim().toLowerCase()}`;
      const { getDb: getDb2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      const { users: usersTable } = await Promise.resolve().then(() => (init_schema(), schema_exports));
      const { eq: eq14 } = await import("drizzle-orm");
      const dbConn = await getDb2();
      if (!dbConn) throw new TRPCError5({ code: "INTERNAL_SERVER_ERROR", message: "DB indispon\xEDvel" });
      await dbConn.insert(usersTable).values({
        openId,
        name: input.name.trim(),
        email: input.email.trim().toLowerCase(),
        role: input.role,
        loginMethod: "local",
        passwordHash,
        mustChangePassword: true,
        lastSignedIn: /* @__PURE__ */ new Date()
      });
      return { success: true };
    }),
    resetPassword: adminProcedure.input(z5.object({
      userId: z5.number(),
      newPassword: z5.string().min(6, "Senha deve ter no m\xEDnimo 6 caracteres")
    })).mutation(async ({ input }) => {
      const { hash: hash2 } = await import("bcryptjs");
      const passwordHash = await hash2(input.newPassword, 12);
      const { getDb: getDb2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      const { users: usersTable } = await Promise.resolve().then(() => (init_schema(), schema_exports));
      const { eq: eq14 } = await import("drizzle-orm");
      const dbConn = await getDb2();
      if (!dbConn) throw new TRPCError5({ code: "INTERNAL_SERVER_ERROR", message: "DB indispon\xEDvel" });
      await dbConn.update(usersTable).set({ passwordHash, mustChangePassword: true }).where(eq14(usersTable.id, input.userId));
      return { success: true };
    })
  }),
  // ─── Backup & Restauração (apenas admin) ───────────────────────────────────
  backup: router({
    export: adminProcedure.query(async () => {
      return exportFullBackup();
    }),
    restore: adminProcedure.input(z5.object({
      backup: z5.object({
        version: z5.string(),
        generatedAt: z5.string(),
        counts: z5.record(z5.string(), z5.number()),
        data: z5.object({
          rooms: z5.array(z5.any()),
          equipments: z5.array(z5.any()),
          equipmentSlots: z5.array(z5.any()),
          ports: z5.array(z5.any()),
          fibers: z5.array(z5.any()),
          connections: z5.array(z5.any()),
          maintenanceHistory: z5.array(z5.any()),
          ceos: z5.array(z5.any()),
          ceoTubes: z5.array(z5.any()),
          ceoVias: z5.array(z5.any())
        })
      })
    })).mutation(async ({ input }) => {
      return restoreFromBackup(input.backup);
    }),
    // Backup manual com upload S3
    runManual: adminProcedure.mutation(async () => {
      return runBackup("manual");
    }),
    // Agendamento
    getSchedule: adminProcedure.query(async () => {
      return getBackupSchedule();
    }),
    saveSchedule: adminProcedure.input(z5.object({
      enabled: z5.boolean(),
      frequency: z5.enum(["daily", "weekly", "monthly"]),
      hour: z5.number().min(0).max(23),
      dayOfWeek: z5.number().min(0).max(6).nullable().optional(),
      dayOfMonth: z5.number().min(1).max(28).nullable().optional(),
      retentionDays: z5.number().min(1).max(365)
    })).mutation(async ({ input }) => {
      const nextRunAt = calcNextRun(
        input.frequency,
        input.hour,
        input.dayOfWeek ?? null,
        input.dayOfMonth ?? null
      );
      await upsertBackupSchedule({ ...input, nextRunAt });
      return { success: true, nextRunAt };
    }),
    // Histórico
    getHistory: adminProcedure.query(async () => {
      return getBackupHistory(50);
    }),
    deleteHistory: adminProcedure.input(z5.object({ id: z5.number() })).mutation(async ({ input }) => {
      await deleteBackupHistoryEntry(input.id);
      return { success: true };
    })
  }),
  // ─── Configurações do Sistema ────────────────────────────────────────────────
  systemConfig: router({
    get: publicProcedure.query(async () => {
      const settings = await getSystemSettings();
      if (process.env.HIDE_PROVIDERS === "true") {
        try {
          const hidden = JSON.parse(settings.hiddenMenus ?? "[]");
          if (!hidden.includes("/admin/provedores")) {
            hidden.push("/admin/provedores");
            settings.hiddenMenus = JSON.stringify(hidden);
          }
        } catch {
          settings.hiddenMenus = JSON.stringify(["/admin/provedores"]);
        }
      }
      return settings;
    }),
    save: adminProcedure.input(z5.object({
      systemName: z5.string().optional(),
      logoUrl: z5.string().optional(),
      theme: z5.string().optional(),
      capacityAlertThreshold: z5.number().min(1).max(100).optional(),
      telegram_bot_token: z5.string().optional(),
      telegram_chat_id: z5.string().optional(),
      mapDefaultLat: z5.number().optional(),
      mapDefaultLng: z5.number().optional(),
      mapDefaultZoom: z5.number().min(1).max(20).optional(),
      serverPublicUrl: z5.string().optional(),
      hiddenMenus: z5.array(z5.string()).optional()
    })).mutation(async ({ input }) => {
      const settings = {};
      if (input.systemName !== void 0) settings.systemName = input.systemName;
      if (input.logoUrl !== void 0) settings.logoUrl = input.logoUrl;
      if (input.theme !== void 0) settings.theme = input.theme;
      if (input.capacityAlertThreshold !== void 0) settings.capacityAlertThreshold = String(input.capacityAlertThreshold);
      if (input.telegram_bot_token !== void 0) settings.telegram_bot_token = input.telegram_bot_token;
      if (input.telegram_chat_id !== void 0) settings.telegram_chat_id = input.telegram_chat_id;
      if (input.mapDefaultLat !== void 0) settings.mapDefaultLat = String(input.mapDefaultLat);
      if (input.mapDefaultLng !== void 0) settings.mapDefaultLng = String(input.mapDefaultLng);
      if (input.mapDefaultZoom !== void 0) settings.mapDefaultZoom = String(input.mapDefaultZoom);
      if (input.serverPublicUrl !== void 0) settings.serverPublicUrl = input.serverPublicUrl;
      if (input.hiddenMenus !== void 0) settings.hiddenMenus = JSON.stringify(input.hiddenMenus);
      await setSystemSettings(settings);
      return { success: true };
    }),
    uploadLogo: adminProcedure.input(z5.object({
      base64: z5.string(),
      mimeType: z5.string().default("image/png"),
      filename: z5.string().default("logo.png")
    })).mutation(async ({ input }) => {
      const buffer = Buffer.from(input.base64, "base64");
      const ext = input.filename.split(".").pop() ?? "png";
      const fname = `logo-${Date.now()}.${ext}`;
      const key = `system/${fname}`;
      const url = await uploadFile(buffer, key, input.mimeType);
      await setSystemSettings({ logoUrl: url });
      return { url };
    }),
    // ─── Configuração de Domínio + SSL Let's Encrypt ─────────────────────────
    configureSsl: adminProcedure.input(z5.object({
      domain: z5.string().min(3, "Dom\xEDnio inv\xE1lido"),
      email: z5.string().email("E-mail inv\xE1lido")
    })).mutation(async ({ input }) => {
      const status = getSslStatus();
      if (status.running) {
        throw new TRPCError5({ code: "CONFLICT", message: "Configura\xE7\xE3o SSL j\xE1 est\xE1 em andamento." });
      }
      await configureDomainSsl(input.domain, input.email);
      return { started: true };
    }),
    sslStatus: adminProcedure.query(() => getSslStatus())
  }),
  // ─── Relatório de Ocupação ─────────────────────────────────────────────────
  reports: router({
    occupancy: publicProcedure.input(z5.object({
      roomId: z5.number().optional(),
      equipmentId: z5.number().optional()
    })).query(({ input }) => getOccupancyReport(input)),
    byRoom: publicProcedure.input(z5.object({ roomId: z5.number() })).query(({ input }) => getRoomReport(input.roomId))
  }),
  // ─── Upload de Imagem de Equipamento ────────────────────────────────────────
  equipmentImage: router({
    upload: adminProcedure.input(z5.object({
      equipmentId: z5.number(),
      base64: z5.string(),
      mimeType: z5.string().default("image/jpeg"),
      filename: z5.string().default("equipment.jpg")
    })).mutation(async ({ input }) => {
      const buffer = Buffer.from(input.base64, "base64");
      const ext = input.filename.split(".").pop() ?? "jpg";
      const key = `equipments/${input.equipmentId}-${Date.now()}.${ext}`;
      const url = await uploadFile(buffer, key, input.mimeType);
      await updateEquipmentImage(input.equipmentId, url);
      return { url };
    }),
    remove: adminProcedure.input(z5.object({ equipmentId: z5.number() })).mutation(async ({ input }) => {
      await updateEquipmentImage(input.equipmentId, null);
      return { success: true };
    })
  }),
  // ─── Mobile Auth (login por senha) ──────────────────────────────────────────
  mobileAuth: router({
    login: publicProcedure.input(z5.object({
      email: z5.string().email(),
      password: z5.string().min(1)
    })).mutation(async ({ input, ctx }) => {
      const { compare: compare2 } = await import("bcryptjs");
      const normalizedEmail = input.email.trim().toLowerCase();
      const user = await getUserByEmail(normalizedEmail);
      if (!user || !user.passwordHash) {
        console.warn(`[mobileAuth.login] Usu\xE1rio n\xE3o encontrado: ${normalizedEmail}`);
        throw new TRPCError5({ code: "UNAUTHORIZED", message: "Usu\xE1rio ou senha inv\xE1lidos" });
      }
      const valid = await compare2(input.password, user.passwordHash);
      if (!valid) {
        throw new TRPCError5({ code: "UNAUTHORIZED", message: "Usu\xE1rio ou senha inv\xE1lidos" });
      }
      const { SignJWT: SignJWT2 } = await import("jose");
      const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? "fallback-secret");
      const token = await new SignJWT2({ role: user.role }).setProtectedHeader({ alg: "HS256" }).setSubject(String(user.id)).setIssuer("fiberdoc-mobile").setExpirationTime("30d").sign(secret);
      return {
        token,
        user: { id: user.id, name: user.name, email: user.email, role: user.role }
      };
    }),
    me: publicProcedure.input(z5.object({ token: z5.string() })).query(async ({ input }) => {
      try {
        const { jwtVerify: jwtVerify3 } = await import("jose");
        const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? "fallback-secret");
        const { payload } = await jwtVerify3(input.token, secret, { issuer: "fiberdoc-mobile" });
        const userId = payload.sub ? parseInt(payload.sub) : null;
        if (!userId) throw new TRPCError5({ code: "UNAUTHORIZED" });
        const user = await getUserById(userId);
        if (!user) throw new TRPCError5({ code: "UNAUTHORIZED" });
        return { id: user.id, name: user.name, email: user.email, role: user.role };
      } catch {
        throw new TRPCError5({ code: "UNAUTHORIZED", message: "Token inv\xE1lido ou expirado" });
      }
    }),
    setPassword: adminProcedure.input(z5.object({
      userId: z5.number(),
      password: z5.string().min(6)
    })).mutation(async ({ input }) => {
      const { hash: hash2 } = await import("bcryptjs");
      const passwordHash = await hash2(input.password, 12);
      await setUserPassword(input.userId, passwordHash);
      return { success: true };
    }),
    listUsers: adminProcedure.query(() => listUsersForAdmin())
  }),
  // ─── IP DOC ────────────────────────────────────────────────────────────────
  ipDoc: router({
    // Dashboard
    dashboard: protectedProcedure.query(() => getIpDashboardSummary()),
    // Blocos
    listBlocks: protectedProcedure.input(z5.object({
      type: z5.string().optional(),
      status: z5.string().optional(),
      roomId: z5.number().optional()
    }).optional()).query(({ input }) => getIpBlocks(input ?? {})),
    blockById: protectedProcedure.input(z5.object({ id: z5.number() })).query(({ input }) => getIpBlockById(input.id)),
    createBlock: protectedProcedure.input(z5.object({
      name: z5.string().min(1),
      cidr: z5.string().min(7),
      gateway: z5.string().optional().nullable(),
      dns1: z5.string().optional().nullable(),
      dns2: z5.string().optional().nullable(),
      vlan: z5.number().optional().nullable(),
      type: z5.enum(["infrastructure", "clients", "management", "transit", "loopback", "reserved", "other"]).optional(),
      status: z5.enum(["active", "inactive", "reserved"]).optional(),
      description: z5.string().optional().nullable(),
      roomId: z5.number().optional().nullable(),
      notes: z5.string().optional().nullable()
    })).mutation(async ({ input }) => {
      try {
        const id = await createIpBlock(input);
        return { success: true, id };
      } catch (e) {
        throw new TRPCError5({ code: "BAD_REQUEST", message: e.message });
      }
    }),
    updateBlock: protectedProcedure.input(z5.object({
      id: z5.number(),
      name: z5.string().optional(),
      gateway: z5.string().optional().nullable(),
      dns1: z5.string().optional().nullable(),
      dns2: z5.string().optional().nullable(),
      vlan: z5.number().optional().nullable(),
      type: z5.enum(["infrastructure", "clients", "management", "transit", "loopback", "reserved", "other"]).optional(),
      status: z5.enum(["active", "inactive", "reserved"]).optional(),
      description: z5.string().optional().nullable(),
      roomId: z5.number().optional().nullable(),
      notes: z5.string().optional().nullable()
    })).mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updateIpBlock(id, data);
      return { success: true };
    }),
    deleteBlock: protectedProcedure.input(z5.object({ id: z5.number() })).mutation(async ({ input }) => {
      await deleteIpBlock(input.id);
      return { success: true };
    }),
    parseCidr: protectedProcedure.input(z5.object({ cidr: z5.string() })).query(({ input }) => {
      try {
        return { success: true, data: parseCidr(input.cidr) };
      } catch (e) {
        return { success: false, error: e.message };
      }
    }),
    // Endereços
    addressesByBlock: protectedProcedure.input(z5.object({ blockId: z5.number() })).query(({ input }) => getIpAddressesByBlock(input.blockId)),
    blockStats: protectedProcedure.input(z5.object({ blockId: z5.number() })).query(({ input }) => getIpBlockStats(input.blockId)),
    allocate: protectedProcedure.input(z5.object({
      blockId: z5.number(),
      address: z5.string(),
      status: z5.enum(["allocated", "reserved", "dhcp", "free"]).optional(),
      hostname: z5.string().optional().nullable(),
      description: z5.string().optional().nullable(),
      equipmentId: z5.number().optional().nullable(),
      macAddress: z5.string().optional().nullable(),
      owner: z5.string().optional().nullable(),
      notes: z5.string().optional().nullable()
    })).mutation(async ({ ctx, input }) => {
      const id = await allocateIpAddress(input);
      await addIpAuditLog({
        blockId: input.blockId,
        addressId: id,
        address: input.address,
        action: "allocated",
        newStatus: input.status ?? "allocated",
        hostname: input.hostname ?? null,
        owner: input.owner ?? null,
        equipmentId: input.equipmentId ?? null,
        performedBy: ctx.user.name ?? ctx.user.email ?? null,
        userId: ctx.user.id
      });
      return { success: true, id };
    }),
    updateAddress: protectedProcedure.input(z5.object({
      id: z5.number(),
      status: z5.enum(["free", "allocated", "reserved", "dhcp"]).optional(),
      hostname: z5.string().optional().nullable(),
      description: z5.string().optional().nullable(),
      equipmentId: z5.number().optional().nullable(),
      macAddress: z5.string().optional().nullable(),
      owner: z5.string().optional().nullable(),
      notes: z5.string().optional().nullable()
    })).mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      const db = await (await Promise.resolve().then(() => (init_db(), db_exports))).getDb();
      const { ipAddresses: ipAddr } = await Promise.resolve().then(() => (init_schema(), schema_exports));
      const { eq: eqOp } = await import("drizzle-orm");
      const [prev] = db ? await db.select().from(ipAddr).where(eqOp(ipAddr.id, id)).limit(1) : [];
      await updateIpAddress(id, data);
      if (prev) {
        await addIpAuditLog({
          blockId: prev.blockId,
          addressId: id,
          address: prev.address,
          action: "updated",
          previousStatus: prev.status,
          newStatus: data.status ?? prev.status,
          hostname: data.hostname ?? prev.hostname,
          owner: data.owner ?? prev.owner,
          equipmentId: data.equipmentId ?? prev.equipmentId,
          performedBy: ctx.user.name ?? ctx.user.email ?? null,
          userId: ctx.user.id
        });
      }
      return { success: true };
    }),
    releaseAddress: protectedProcedure.input(z5.object({ id: z5.number() })).mutation(async ({ ctx, input }) => {
      const db = await (await Promise.resolve().then(() => (init_db(), db_exports))).getDb();
      const { ipAddresses: ipAddr } = await Promise.resolve().then(() => (init_schema(), schema_exports));
      const { eq: eqOp } = await import("drizzle-orm");
      const [prev] = db ? await db.select().from(ipAddr).where(eqOp(ipAddr.id, input.id)).limit(1) : [];
      await releaseIpAddress(input.id);
      if (prev) {
        await addIpAuditLog({
          blockId: prev.blockId,
          addressId: input.id,
          address: prev.address,
          action: "released",
          previousStatus: prev.status,
          newStatus: "free",
          hostname: prev.hostname,
          owner: prev.owner,
          equipmentId: prev.equipmentId,
          performedBy: ctx.user.name ?? ctx.user.email ?? null,
          userId: ctx.user.id
        });
      }
      return { success: true };
    }),
    deleteAddress: protectedProcedure.input(z5.object({ id: z5.number() })).mutation(async ({ ctx, input }) => {
      const db = await (await Promise.resolve().then(() => (init_db(), db_exports))).getDb();
      const { ipAddresses: ipAddr } = await Promise.resolve().then(() => (init_schema(), schema_exports));
      const { eq: eqOp } = await import("drizzle-orm");
      const [prev] = db ? await db.select().from(ipAddr).where(eqOp(ipAddr.id, input.id)).limit(1) : [];
      if (prev) {
        await addIpAuditLog({
          blockId: prev.blockId,
          addressId: null,
          address: prev.address,
          action: "deleted",
          previousStatus: prev.status,
          hostname: prev.hostname,
          owner: prev.owner,
          equipmentId: prev.equipmentId,
          performedBy: ctx.user.name ?? ctx.user.email ?? null,
          userId: ctx.user.id
        });
      }
      await deleteIpAddress(input.id);
      return { success: true };
    }),
    importCsv: protectedProcedure.input(z5.object({
      blockId: z5.number(),
      rows: z5.array(z5.object({
        address: z5.string().min(7),
        hostname: z5.string().optional().nullable(),
        owner: z5.string().optional().nullable(),
        mac: z5.string().optional().nullable(),
        description: z5.string().optional().nullable(),
        status: z5.enum(["allocated", "reserved", "dhcp", "free"]).optional()
      }))
    })).mutation(async ({ ctx, input }) => {
      let imported = 0;
      let skipped = 0;
      const errors = [];
      for (const row of input.rows) {
        try {
          const id = await allocateIpAddress({
            blockId: input.blockId,
            address: row.address.trim(),
            status: row.status ?? "allocated",
            hostname: row.hostname ?? null,
            owner: row.owner ?? null,
            macAddress: row.mac ?? null,
            description: row.description ?? null
          });
          await addIpAuditLog({
            blockId: input.blockId,
            addressId: id,
            address: row.address.trim(),
            action: "imported",
            newStatus: row.status ?? "allocated",
            hostname: row.hostname ?? null,
            owner: row.owner ?? null,
            performedBy: ctx.user.name ?? ctx.user.email ?? null,
            userId: ctx.user.id,
            notes: `Importado via CSV`
          });
          imported++;
        } catch (e) {
          skipped++;
          errors.push(`${row.address}: ${e.message}`);
        }
      }
      return { success: true, imported, skipped, errors };
    }),
    primaryByEquipment: protectedProcedure.input(z5.object({ equipmentId: z5.number() })).query(({ input }) => getPrimaryIpByEquipment(input.equipmentId)),
    primaryByEquipments: protectedProcedure.input(z5.object({ equipmentIds: z5.array(z5.number()) })).query(({ input }) => getPrimaryIpsByEquipments(input.equipmentIds)),
    auditByBlock: protectedProcedure.input(z5.object({ blockId: z5.number(), limit: z5.number().optional() })).query(({ input }) => getIpAuditByBlock(input.blockId, input.limit ?? 100)),
    // ─── Equipment Interfaces ───────────────────────────────────────────────
    interfaces: {
      byEquipment: protectedProcedure.input(z5.object({ equipmentId: z5.number() })).query(({ input }) => getInterfacesByEquipment(input.equipmentId)),
      create: protectedProcedure.input(z5.object({
        equipmentId: z5.number(),
        name: z5.string().min(1).max(64),
        vlan: z5.number().int().min(1).max(4094).nullable().optional(),
        ipAddress: z5.string().max(43).nullable().optional(),
        macAddress: z5.string().max(17).nullable().optional(),
        ipBlockId: z5.number().nullable().optional(),
        serviceDescription: z5.string().max(255).nullable().optional(),
        isPrimary: z5.boolean().optional(),
        notes: z5.string().nullable().optional()
      })).mutation(({ input }) => createInterface(input)),
      update: protectedProcedure.input(z5.object({
        id: z5.number(),
        equipmentId: z5.number(),
        name: z5.string().min(1).max(64).optional(),
        vlan: z5.number().int().min(1).max(4094).nullable().optional(),
        ipAddress: z5.string().max(43).nullable().optional(),
        macAddress: z5.string().max(17).nullable().optional(),
        ipBlockId: z5.number().nullable().optional(),
        serviceDescription: z5.string().max(255).nullable().optional(),
        isPrimary: z5.boolean().optional(),
        notes: z5.string().nullable().optional()
      })).mutation(({ input }) => {
        const { id, ...data } = input;
        return updateInterface(id, data);
      }),
      delete: protectedProcedure.input(z5.object({ id: z5.number() })).mutation(({ input }) => deleteInterface(input.id))
    }
  }),
  // ─── Fontes de Energia (Power Sources) ────────────────────────────────────
  powerSources: router({
    list: protectedProcedure.query(() => getPowerSources()),
    byId: protectedProcedure.input(z5.object({ id: z5.number() })).query(({ input }) => getPowerSourceById(input.id)),
    create: adminProcedure.input(z5.object({
      name: z5.string().min(1).max(128),
      type: z5.enum(["rectifier", "inverter", "ups", "grid", "generator", "other"]).default("rectifier"),
      manufacturer: z5.string().max(128).optional(),
      model: z5.string().max(128).optional(),
      roomId: z5.number().nullable().optional(),
      location: z5.string().max(255).optional(),
      outputVoltage: z5.number().optional(),
      outputCurrentMax: z5.number().optional(),
      notes: z5.string().optional(),
      snmpEnabled: z5.boolean().default(false),
      snmpHost: z5.string().max(128).optional(),
      snmpPort: z5.number().int().default(161),
      snmpVersion: z5.enum(["v1", "v2c", "v3"]).default("v2c"),
      snmpCommunity: z5.string().max(128).optional(),
      snmpV3User: z5.string().max(128).optional(),
      snmpV3AuthProto: z5.enum(["MD5", "SHA"]).optional(),
      snmpV3AuthKey: z5.string().max(255).optional(),
      snmpV3PrivProto: z5.enum(["DES", "AES"]).optional(),
      snmpV3PrivKey: z5.string().max(255).optional(),
      oidOutputVoltage: z5.string().max(128).optional(),
      oidOutputCurrent: z5.string().max(128).optional(),
      oidTemperature: z5.string().max(128).optional(),
      oidAlarmStatus: z5.string().max(128).optional(),
      oidBatteryLevel: z5.string().max(128).optional(),
      oidLoadPercent: z5.string().max(128).optional(),
      snmpPollInterval: z5.number().int().default(300),
      // Divisores de escala SNMP
      snmpVoltageDivisor: z5.number().default(1),
      snmpCurrentDivisor: z5.number().default(1),
      snmpTempDivisor: z5.number().default(1),
      snmpBatteryDivisor: z5.number().default(1),
      // Thresholds de alerta
      alertsEnabled: z5.boolean().default(false),
      alertTempMax: z5.number().nullable().optional(),
      alertVoltageMin: z5.number().nullable().optional(),
      alertVoltageMax: z5.number().nullable().optional(),
      alertBatteryMin: z5.number().nullable().optional(),
      alertBatteryMax: z5.number().nullable().optional(),
      alertCurrentMax: z5.number().nullable().optional(),
      alertLoadMax: z5.number().nullable().optional(),
      alertAcFailEnabled: z5.boolean().default(false)
    })).mutation(({ input }) => createPowerSource(input)),
    update: adminProcedure.input(z5.object({
      id: z5.number(),
      name: z5.string().min(1).max(128).optional(),
      type: z5.enum(["rectifier", "inverter", "ups", "grid", "generator", "other"]).optional(),
      manufacturer: z5.string().max(128).nullable().optional(),
      model: z5.string().max(128).nullable().optional(),
      roomId: z5.number().nullable().optional(),
      location: z5.string().max(255).nullable().optional(),
      outputVoltage: z5.number().nullable().optional(),
      outputCurrentMax: z5.number().nullable().optional(),
      notes: z5.string().nullable().optional(),
      snmpEnabled: z5.boolean().optional(),
      snmpHost: z5.string().max(128).nullable().optional(),
      snmpPort: z5.number().int().optional(),
      snmpVersion: z5.enum(["v1", "v2c", "v3"]).optional(),
      snmpCommunity: z5.string().max(128).nullable().optional(),
      snmpV3User: z5.string().max(128).nullable().optional(),
      snmpV3AuthProto: z5.enum(["MD5", "SHA"]).nullable().optional(),
      snmpV3AuthKey: z5.string().max(255).nullable().optional(),
      snmpV3PrivProto: z5.enum(["DES", "AES"]).nullable().optional(),
      snmpV3PrivKey: z5.string().max(255).nullable().optional(),
      oidOutputVoltage: z5.string().max(128).nullable().optional(),
      oidOutputCurrent: z5.string().max(128).nullable().optional(),
      oidTemperature: z5.string().max(128).nullable().optional(),
      oidAlarmStatus: z5.string().max(128).nullable().optional(),
      oidBatteryLevel: z5.string().max(128).nullable().optional(),
      oidLoadPercent: z5.string().max(128).nullable().optional(),
      snmpPollInterval: z5.number().int().optional(),
      // Divisores de escala SNMP
      snmpVoltageDivisor: z5.number().optional(),
      snmpCurrentDivisor: z5.number().optional(),
      snmpTempDivisor: z5.number().optional(),
      snmpBatteryDivisor: z5.number().optional(),
      // Thresholds de alerta
      alertsEnabled: z5.boolean().optional(),
      alertTempMax: z5.number().nullable().optional(),
      alertVoltageMin: z5.number().nullable().optional(),
      alertVoltageMax: z5.number().nullable().optional(),
      alertBatteryMin: z5.number().nullable().optional(),
      alertBatteryMax: z5.number().nullable().optional(),
      alertCurrentMax: z5.number().nullable().optional(),
      alertLoadMax: z5.number().nullable().optional(),
      alertAcFailEnabled: z5.boolean().optional()
    })).mutation(({ input }) => {
      const { id, ...data } = input;
      return updatePowerSource(id, data);
    }),
    delete: adminProcedure.input(z5.object({ id: z5.number() })).mutation(({ input }) => deletePowerSource(input.id)),
    pollNow: adminProcedure.input(z5.object({ id: z5.number() })).mutation(({ input }) => pollSinglePowerSource(input.id)),
    readings: protectedProcedure.input(z5.object({ id: z5.number(), hours: z5.number().int().min(1).max(168).default(24) })).query(({ input }) => getSnmpReadings(input.id, input.hours))
  }),
  // ─── Alertas SNMP ──────────────────────────────────────────────────────────
  alerts: router({
    list: protectedProcedure.input(z5.object({
      powerSourceId: z5.number().optional(),
      onlyActive: z5.boolean().optional(),
      limit: z5.number().int().max(200).optional()
    })).query(({ input }) => getSnmpAlerts(input)),
    activeCount: protectedProcedure.query(() => countActiveSnmpAlerts()),
    acknowledge: adminProcedure.input(z5.object({ id: z5.number() })).mutation(
      ({ input, ctx }) => acknowledgeSnmpAlert(input.id, ctx.user.name ?? ctx.user.openId)
    ),
    resolve: adminProcedure.input(z5.object({ id: z5.number() })).mutation(({ input }) => resolveSnmpAlert(input.id)),
    testTelegram: adminProcedure.input(z5.object({ botToken: z5.string(), chatId: z5.string() })).mutation(async ({ input }) => {
      const result = await sendTelegramMessage(
        { botToken: input.botToken, chatId: input.chatId },
        `\u2705 <b>FiberDoc \u2014 Teste de notifica\xE7\xE3o</b>

Integra\xE7\xE3o com Telegram configurada com sucesso!
\u{1F550} ${(/* @__PURE__ */ new Date()).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}`
      );
      if (!result.ok) throw new TRPCError5({ code: "BAD_REQUEST", message: result.error ?? "Falha ao enviar" });
      return { ok: true };
    })
  }),
  // ─── Dispositivos Tuya IoT ─────────────────────────────────────────────────
  tuyaDevices: router({
    list: protectedProcedure.query(() => getTuyaDevices()),
    byId: protectedProcedure.input(z5.object({ id: z5.number() })).query(({ input }) => getTuyaDeviceById(input.id)),
    create: adminProcedure.input(z5.object({
      name: z5.string().min(1),
      deviceId: z5.string().min(1),
      type: z5.enum(["temperature_humidity", "temperature", "humidity", "co2", "smoke", "motion", "door", "power_meter", "other"]),
      tuyaAccountId: z5.number().optional(),
      roomId: z5.number().optional(),
      powerSourceId: z5.number().optional(),
      notes: z5.string().optional(),
      pollInterval: z5.number().int().min(30).max(86400).default(300),
      alertsEnabled: z5.boolean().default(false),
      alertTempMax: z5.number().optional(),
      alertTempMin: z5.number().optional(),
      alertHumidityMax: z5.number().optional(),
      alertHumidityMin: z5.number().optional(),
      alertCo2Max: z5.number().optional(),
      alertPowerMax: z5.number().optional()
    })).mutation(async ({ input }) => {
      const id = await createTuyaDevice(input);
      scheduleTuyaDevice(id, input.pollInterval);
      return { id };
    }),
    update: adminProcedure.input(z5.object({
      id: z5.number(),
      name: z5.string().min(1).optional(),
      deviceId: z5.string().min(1).optional(),
      type: z5.enum(["temperature_humidity", "temperature", "humidity", "co2", "smoke", "motion", "door", "power_meter", "other"]).optional(),
      tuyaAccountId: z5.number().nullable().optional(),
      roomId: z5.number().nullable().optional(),
      powerSourceId: z5.number().nullable().optional(),
      notes: z5.string().optional(),
      pollInterval: z5.number().int().min(30).max(86400).optional(),
      alertsEnabled: z5.boolean().optional(),
      alertTempMax: z5.number().nullable().optional(),
      alertTempMin: z5.number().nullable().optional(),
      alertHumidityMax: z5.number().nullable().optional(),
      alertHumidityMin: z5.number().nullable().optional(),
      alertCo2Max: z5.number().nullable().optional(),
      alertPowerMax: z5.number().nullable().optional()
    })).mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updateTuyaDevice(id, data);
      if (data.pollInterval !== void 0) {
        scheduleTuyaDevice(id, data.pollInterval);
      }
      return { ok: true };
    }),
    delete: adminProcedure.input(z5.object({ id: z5.number() })).mutation(async ({ input }) => {
      unscheduleTuyaDevice(input.id);
      await deleteTuyaDevice(input.id);
      return { ok: true };
    }),
    pollNow: adminProcedure.input(z5.object({ id: z5.number() })).mutation(({ input }) => pollSingleTuyaDevice(input.id)),
    readings: protectedProcedure.input(z5.object({ id: z5.number(), hours: z5.number().int().min(1).max(168).default(24) })).query(({ input }) => getTuyaReadingsByDevice(input.id, input.hours)),
    latestAll: protectedProcedure.query(() => getLatestTuyaReadings()),
    syncDevices: adminProcedure.input(z5.object({ accountId: z5.number() })).mutation(({ input }) => syncDevicesFromTuya(input.accountId)),
    testConnection: adminProcedure.input(z5.object({ accessId: z5.string(), accessSecret: z5.string(), region: z5.enum(["us", "eu", "cn", "in"]) })).mutation(({ input }) => testTuyaConnection(input))
  }),
  // ─── Contas Tuya IoT (múltiplas contas) ───────────────────────────────────────────
  tuyaAccounts: router({
    list: protectedProcedure.query(() => getTuyaAccounts()),
    byId: protectedProcedure.input(z5.object({ id: z5.number() })).query(({ input }) => getTuyaAccountById(input.id)),
    create: adminProcedure.input(z5.object({
      name: z5.string().min(1),
      accessId: z5.string().min(1),
      accessSecret: z5.string().min(1),
      region: z5.enum(["us", "eu", "cn", "in"]).default("us"),
      notes: z5.string().optional()
    })).mutation(async ({ input }) => {
      const id = await createTuyaAccount(input);
      return { id };
    }),
    update: adminProcedure.input(z5.object({
      id: z5.number(),
      name: z5.string().min(1).optional(),
      accessId: z5.string().min(1).optional(),
      accessSecret: z5.string().min(1).optional(),
      region: z5.enum(["us", "eu", "cn", "in"]).optional(),
      notes: z5.string().optional()
    })).mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updateTuyaAccount(id, data);
      return { ok: true };
    }),
    delete: adminProcedure.input(z5.object({ id: z5.number() })).mutation(async ({ input }) => {
      await deleteTuyaAccount(input.id);
      return { ok: true };
    }),
    testConnection: adminProcedure.input(z5.object({ accessId: z5.string(), accessSecret: z5.string(), region: z5.enum(["us", "eu", "cn", "in"]) })).mutation(({ input }) => testTuyaConnection(input))
  }),
  // ─── CTOs ────────────────────────────────────────────────────────────────────
  ctos: router({
    list: protectedProcedure.query(() => getCtos()),
    byId: protectedProcedure.input(z5.object({ id: z5.number() })).query(({ input }) => getCtoById(input.id)),
    create: adminProcedure.input(z5.object({
      name: z5.string().min(1),
      address: z5.string().optional(),
      capacity: z5.number().int().min(1).default(8),
      usedPorts: z5.number().int().min(0).default(0),
      status: z5.enum(["active", "maintenance", "inactive"]).default("active"),
      lat: z5.number().optional(),
      lng: z5.number().optional(),
      notes: z5.string().optional()
    })).mutation(async ({ input }) => {
      const id = await createCto(input);
      return { id };
    }),
    update: adminProcedure.input(z5.object({
      id: z5.number(),
      name: z5.string().min(1).optional(),
      address: z5.string().optional(),
      capacity: z5.number().int().min(1).optional(),
      usedPorts: z5.number().int().min(0).optional(),
      status: z5.enum(["active", "maintenance", "inactive"]).optional(),
      lat: z5.number().optional(),
      lng: z5.number().optional(),
      notes: z5.string().optional()
    })).mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updateCto(id, data);
      return { ok: true };
    }),
    delete: adminProcedure.input(z5.object({ id: z5.number() })).mutation(async ({ input }) => {
      await deleteCto(input.id);
      return { ok: true };
    }),
    importCsv: adminProcedure.input(z5.object({
      rows: z5.array(z5.object({
        name: z5.string().min(1),
        address: z5.string().optional(),
        capacity: z5.number().int().min(1).default(8),
        usedPorts: z5.number().int().min(0).default(0),
        status: z5.enum(["active", "maintenance", "inactive"]).default("active"),
        lat: z5.number().optional(),
        lng: z5.number().optional(),
        notes: z5.string().optional()
      }))
    })).mutation(async ({ input }) => {
      let created = 0;
      const errors = [];
      for (const row of input.rows) {
        try {
          await createCto(row);
          created++;
        } catch (e) {
          errors.push(`${row.name}: ${e.message}`);
        }
      }
      return { created, errors };
    }),
    mapElement: protectedProcedure.input(z5.object({ ctoId: z5.number() })).query(async ({ input }) => {
      const all = await getMapElements();
      return all.find((e) => e.type === "cto" && e.referenceId === input.ctoId) ?? null;
    })
  }),
  // ─── Mapa de Infraestrutura ───────────────────────────────────────────────────
  infraMap: router({
    elements: protectedProcedure.query(() => getMapElements()),
    routes: protectedProcedure.query(() => getMapRoutes()),
    upsertElement: adminProcedure.input(z5.object({
      type: z5.enum(["ceo", "cto"]),
      referenceId: z5.number(),
      lat: z5.number(),
      lng: z5.number(),
      color: z5.string().nullable().optional()
    })).mutation(async ({ input }) => {
      const id = await upsertMapElement(input.type, input.referenceId, input.lat, input.lng, input.color);
      return { id };
    }),
    deleteElement: adminProcedure.input(z5.object({ id: z5.number() })).mutation(async ({ input }) => {
      await deleteMapElement(input.id);
      return { ok: true };
    }),
    createRoute: adminProcedure.input(z5.object({
      name: z5.string().optional(),
      fromElementId: z5.number().optional(),
      toElementId: z5.number().optional(),
      fromTubeId: z5.number().nullable().optional(),
      toTubeId: z5.number().nullable().optional(),
      fiberCount: z5.number().int().min(1).default(12),
      cableType: z5.string().default("FO"),
      color: z5.string().default("#22d3ee"),
      path: z5.string().optional(),
      notes: z5.string().optional()
    })).mutation(async ({ input }) => {
      const id = await createMapRoute(input);
      return { id };
    }),
    updateRoute: adminProcedure.input(z5.object({
      id: z5.number(),
      name: z5.string().optional(),
      fiberCount: z5.number().int().min(1).optional(),
      cableType: z5.string().optional(),
      color: z5.string().optional(),
      path: z5.string().optional(),
      notes: z5.string().optional(),
      fromElementId: z5.number().nullable().optional(),
      toElementId: z5.number().nullable().optional(),
      fromTubeId: z5.number().nullable().optional(),
      toTubeId: z5.number().nullable().optional()
    })).mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updateMapRoute(id, data);
      return { ok: true };
    }),
    splitRoute: adminProcedure.input(z5.object({
      id: z5.number(),
      // rota a dividir
      splitPointIndex: z5.number().int(),
      // índice do ponto no path onde dividir
      elementId: z5.number()
      // CEO/CTO a inserir no ponto de divisão
    })).mutation(async ({ input }) => {
      const { id, splitPointIndex, elementId } = input;
      const routes = await getMapRoutes();
      const route = routes.find((r) => r.id === id);
      if (!route) throw new TRPCError5({ code: "NOT_FOUND", message: "Rota n\xE3o encontrada" });
      const path7 = route.path ? JSON.parse(route.path) : [];
      if (path7.length < 2) throw new TRPCError5({ code: "BAD_REQUEST", message: "Tra\xE7ado insuficiente para dividir" });
      const clampedIdx = Math.max(1, Math.min(splitPointIndex, path7.length - 2));
      const path1 = path7.slice(0, clampedIdx + 1);
      const path22 = path7.slice(clampedIdx);
      await updateMapRoute(id, {
        path: JSON.stringify(path1),
        toElementId: elementId
      });
      const newId = await createMapRoute({
        name: route.name ? `${route.name} (2)` : void 0,
        fromElementId: elementId,
        toElementId: route.toElementId ?? void 0,
        fiberCount: route.fiberCount ?? 12,
        cableType: route.cableType ?? "FO",
        color: route.color ?? "#22d3ee",
        path: JSON.stringify(path22),
        notes: route.notes ?? void 0
      });
      return { ok: true, newRouteId: newId };
    }),
    deleteRoute: adminProcedure.input(z5.object({ id: z5.number() })).mutation(async ({ input }) => {
      await deleteMapRoute(input.id);
      return { ok: true };
    }),
    exportKml: protectedProcedure.input(z5.object({
      format: z5.enum(["kml", "kmz"]).default("kml"),
      // Seleção granular: se omitido, exporta tudo
      elementIds: z5.array(z5.number()).optional(),
      // IDs de mapElements
      routeIds: z5.array(z5.number()).optional(),
      // IDs de mapRoutes
      includeFibers: z5.boolean().default(false),
      // incluir fibras ópticas como linhas
      fiberIds: z5.array(z5.number()).optional()
      // IDs de fibras específicas
    })).mutation(async ({ input }) => {
      const dbMod = await Promise.resolve().then(() => (init_db(), db_exports));
      const [allElements, allRoutes, allCtos, allCeos, allFibers] = await Promise.all([
        getMapElements(),
        getMapRoutes(),
        getCtos(),
        dbMod.getCeos(),
        input.includeFibers ? dbMod.getFibers() : Promise.resolve([])
      ]);
      const elements = input.elementIds?.length ? allElements.filter((e) => input.elementIds.includes(e.id)) : allElements;
      const routes = input.routeIds?.length ? allRoutes.filter((r) => input.routeIds.includes(r.id)) : allRoutes;
      const fibers2 = input.fiberIds?.length ? allFibers.filter((f) => input.fiberIds.includes(f.id)) : allFibers;
      const ctoMap = new Map(allCtos.map((c) => [c.id, c]));
      const ceoMap = new Map(allCeos.map((c) => [c.id, c]));
      const placemarks = elements.map((el) => {
        const isCtO = el.type === "cto";
        const ref = isCtO ? ctoMap.get(el.referenceId) : ceoMap.get(el.referenceId);
        const name = ref?.name ?? (isCtO ? `CTO-${el.referenceId}` : `CEO-${el.referenceId}`);
        const status = ref?.status ?? "active";
        const iconColor = status === "active" ? "ff00ff00" : status === "maintenance" ? "ff00ffff" : "ff0000ff";
        return `  <Placemark>
    <name>${name}</name>
    <description>${isCtO ? `CTO \u2014 Capacidade: ${ref?.capacity ?? 0} portas, Usadas: ${ref?.usedPorts ?? 0}` : "CEO"}</description>
    <Style><IconStyle><color>${iconColor}</color><scale>1.2</scale><Icon><href>http://maps.google.com/mapfiles/kml/shapes/${isCtO ? "square" : "donut"}.png</href></Icon></IconStyle></Style>
    <Point><coordinates>${el.lng},${el.lat},0</coordinates></Point>
  </Placemark>`;
      }).join("\n");
      const linemarks = routes.map((r) => {
        const fromEl = elements.find((e) => e.id === r.fromElementId);
        const toEl = elements.find((e) => e.id === r.toElementId);
        let coords = "";
        if (fromEl) coords += `${fromEl.lng},${fromEl.lat},0`;
        if (r.path) {
          try {
            const pts = JSON.parse(r.path);
            if (pts.length > 0) {
              if (coords) coords += " ";
              coords += pts.map((p) => `${p.lng},${p.lat},0`).join(" ");
            }
          } catch {
          }
        }
        if (toEl) coords += (coords ? " " : "") + `${toEl.lng},${toEl.lat},0`;
        if (!coords) return "";
        const color = (r.color ?? "#22d3ee").replace("#", "ff");
        return `  <Placemark>
    <name>${r.name ?? `Cabo ${r.id}`}</name>
    <description>${r.cableType ?? "FO"} \u2014 ${r.fiberCount ?? 12} fibras${r.notes ? " \u2014 " + r.notes : ""}</description>
    <Style><LineStyle><color>${color}</color><width>3</width></LineStyle></Style>
    <LineString><tessellate>1</tessellate><coordinates>${coords}</coordinates></LineString>
  </Placemark>`;
      }).filter(Boolean).join("\n");
      const fibermarks = fibers2.map((f) => {
        const name = f.name ?? `Fibra-${f.id}`;
        const color = f.status === "active" ? "ff00ff00" : f.status === "maintenance" ? "ff00ffff" : "ff0000ff";
        if (!f.path) return "";
        let coords = "";
        try {
          coords = JSON.parse(f.path).map((p) => `${p.lng},${p.lat},0`).join(" ");
        } catch {
          return "";
        }
        if (!coords) return "";
        return `  <Placemark>
    <name>${name}</name>
    <description>${f.type ?? "FO"} \u2014 ${f.fiberCount ?? ""} fibras \u2014 Status: ${f.status ?? "active"}</description>
    <Style><LineStyle><color>${color}</color><width>2</width></LineStyle></Style>
    <LineString><tessellate>1</tessellate><coordinates>${coords}</coordinates></LineString>
  </Placemark>`;
      }).filter(Boolean).join("\n");
      const fiberFolder = fibermarks ? `  <Folder><name>Fibras \xD3pticas</name>
${fibermarks}
  </Folder>` : "";
      const kml = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
<Document>
  <name>FiberDoc \u2014 Infraestrutura de Rede</name>
  <description>Exportado em ${(/* @__PURE__ */ new Date()).toLocaleString("pt-BR")}</description>
  <Folder><name>Equipamentos</name>
${placemarks}
  </Folder>
  <Folder><name>Cabos</name>
${linemarks}
  </Folder>
${fiberFolder}
</Document>
</kml>`;
      if (input.format === "kmz") {
        const { zipSync, strToU8 } = await import("fflate");
        const kmlU8 = strToU8(kml);
        const zipped = zipSync({ "doc.kml": [kmlU8, { level: 0 }] });
        const kmzBase64 = Buffer.from(zipped).toString("base64");
        return { kml, kmzBase64, format: "kmz" };
      }
      return { kml, kmzBase64: null, format: input.format };
    }),
    exportCables: protectedProcedure.input(z5.object({
      format: z5.enum(["csv", "pdf", "group_summary"]).default("csv")
    })).mutation(async ({ input }) => {
      const dbMod = await Promise.resolve().then(() => (init_db(), db_exports));
      const [allRoutes, allElements, allCtos, allCeos, allGroups, allRouteGroups] = await Promise.all([
        getMapRoutes(),
        getMapElements(),
        dbMod.getCtos(),
        dbMod.getCeos(),
        dbMod.getMapGroups(),
        dbMod.getAllRouteGroupMemberships()
      ]);
      const haversine = (a, b) => {
        const R = 6371;
        const dLat = (b.lat - a.lat) * Math.PI / 180;
        const dLng = (b.lng - a.lng) * Math.PI / 180;
        const s = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * Math.PI / 180) * Math.cos(b.lat * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
        return R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
      };
      const calcLen = (path7) => {
        let d = 0;
        for (let i = 1; i < path7.length; i++) d += haversine(path7[i - 1], path7[i]);
        return d;
      };
      const rows = allRoutes.map((r) => {
        const fromEl = allElements.find((e) => e.id === r.fromElementId);
        const toEl = allElements.find((e) => e.id === r.toElementId);
        const fromRef = fromEl?.type === "cto" ? allCtos.find((c) => c.id === fromEl?.referenceId) : allCeos.find((c) => c.id === fromEl?.referenceId);
        const toRef = toEl?.type === "cto" ? allCtos.find((c) => c.id === toEl?.referenceId) : allCeos.find((c) => c.id === toEl?.referenceId);
        let path7 = [];
        try {
          if (r.path) path7 = JSON.parse(r.path);
        } catch {
        }
        const lenKm = path7.length >= 2 ? calcLen(path7) : null;
        const lenM = lenKm != null ? lenKm * 1e3 : null;
        const routeGroupIds = allRouteGroups.filter((rg) => Number(rg.routeId) === Number(r.id)).map((rg) => Number(rg.groupId));
        const routeGroupNames = routeGroupIds.map((gid) => allGroups.find((g) => Number(g.id) === gid)?.name ?? "?").join("; ");
        return {
          id: Number(r.id),
          nome: String(r.name ?? `Cabo ${r.id}`),
          tipo: String(r.cableType ?? "FO"),
          fibras: Number(r.fiberCount ?? 0),
          de: String(fromRef?.name ?? (fromEl ? `${fromEl.type?.toUpperCase()}-${fromEl.referenceId}` : "\u2014")),
          para: String(toRef?.name ?? (toEl ? `${toEl.type?.toUpperCase()}-${toEl.referenceId}` : "\u2014")),
          comprimento_km: lenKm != null ? lenKm.toFixed(3) : "\u2014",
          comprimento_m: lenM != null ? Math.round(lenM) : 0,
          status: !fromEl || !toEl ? "Solto" : "Conectado",
          pontos: Number(path7.length),
          notas: String(r.notes ?? ""),
          grupos: String(routeGroupNames || "Sem grupo"),
          groupIds: routeGroupIds
        };
      });
      if (input.format === "group_summary") {
        const groupMap = {};
        for (const row of rows) {
          const gids = row.groupIds;
          const keys = gids.length > 0 ? gids : [-1];
          for (const gid of keys) {
            const g = allGroups.find((x) => x.id === gid);
            const key = String(gid);
            if (!groupMap[key]) groupMap[key] = { groupId: gid === -1 ? null : gid, groupName: g?.name ?? "Sem grupo", groupColor: g?.color ?? "#888", cabos: 0, metros: 0, fibras: 0 };
            groupMap[key].cabos++;
            if (row.comprimento_m != null) groupMap[key].metros += row.comprimento_m;
            groupMap[key].fibras += Number(row.fibras) || 0;
          }
        }
        const summary = Object.values(groupMap).sort((a, b) => b.metros - a.metros).map((s) => ({
          groupId: s.groupId,
          groupName: String(s.groupName),
          groupColor: String(s.groupColor),
          cabos: Number(s.cabos),
          metros: Number(s.metros),
          fibras: Number(s.fibras)
        }));
        return { format: "group_summary", csv: null, rows: null, summary, allRows: null };
      }
      if (input.format === "csv") {
        const header = ["ID", "Nome", "Tipo", "Fibras", "De", "Para", "Comprimento (km)", "Comprimento (m)", "Status", "Grupos", "Pontos no Tra\xE7ado", "Notas"];
        const lines = rows.map((r) => [
          r.id,
          `"${r.nome}"`,
          r.tipo,
          r.fibras,
          `"${r.de}"`,
          `"${r.para}"`,
          r.comprimento_km,
          r.comprimento_m ?? "",
          r.status,
          `"${r.grupos}"`,
          r.pontos,
          `"${r.notas}"`
        ].join(","));
        const csv = [header.join(","), ...lines].join("\n");
        return { format: "csv", csv, rows: null, summary: null, allRows: null };
      }
      return { format: "pdf", csv: null, rows, summary: null, allRows: null };
    }),
    routesOccupancy: protectedProcedure.query(async () => {
      const dbMod = await Promise.resolve().then(() => (init_db(), db_exports));
      return dbMod.getRoutesOccupancy();
    }),
    tubesByElement: publicProcedure.input(z5.object({ elementId: z5.number() })).query(async ({ input }) => getTubesByMapElement(input.elementId)),
    // ─── Tubos extras por cabo (múltiplos tubos de origem/destino) ───────────
    routeExtraTubes: protectedProcedure.input(z5.object({ routeId: z5.number() })).query(({ input }) => getRouteExtraTubes(input.routeId)),
    addRouteExtraTube: adminProcedure.input(z5.object({
      routeId: z5.number(),
      elementId: z5.number(),
      tubeId: z5.number(),
      side: z5.enum(["from", "to"]),
      notes: z5.string().optional()
    })).mutation(async ({ input }) => {
      const id = await addRouteExtraTube(input);
      return { id };
    }),
    deleteRouteExtraTube: adminProcedure.input(z5.object({ id: z5.number() })).mutation(async ({ input }) => {
      await deleteRouteExtraTube(input.id);
      return { ok: true };
    }),
    traceOtdr: protectedProcedure.input(z5.object({
      elementId: z5.number(),
      // map_elements.id do ponto de partida
      tubeId: z5.number(),
      // id do tubo de saída no elemento
      viaNumber: z5.number().int().min(1),
      // número da via dentro do tubo
      distanceMeters: z5.number().positive()
      // distância alvo em metros
    })).query(async ({ input }) => {
      const dbMod = await Promise.resolve().then(() => (init_db(), db_exports));
      return dbMod.traceOtdrPath(
        input.elementId,
        input.tubeId,
        input.viaNumber,
        input.distanceMeters
      );
    }),
    // ─── OLT no Mapa ─────────────────────────────────────────────────────────
    oltElements: protectedProcedure.query(() => getMapOltElements()),
    oltElementById: protectedProcedure.input(z5.object({ id: z5.number() })).query(({ input }) => getMapOltElementById(input.id)),
    createOltElement: adminProcedure.input(z5.object({
      equipmentId: z5.number(),
      lat: z5.number(),
      lng: z5.number(),
      defaultTxPowerDbm: z5.number().default(5),
      fiberAttenuationDbPerKm: z5.number().default(0.35),
      fusionLossDb: z5.number().default(0.1),
      notes: z5.string().optional()
    })).mutation(async ({ input }) => {
      const id = await createMapOltElement(input);
      return { id };
    }),
    updateOltElement: adminProcedure.input(z5.object({
      id: z5.number(),
      lat: z5.number().optional(),
      lng: z5.number().optional(),
      defaultTxPowerDbm: z5.number().optional(),
      fiberAttenuationDbPerKm: z5.number().optional(),
      fusionLossDb: z5.number().optional(),
      notes: z5.string().nullable().optional()
    })).mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updateMapOltElement(id, data);
      return { ok: true };
    }),
    deleteOltElement: adminProcedure.input(z5.object({ id: z5.number() })).mutation(async ({ input }) => {
      await deleteMapOltElement(input.id);
      return { ok: true };
    }),
    oltPortLinks: protectedProcedure.input(z5.object({ oltElementId: z5.number() })).query(({ input }) => getOltPortLinks(input.oltElementId)),
    createOltPortLink: adminProcedure.input(z5.object({
      oltElementId: z5.number(),
      portId: z5.number(),
      txPowerDbm: z5.number().nullable().optional(),
      ceoElementId: z5.number(),
      tubeId: z5.number(),
      viaNumber: z5.number().int().min(1),
      notes: z5.string().optional()
    })).mutation(async ({ input }) => {
      const id = await createOltPortLink(input);
      return { id };
    }),
    updateOltPortLink: adminProcedure.input(z5.object({
      id: z5.number(),
      txPowerDbm: z5.number().nullable().optional(),
      ceoElementId: z5.number().optional(),
      tubeId: z5.number().optional(),
      viaNumber: z5.number().int().min(1).optional(),
      notes: z5.string().nullable().optional()
    })).mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updateOltPortLink(id, data);
      return { ok: true };
    }),
    deleteOltPortLink: adminProcedure.input(z5.object({ id: z5.number() })).mutation(async ({ input }) => {
      await deleteOltPortLink(input.id);
      return { ok: true };
    }),
    opticalBalance: protectedProcedure.input(z5.object({ ctoElementId: z5.number() })).query(({ input }) => calculateOpticalBalance(input.ctoElementId)),
    dgoPortOpticalBalance: protectedProcedure.input(z5.object({
      dgoElementId: z5.number(),
      slotId: z5.number(),
      portNumber: z5.number(),
      ctoElementId: z5.number().optional()
    })).query(({ input }) => calculateOpticalBalanceFromDgo(input)),
    dgoSlotCtoBalances: protectedProcedure.input(z5.object({
      dgoElementId: z5.number(),
      slotId: z5.number(),
      portNumber: z5.number()
    })).query(({ input }) => getDgoSlotCtoBalances(input)),
    dgoPortFiberLinks: protectedProcedure.input(z5.object({ dgoElementId: z5.number() })).query(({ input }) => getDgoPortFiberLinks(input.dgoElementId)),
    createDgoPortFiberLink: adminProcedure.input(z5.object({
      dgoElementId: z5.number(),
      portId: z5.number(),
      txPowerDbm: z5.number().nullable().optional(),
      ceoElementId: z5.number(),
      tubeId: z5.number(),
      viaNumber: z5.number().int().min(1),
      notes: z5.string().optional()
    })).mutation(async ({ input }) => {
      const id = await createDgoPortFiberLink(input);
      return { id };
    }),
    updateDgoPortFiberLink: adminProcedure.input(z5.object({
      id: z5.number(),
      txPowerDbm: z5.number().nullable().optional(),
      ceoElementId: z5.number().optional(),
      tubeId: z5.number().optional(),
      viaNumber: z5.number().int().min(1).optional(),
      notes: z5.string().nullable().optional()
    })).mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updateDgoPortFiberLink(id, data);
      return { ok: true };
    }),
    deleteDgoPortFiberLink: adminProcedure.input(z5.object({ id: z5.number() })).mutation(async ({ input }) => {
      await deleteDgoPortFiberLink(input.id);
      return { ok: true };
    }),
    portsByOltElement: publicProcedure.input(z5.object({ oltElementId: z5.number() })).query(async ({ input }) => {
      const olt = await getMapOltElementById(input.oltElementId);
      if (!olt) return [];
      return getPortsByEquipment(olt.equipmentId);
    }),
    // ─── DGO no Mapa ─────────────────────────────────────────────────────────
    dgoElements: protectedProcedure.query(() => getMapDgoElements()),
    dgoElementById: protectedProcedure.input(z5.object({ id: z5.number() })).query(({ input }) => getMapDgoElementById(input.id)),
    createDgoElement: adminProcedure.input(z5.object({
      equipmentId: z5.number(),
      lat: z5.number(),
      lng: z5.number(),
      notes: z5.string().optional()
    })).mutation(async ({ input }) => {
      const id = await createMapDgoElement(input);
      return { id };
    }),
    updateDgoElement: adminProcedure.input(z5.object({
      id: z5.number(),
      lat: z5.number().optional(),
      lng: z5.number().optional(),
      notes: z5.string().nullable().optional()
    })).mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updateMapDgoElement(id, data);
      return { ok: true };
    }),
    deleteDgoElement: adminProcedure.input(z5.object({ id: z5.number() })).mutation(async ({ input }) => {
      await deleteMapDgoElement(input.id);
      return { ok: true };
    }),
    dgoSlotLinks: protectedProcedure.input(z5.object({ dgoElementId: z5.number() })).query(({ input }) => getDgoSlotCableLinks(input.dgoElementId)),
    createDgoSlotLink: adminProcedure.input(z5.object({
      dgoElementId: z5.number(),
      slotId: z5.number(),
      routeId: z5.number(),
      side: z5.enum(["in", "out"]),
      notes: z5.string().optional()
    })).mutation(async ({ input }) => {
      const id = await createDgoSlotCableLink(input);
      return { id };
    }),
    deleteDgoSlotLink: adminProcedure.input(z5.object({ id: z5.number() })).mutation(async ({ input }) => {
      await deleteDgoSlotCableLink(input.id);
      return { ok: true };
    }),
    slotsByDgoElement: protectedProcedure.input(z5.object({ dgoElementId: z5.number() })).query(async ({ input }) => {
      const dgo = await getMapDgoElementById(input.dgoElementId);
      if (!dgo) return [];
      return getSlotsByEquipment(dgo.equipmentId);
    }),
    // ─── Vinculação Porta DGO → CEO passagem + Equipamento ─────────────────────
    dgoPortLinks: protectedProcedure.input(z5.object({ dgoElementId: z5.number() })).query(({ input }) => getDgoPortLinks(input.dgoElementId)),
    upsertDgoPortLink: adminProcedure.input(z5.object({
      dgoElementId: z5.number(),
      slotId: z5.number(),
      portNumber: z5.number().int().min(1),
      ceoElementId: z5.number().nullable().optional(),
      portId: z5.number().nullable().optional(),
      notes: z5.string().nullable().optional()
    })).mutation(async ({ input }) => {
      const id = await upsertDgoPortLink(input);
      return { id };
    }),
    deleteDgoPortLink: adminProcedure.input(z5.object({ id: z5.number() })).mutation(async ({ input }) => {
      await deleteDgoPortLink(input.id);
      return { ok: true };
    }),
    portsByEquipmentForDgo: protectedProcedure.input(z5.object({ equipmentId: z5.number() })).query(({ input }) => getPortsByEquipmentForDgo(input.equipmentId))
  }),
  // ─── SGP Config ───────────────────────────────────────────────────────────────
  sgp: router({
    config: protectedProcedure.query(() => getSgpConfig()),
    // ─── CPE Manager: Listar OLTs do SGP ──────────────────────────────────────
    listOlts: protectedProcedure.query(async () => {
      const cfg = await getSgpConfig();
      if (!cfg || !cfg.active) return { olts: [], error: "SGP n\xE3o configurado" };
      try {
        const base = cfg.baseUrl.replace(/\/$/, "");
        const res = await sgpFetch(`${base}/api/fttx/olt/`, cfg, { timeoutMs: 1e4 });
        if (!res.ok) return { olts: [], error: `HTTP ${res.status}` };
        const data = await res.json();
        const olts = Array.isArray(data) ? data : data.results ?? data.data ?? [];
        return { olts, error: null };
      } catch (e) {
        return { olts: [], error: e.message ?? "Erro ao listar OLTs" };
      }
    }),
    // ─── CPE Manager: Listar ONUs de uma OLT ──────────────────────────────────
    listOnusByOlt: protectedProcedure.input(z5.object({
      oltId: z5.number(),
      search: z5.string().optional(),
      limit: z5.number().min(1).max(500).default(100)
    })).query(async ({ input }) => {
      const cfg = await getSgpConfig();
      if (!cfg || !cfg.active) return { onus: [], error: "SGP n\xE3o configurado" };
      try {
        const base = cfg.baseUrl.replace(/\/$/, "");
        const extraFields = {};
        if (input.search) extraFields.q = input.search;
        const res = await sgpFetch(
          `${base}/api/fttx/olt/${input.oltId}/onu/list/`,
          cfg,
          { extraFields, timeoutMs: 15e3 }
        );
        if (!res.ok) return { onus: [], error: `HTTP ${res.status}` };
        const data = await res.json();
        const all = Array.isArray(data) ? data : data.results ?? data.data ?? [];
        const filtered = input.search ? all.filter((o) => {
          const s = input.search.toLowerCase();
          return String(o.login ?? "").toLowerCase().includes(s) || String(o.onu_login ?? "").toLowerCase().includes(s) || String(o.serial ?? "").toLowerCase().includes(s) || String(o.address ?? "").toLowerCase().includes(s);
        }) : all;
        return { onus: filtered.slice(0, input.limit), error: null };
      } catch (e) {
        return { onus: [], error: e.message ?? "Erro ao listar ONUs" };
      }
    }),
    saveConfig: adminProcedure.input(z5.object({
      baseUrl: z5.string().url(),
      token: z5.string().min(1),
      app: z5.string().min(1),
      active: z5.boolean().default(true)
    })).mutation(async ({ input }) => {
      await saveSgpConfig(input);
      sgpCacheInvalidateAll();
      return { ok: true };
    }),
    queryClientsByCto: protectedProcedure.input(z5.object({ ctoName: z5.string(), sgpId: z5.number().nullable().optional() })).query(async ({ input }) => {
      const cfg = await getSgpConfig();
      if (!cfg || !cfg.active) return { clients: [], error: "SGP n\xE3o configurado" };
      try {
        const base = cfg.baseUrl.replace(/\/$/, "");
        if (input.sgpId != null) {
          const url = `${base}/api/fttx/splitter/${input.sgpId}/onu/all/`;
          const res = await sgpFetch(url, cfg, {
            extraFields: { signal: "1", connection: "1", address: "1" },
            timeoutMs: 15e3
          });
          if (res.ok) {
            const json = await res.json();
            const onus = Array.isArray(json) ? json : json?.data ?? json?.results ?? [];
            const clients = onus.map((o) => ({
              // Nome do cliente vinculado à ONU
              name: (o.service_cliente ?? null) || (o.description?.trim() ?? null),
              login: o.service_login ?? o.login ?? null,
              // Status: connection=1 não retorna dados neste SGP
              // Heurística: se info_rx tem valor numérico, ONU está online
              status: (() => {
                if (o.connection != null) return o.connection;
                const rx = parseFloat(o.info_rx);
                if (!isNaN(rx)) return "Online";
                return "Offline";
              })(),
              phy_addr: o.phy_addr ?? null,
              // MAC da ONU
              onu: o.onuid ?? o.id ?? null,
              // número da ONU na PON
              slot: o.slot ?? null,
              pon: o.pon ?? null,
              olt: o.olt_name ?? null,
              rx: o.info_rx ?? null,
              // sinal RX ONU (dBm)
              tx: o.info_tx ?? null,
              // sinal TX ONU (dBm)
              olt_rx: o.info_olt_rx ?? null,
              // sinal RX na OLT (dBm)
              signal_date: o.info_date ?? null,
              // data da última leitura de sinal
              contrato: o.service_contrato ?? null,
              ctoport: o.ctoport ?? null,
              // porta da CTO
              raw: o
            }));
            return { clients, error: null };
          }
          console.log("[SGP queryClientsByCto] onu/all endpoint failed, status:", res.status);
        }
        return { clients: [], error: null };
      } catch (e) {
        return { clients: [], error: e.message ?? "Erro ao consultar SGP" };
      }
    }),
    // ─── Testar conexão ─────────────────────────────────────────────────────────
    testConnection: adminProcedure.mutation(async () => {
      const cfg = await getSgpConfig();
      if (!cfg || !cfg.active) return { ok: false, error: "SGP n\xE3o configurado" };
      try {
        const base = cfg.baseUrl.replace(/\/$/, "");
        sgpCacheInvalidateAll();
        const res = await sgpFetch(`${base}/api/fttx/splitter/all/`, cfg, { timeoutMs: 8e3 });
        if (!res.ok) return { ok: false, error: `HTTP ${res.status}` };
        return { ok: true, error: null };
      } catch (e) {
        return { ok: false, error: e.message ?? "Erro de conex\xE3o" };
      }
    }),
    // ─── Listar CTOs do SGP ───────────────────────────────────────────────────────
    listCtos: protectedProcedure.query(async () => {
      const cfg = await getSgpConfig();
      if (!cfg || !cfg.active) return { ctos: [], error: "SGP n\xE3o configurado" };
      try {
        const base = cfg.baseUrl.replace(/\/$/, "");
        const ctos2 = await sgpCacheGet("sgp:ctos", async () => {
          const res = await sgpFetch(`${base}/api/fttx/splitter/all/`, cfg, { timeoutMs: 15e3 });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const data = await res.json();
          return Array.isArray(data) ? data : data.results ?? data.data ?? [];
        });
        return { ctos: ctos2, error: null };
      } catch (e) {
        return { ctos: [], error: e.message ?? "Erro ao listar CTOs" };
      }
    }),
    // ─── Sincronizar CTO do SGP para FiberDoc ────────────────────────────────────
    syncCtoFromSgp: adminProcedure.input(z5.object({
      sgpId: z5.number(),
      ident: z5.string(),
      note: z5.string().optional(),
      lat: z5.number().nullable().optional(),
      lng: z5.number().nullable().optional(),
      unPorts: z5.number().optional()
    })).mutation(async ({ input }) => {
      const existing = await getCtos();
      const found = existing.find((c) => c.name === input.ident || c.sgpId === input.sgpId);
      if (found) return { id: found.id, created: false, message: "CTO j\xE1 existe no FiberDoc" };
      const id = await createCto({
        name: input.ident,
        sgpId: input.sgpId,
        notes: input.note ?? "",
        lat: input.lat ?? null,
        lng: input.lng ?? null,
        capacity: input.unPorts ?? 8,
        status: "active"
      });
      return { id, created: true, message: "CTO importada com sucesso" };
    }),
    // ─── Criar CTO no SGP ao criar no FiberDoc ────────────────────────────────────
    createCtoInSgp: adminProcedure.input(z5.object({
      ident: z5.string().min(1),
      note: z5.string().optional(),
      lat: z5.string().optional(),
      lng: z5.string().optional()
    })).mutation(async ({ input }) => {
      const cfg = await getSgpConfig();
      if (!cfg || !cfg.active) return { ok: false, sgpId: null, error: "SGP n\xE3o configurado" };
      try {
        const base = cfg.baseUrl.replace(/\/$/, "");
        const createFields = { ident: input.ident };
        if (input.note) createFields.note = input.note;
        if (input.lat) createFields.lat = input.lat;
        if (input.lng) createFields.lng = input.lng;
        const res = await sgpFetch(`${base}/api/fttx/splitter/create/`, cfg, {
          method: "POST",
          extraFields: createFields,
          timeoutMs: 1e4
        });
        if (!res.ok) return { ok: false, sgpId: null, error: `HTTP ${res.status}` };
        const data = await res.json();
        const sgpId = data?.id ?? data?.splitter_id ?? null;
        return { ok: true, sgpId, error: null };
      } catch (e) {
        return { ok: false, sgpId: null, error: e.message ?? "Erro ao criar CTO no SGP" };
      }
    }),
    // ─── ONUs vinculadas a uma CTO ────────────────────────────────────────────────
    onusByCto: protectedProcedure.input(z5.object({ sgpCtoId: z5.number() })).query(async ({ input }) => {
      const cfg = await getSgpConfig();
      if (!cfg || !cfg.active) return { onus: [], error: "SGP n\xE3o configurado" };
      try {
        const base = cfg.baseUrl.replace(/\/$/, "");
        const res = await sgpFetch(`${base}/api/fttx/splitter/${input.sgpCtoId}/onu/list/`, cfg, { timeoutMs: 1e4 });
        if (!res.ok) return { onus: [], error: `HTTP ${res.status}` };
        const data = await res.json();
        const onus = Array.isArray(data) ? data : data.results ?? data.data ?? [];
        return { onus, error: null };
      } catch (e) {
        return { onus: [], error: e.message ?? "Erro ao listar ONUs" };
      }
    }),
    // ─── Autorizar ONU ────────────────────────────────────────────────────────────
    authorizeOnu: adminProcedure.input(z5.object({
      oltId: z5.number(),
      onu: z5.number(),
      slot: z5.number(),
      pon: z5.number(),
      contrato: z5.number().optional()
    })).mutation(async ({ input }) => {
      const cfg = await getSgpConfig();
      if (!cfg || !cfg.active) throw new TRPCError5({ code: "PRECONDITION_FAILED", message: "SGP n\xE3o configurado" });
      try {
        const base = cfg.baseUrl.replace(/\/$/, "");
        const res = await sgpFetch(`${base}/api/fttx/olt/${input.oltId}/onu/authorize/`, cfg, {
          method: "POST",
          extraFields: {
            onu: String(input.onu),
            slot: String(input.slot),
            pon: String(input.pon),
            ...input.contrato ? { contrato: String(input.contrato) } : {}
          },
          timeoutMs: 15e3
        });
        if (!res.ok) throw new TRPCError5({ code: "INTERNAL_SERVER_ERROR", message: `HTTP ${res.status}` });
        const data = await res.json();
        return { ok: true, data };
      } catch (e) {
        if (e instanceof TRPCError5) throw e;
        throw new TRPCError5({ code: "INTERNAL_SERVER_ERROR", message: e.message });
      }
    }),
    // ─── Resetar ONU ─────────────────────────────────────────────────────────────
    resetOnu: adminProcedure.input(z5.object({
      oltId: z5.number(),
      onu: z5.number(),
      slot: z5.number(),
      pon: z5.number()
    })).mutation(async ({ input }) => {
      const cfg = await getSgpConfig();
      if (!cfg || !cfg.active) throw new TRPCError5({ code: "PRECONDITION_FAILED", message: "SGP n\xE3o configurado" });
      try {
        const base = cfg.baseUrl.replace(/\/$/, "");
        const res = await sgpFetch(`${base}/api/fttx/olt/${input.oltId}/onu/reset/`, cfg, {
          extraFields: { onu: String(input.onu), slot: String(input.slot), pon: String(input.pon) },
          timeoutMs: 15e3
        });
        if (!res.ok) throw new TRPCError5({ code: "INTERNAL_SERVER_ERROR", message: `HTTP ${res.status}` });
        const data = await res.json();
        return { ok: true, data };
      } catch (e) {
        if (e instanceof TRPCError5) throw e;
        throw new TRPCError5({ code: "INTERNAL_SERVER_ERROR", message: e.message });
      }
    }),
    // ─── Pesquisar clientes no SGP ────────────────────────────────────────────────
    searchClients: protectedProcedure.input(z5.object({ query: z5.string().min(2) })).query(async ({ input }) => {
      const cfg = await getSgpConfig();
      if (!cfg || !cfg.active) return { clients: [], error: "SGP n\xE3o configurado" };
      try {
        const base = cfg.baseUrl.replace(/\/$/, "");
        const res = await sgpFetch(`${base}/api/clientes/`, cfg, { extraFields: { q: input.query }, timeoutMs: 8e3 });
        if (res.ok) {
          const data = await res.json();
          const clients = Array.isArray(data) ? data : data.results ?? data.data ?? [];
          return { clients, error: null };
        }
        const res2 = await sgpFetch(`${base}/api/assinante/`, cfg, { extraFields: { q: input.query }, timeoutMs: 8e3 });
        if (res2.ok) {
          const data2 = await res2.json();
          const clients = Array.isArray(data2) ? data2 : data2.results ?? data2.data ?? [];
          return { clients, error: null };
        }
        return { clients: [], error: `HTTP ${res.status}` };
      } catch (e) {
        return { clients: [], error: e.message ?? "Erro ao pesquisar clientes" };
      }
    }),
    // ─── Sincronizar Labels de ONUs ───────────────────────────────────────────────
    syncOnuLabels: adminProcedure.input(z5.object({ ctoId: z5.number(), sgpCtoId: z5.number() })).mutation(async ({ input }) => {
      const cfg = await getSgpConfig();
      if (!cfg || !cfg.active) throw new TRPCError5({ code: "PRECONDITION_FAILED", message: "SGP n\xE3o configurado" });
      try {
        const base = cfg.baseUrl.replace(/\/$/, "");
        const res = await sgpFetch(`${base}/api/fttx/splitter/${input.sgpCtoId}/onu/list/`, cfg, { timeoutMs: 15e3 });
        if (!res.ok) throw new TRPCError5({ code: "INTERNAL_SERVER_ERROR", message: `SGP HTTP ${res.status}` });
        const data = await res.json();
        const onus = Array.isArray(data) ? data : data.results ?? data.data ?? [];
        if (onus.length === 0) return { updated: 0, message: "Nenhuma ONU encontrada no SGP para esta CTO" };
        const tubes = await getTubesByCto(input.ctoId);
        const allVias = await getViasByCto(input.ctoId);
        let updated = 0;
        for (const onu of onus) {
          const clientName = onu.cliente_nome ?? onu.nome ?? onu.login ?? onu.contrato_login ?? "";
          const portaOnu = onu.onu ?? onu.porta ?? null;
          if (!clientName || portaOnu === null) continue;
          const via = allVias.find((v) => v.number === portaOnu && !v.label);
          if (!via) continue;
          await updateCtoVia(via.id, { label: clientName });
          if (via.fusedToViaId) {
            await updateCtoVia(via.fusedToViaId, { label: clientName });
          }
          updated++;
        }
        return { updated, message: `${updated} via(s) actualizadas com nomes de clientes SGP` };
      } catch (e) {
        if (e instanceof TRPCError5) throw e;
        throw new TRPCError5({ code: "INTERNAL_SERVER_ERROR", message: e.message ?? "Erro ao sincronizar ONUs" });
      }
    }),
    // ─── Vincular CTO FiberDoc a uma CTO do SGP ──────────────────────────────
    linkCtoToSgp: adminProcedure.input(z5.object({ ctoId: z5.number(), sgpId: z5.number() })).mutation(async ({ ctx, input }) => {
      const cto = await getCtoById(input.ctoId);
      await updateCto(input.ctoId, { sgpId: input.sgpId });
      await addSgpLinkHistory({
        ctoId: input.ctoId,
        ctoName: cto?.name ?? `CTO #${input.ctoId}`,
        sgpId: input.sgpId,
        action: "linked",
        performedBy: ctx.user?.name ?? ctx.user?.email ?? void 0
      }).catch(() => {
      });
      return { ok: true };
    }),
    // ─── Desvincular CTO FiberDoc do SGP ───────────────────────────────────
    unlinkCtoFromSgp: adminProcedure.input(z5.object({ ctoId: z5.number() })).mutation(async ({ ctx, input }) => {
      const cto = await getCtoById(input.ctoId);
      const prevSgpId = cto?.sgpId ?? null;
      await updateCto(input.ctoId, { sgpId: null });
      await addSgpLinkHistory({
        ctoId: input.ctoId,
        ctoName: cto?.name ?? `CTO #${input.ctoId}`,
        sgpId: prevSgpId,
        action: "unlinked",
        performedBy: ctx.user?.name ?? ctx.user?.email ?? void 0
      }).catch(() => {
      });
      return { ok: true };
    }),
    // ─── Histórico de vínculos SGP ──────────────────────────────────────────────────────
    linkHistory: protectedProcedure.input(z5.object({ ctoId: z5.number().optional() })).query(async ({ input }) => {
      const rows = await getSgpLinkHistory(input.ctoId);
      return { history: rows };
    }),
    // ─── Sugestões de vínculo automático por semelhança de nome ─────────────────────────────
    suggestLinks: adminProcedure.query(async () => {
      const cfg = await getSgpConfig();
      if (!cfg || !cfg.active) return { suggestions: [], error: "SGP n\xE3o configurado" };
      try {
        const base = cfg.baseUrl.replace(/\/$/, "");
        const sgpCtos = await sgpCacheGet("sgp:ctos", async () => {
          const res = await sgpFetch(`${base}/api/fttx/splitter/all/`, cfg, { timeoutMs: 15e3 });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const data = await res.json();
          return Array.isArray(data) ? data : data.results ?? data.data ?? [];
        });
        const localCtos = await getCtos();
        const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
        const suggestions = [];
        for (const local of localCtos) {
          if (local.sgpId != null) continue;
          const localNorm = norm(local.name);
          let bestScore = 0;
          let bestSgp = null;
          for (const sgp of sgpCtos) {
            const sgpName = sgp.ident ?? sgp.nome ?? sgp.name ?? "";
            const sgpNorm = norm(sgpName);
            let score = 0;
            if (localNorm === sgpNorm) {
              score = 100;
            } else if (localNorm.length > 0 && sgpNorm.length > 0) {
              let common = 0;
              const minLen = Math.min(localNorm.length, sgpNorm.length);
              for (let i = 0; i < minLen; i++) {
                if (localNorm[i] === sgpNorm[i]) common++;
                else break;
              }
              score = Math.round(common / Math.max(localNorm.length, sgpNorm.length) * 100);
              if (localNorm.includes(sgpNorm) || sgpNorm.includes(localNorm)) {
                score = Math.max(score, 70);
              }
            }
            if (score > bestScore) {
              bestScore = score;
              bestSgp = sgp;
            }
          }
          if (bestSgp && bestScore >= 50) {
            suggestions.push({
              localCtoId: local.id,
              localCtoName: local.name,
              sgpId: bestSgp.id,
              sgpName: bestSgp.ident ?? bestSgp.nome ?? bestSgp.name ?? `SGP #${bestSgp.id}`,
              score: bestScore
            });
          }
        }
        suggestions.sort((a, b) => b.score - a.score);
        return { suggestions, error: null };
      } catch (e) {
        return { suggestions: [], error: e.message ?? "Erro ao gerar sugest\xF5es" };
      }
    }),
    // ─── Vincular múltiplas CTOs ao SGP de uma vez (bulk) ──────────────────────────────
    bulkLink: adminProcedure.input(z5.object({
      links: z5.array(z5.object({ ctoId: z5.number(), sgpId: z5.number() }))
    })).mutation(async ({ ctx, input }) => {
      let linked = 0;
      for (const link of input.links) {
        const cto = await getCtoById(link.ctoId);
        await updateCto(link.ctoId, { sgpId: link.sgpId });
        await addSgpLinkHistory({
          ctoId: link.ctoId,
          ctoName: cto?.name ?? `CTO #${link.ctoId}`,
          sgpId: link.sgpId,
          action: "linked",
          performedBy: ctx.user?.name ?? ctx.user?.email ?? void 0
        }).catch(() => {
        });
        linked++;
      }
      return { ok: true, linked };
    }),
    // ─── Contagem de ONUs por splitter (para badges no mapa) ──────────────────────
    // Retorna { [sgpId]: { total, online } } para todas as CTOs vinculadas
    // "total" vem do onu_count do splitter/all/ (zero chamadas extras)
    // "online" é populado sob demanda quando queryClientsByCto é chamada
    getOnuCounts: protectedProcedure.query(async () => {
      const cfg = await getSgpConfig();
      if (!cfg || !cfg.active) return { counts: {} };
      try {
        const base = cfg.baseUrl.replace(/\/$/, "");
        const sgpCtos = await sgpCacheGet("sgp:ctos", async () => {
          const res = await sgpFetch(`${base}/api/fttx/splitter/all/`, cfg, { timeoutMs: 15e3 });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const data = await res.json();
          return Array.isArray(data) ? data : data.results ?? data.data ?? [];
        });
        const counts = {};
        for (const s of sgpCtos) {
          if (s.id != null) {
            counts[s.id] = { total: s.onu_count ?? 0 };
          }
        }
        return { counts };
      } catch {
        return { counts: {} };
      }
    }),
    // ─── IDs SGP já vinculados a CTOs locais (com nome da CTO local) ───────────────
    linkedSgpIds: protectedProcedure.query(async () => {
      const all = await getCtos();
      const linked = all.filter((c) => c.sgpId != null);
      const ids = linked.map((c) => c.sgpId);
      const nameMap = {};
      for (const c of linked) {
        if (c.sgpId != null) nameMap[c.sgpId] = c.name;
      }
      return { ids, nameMap };
    }),
    // ─── Sugestão automática para uma CTO local específica ────────────────────────
    // Retorna a melhor correspondência SGP para o nome fornecido (usado no dialog de vínculo)
    autoMatchForName: protectedProcedure.input(z5.object({ ctoName: z5.string() })).query(async ({ input }) => {
      const cfg = await getSgpConfig();
      if (!cfg || !cfg.active) return { match: null };
      try {
        const base = cfg.baseUrl.replace(/\/$/, "");
        const sgpCtos = await sgpCacheGet("sgp:ctos", async () => {
          const res = await sgpFetch(`${base}/api/fttx/splitter/all/`, cfg, { timeoutMs: 15e3 });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const data = await res.json();
          return Array.isArray(data) ? data : data.results ?? data.data ?? [];
        });
        const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
        const localNorm = norm(input.ctoName);
        let bestScore = 0;
        let bestSgp = null;
        for (const sgp of sgpCtos) {
          const sgpName = sgp.ident ?? sgp.nome ?? sgp.name ?? "";
          const sgpNorm = norm(sgpName);
          let score = 0;
          if (localNorm === sgpNorm) {
            score = 100;
          } else if (localNorm.length > 0 && sgpNorm.length > 0) {
            let common = 0;
            const minLen = Math.min(localNorm.length, sgpNorm.length);
            for (let i = 0; i < minLen; i++) {
              if (localNorm[i] === sgpNorm[i]) common++;
              else break;
            }
            score = Math.round(common / Math.max(localNorm.length, sgpNorm.length) * 100);
            if (localNorm.includes(sgpNorm) || sgpNorm.includes(localNorm)) {
              score = Math.max(score, 70);
            }
          }
          if (score > bestScore) {
            bestScore = score;
            bestSgp = sgp;
          }
        }
        if (bestSgp && bestScore >= 80) {
          return {
            match: {
              sgpId: bestSgp.id,
              sgpName: bestSgp.ident ?? bestSgp.nome ?? bestSgp.name ?? `SGP #${bestSgp.id}`,
              score: bestScore
            }
          };
        }
        return { match: null };
      } catch {
        return { match: null };
      }
    }),
    // ─── Vínculo automático em lote para todas as CTOs sem sgpId com score ≥ 90 ──
    autoLinkExact: adminProcedure.mutation(async ({ ctx }) => {
      const cfg = await getSgpConfig();
      if (!cfg || !cfg.active) throw new TRPCError5({ code: "BAD_REQUEST", message: "SGP n\xE3o configurado" });
      const base = cfg.baseUrl.replace(/\/$/, "");
      const sgpCtos = await sgpCacheGet("sgp:ctos", async () => {
        const res = await sgpFetch(`${base}/api/fttx/splitter/all/`, cfg, { timeoutMs: 15e3 });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        return Array.isArray(data) ? data : data.results ?? data.data ?? [];
      });
      const localCtos = await getCtos();
      const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
      let linked = 0;
      const details = [];
      for (const local of localCtos) {
        if (local.sgpId != null) continue;
        const localNorm = norm(local.name);
        let bestScore = 0;
        let bestSgp = null;
        for (const sgp of sgpCtos) {
          const sgpName = sgp.ident ?? sgp.nome ?? sgp.name ?? "";
          const sgpNorm = norm(sgpName);
          let score = 0;
          if (localNorm === sgpNorm) {
            score = 100;
          } else if (localNorm.length > 0 && sgpNorm.length > 0) {
            let common = 0;
            const minLen = Math.min(localNorm.length, sgpNorm.length);
            for (let i = 0; i < minLen; i++) {
              if (localNorm[i] === sgpNorm[i]) common++;
              else break;
            }
            score = Math.round(common / Math.max(localNorm.length, sgpNorm.length) * 100);
            if (localNorm.includes(sgpNorm) || sgpNorm.includes(localNorm)) score = Math.max(score, 70);
          }
          if (score > bestScore) {
            bestScore = score;
            bestSgp = sgp;
          }
        }
        if (bestSgp && bestScore >= 90) {
          await updateCto(local.id, { sgpId: bestSgp.id });
          await addSgpLinkHistory({
            ctoId: local.id,
            ctoName: local.name,
            sgpId: bestSgp.id,
            action: "linked",
            performedBy: ctx.user?.name ?? ctx.user?.email ?? "auto-link"
          }).catch(() => {
          });
          details.push({ ctoName: local.name, sgpName: bestSgp.ident ?? bestSgp.nome ?? bestSgp.name ?? `SGP #${bestSgp.id}`, score: bestScore });
          linked++;
        }
      }
      return { ok: true, linked, details };
    }),
    // ─── CPE Manager: Buscar ONTs por login/serial ───────────────────────────────
    searchOnus: protectedProcedure.input(z5.object({
      query: z5.string().min(1),
      limit: z5.number().min(1).max(200).default(50)
    })).query(async ({ input }) => {
      const cfg = await getSgpConfig();
      if (!cfg || !cfg.active) return { onus: [], error: "SGP n\xE3o configurado" };
      try {
        const base = cfg.baseUrl.replace(/\/$/, "");
        const res = await sgpFetch(
          `${base}/api/fttx/onu/?serial=${encodeURIComponent(input.query)}`,
          cfg,
          { timeoutMs: 1e4 }
        );
        if (res.ok) {
          const data = await res.json();
          const list = Array.isArray(data) ? data : data.results ?? data.data ?? [];
          if (list.length > 0) return { onus: list.slice(0, input.limit), error: null };
        }
        const res2 = await sgpFetch(
          `${base}/api/fttx/onu/?login=${encodeURIComponent(input.query)}`,
          cfg,
          { timeoutMs: 1e4 }
        );
        if (res2.ok) {
          const data2 = await res2.json();
          const list2 = Array.isArray(data2) ? data2 : data2.results ?? data2.data ?? [];
          return { onus: list2.slice(0, input.limit), error: null };
        }
        return { onus: [], error: null };
      } catch (e) {
        return { onus: [], error: e.message ?? "Erro ao buscar ONTs" };
      }
    }),
    // ─── CPE Manager: Detalhes de uma ONU ───────────────────────────────────────
    getOnuDetail: protectedProcedure.input(z5.object({ onuId: z5.number() })).query(async ({ input }) => {
      const cfg = await getSgpConfig();
      if (!cfg || !cfg.active) throw new TRPCError5({ code: "PRECONDITION_FAILED", message: "SGP n\xE3o configurado" });
      try {
        const base = cfg.baseUrl.replace(/\/$/, "");
        const res = await sgpFetch(`${base}/api/fttx/onu/${input.onuId}/`, cfg, { timeoutMs: 1e4 });
        if (!res.ok) throw new TRPCError5({ code: "NOT_FOUND", message: `ONU #${input.onuId} n\xE3o encontrada` });
        const data = await res.json();
        return data;
      } catch (e) {
        if (e instanceof TRPCError5) throw e;
        throw new TRPCError5({ code: "INTERNAL_SERVER_ERROR", message: e.message });
      }
    }),
    // ─── CPE Manager: Configurar ONU via SGP ────────────────────────────────────
    configureOnt: protectedProcedure.input(z5.object({
      onuId: z5.number(),
      configurePppoe: z5.boolean().default(false),
      pppoeLogin: z5.string().optional(),
      pppoePassword: z5.string().optional(),
      configureWifi: z5.boolean().default(false),
      wifiSsid: z5.string().optional(),
      wifiPassword: z5.string().optional(),
      wifiSsid5: z5.string().optional(),
      wifiPassword5: z5.string().optional()
    })).mutation(async ({ input }) => {
      const cfg = await getSgpConfig();
      if (!cfg || !cfg.active) throw new TRPCError5({ code: "PRECONDITION_FAILED", message: "SGP n\xE3o configurado" });
      const base = cfg.baseUrl.replace(/\/$/, "");
      const results = [];
      const errors = [];
      if (input.configurePppoe && input.pppoeLogin) {
        try {
          const res = await sgpFetch(`${base}/api/fttx/onu/${input.onuId}/edit/`, cfg, {
            method: "POST",
            extraFields: {
              onu_update: "wan",
              onu_login: input.pppoeLogin,
              ...input.pppoePassword ? { onu_password: input.pppoePassword } : {}
            },
            timeoutMs: 15e3
          });
          if (res.ok) results.push(`PPPoE configurado: ${input.pppoeLogin}`);
          else errors.push(`Erro ao configurar PPPoE: HTTP ${res.status}`);
        } catch (e) {
          errors.push(`Erro PPPoE: ${e.message}`);
        }
      }
      if (input.configureWifi && (input.wifiSsid || input.wifiPassword)) {
        try {
          const wifiFields = { onu_update: "wifi" };
          if (input.wifiSsid) wifiFields.wifi_ssid = input.wifiSsid;
          if (input.wifiPassword) wifiFields.wifi_password = input.wifiPassword;
          if (input.wifiSsid5) wifiFields.wifi_ssid5 = input.wifiSsid5;
          if (input.wifiPassword5) wifiFields.wifi_password5 = input.wifiPassword5;
          const res = await sgpFetch(`${base}/api/fttx/onu/${input.onuId}/edit/`, cfg, {
            method: "POST",
            extraFields: wifiFields,
            timeoutMs: 15e3
          });
          if (res.ok) results.push(`Wi-Fi configurado: ${input.wifiSsid || "(atualizado)"}`);
          else errors.push(`Erro ao configurar Wi-Fi: HTTP ${res.status}`);
        } catch (e) {
          errors.push(`Erro Wi-Fi: ${e.message}`);
        }
      }
      return { success: errors.length === 0, results, errors };
    })
  }),
  // ─── Racks ────────────────────────────────────────────────────────────────────
  racks: router({
    list: protectedProcedure.input(z5.object({ roomId: z5.number().optional() })).query(({ input }) => getRacks(input.roomId)),
    byId: protectedProcedure.input(z5.object({ id: z5.number() })).query(({ input }) => getRackById(input.id)),
    create: adminProcedure.input(z5.object({
      name: z5.string().min(1),
      roomId: z5.number().int(),
      totalU: z5.number().int().min(1).default(44),
      notes: z5.string().optional()
    })).mutation(async ({ input }) => {
      const id = await createRack(input);
      return { id };
    }),
    update: adminProcedure.input(z5.object({
      id: z5.number(),
      name: z5.string().min(1).optional(),
      roomId: z5.number().int().optional(),
      totalU: z5.number().int().min(1).optional(),
      notes: z5.string().optional()
    })).mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updateRack(id, data);
      return { ok: true };
    }),
    delete: adminProcedure.input(z5.object({ id: z5.number() })).mutation(async ({ input }) => {
      await deleteRack(input.id);
      return { ok: true };
    })
  }),
  // ─── Alertas de CTOs ─────────────────────────────────────────────────────────
  ctoAlerts: router({
    list: protectedProcedure.input(z5.object({ onlyActive: z5.boolean().optional(), limit: z5.number().optional() })).query(({ input }) => getCtoAlerts(input)),
    activeCount: publicProcedure.query(() => countActiveCtoAlerts()),
    getConfig: protectedProcedure.query(() => getCtoAlertConfig()),
    saveConfig: adminProcedure.input(z5.object({
      enabled: z5.boolean(),
      warningThreshold: z5.number().min(1).max(100),
      criticalThreshold: z5.number().min(1).max(100),
      checkIntervalMinutes: z5.number().min(1).max(1440)
    })).mutation(async ({ input }) => {
      await saveCtoAlertConfig(input);
      return { ok: true };
    }),
    acknowledge: adminProcedure.input(z5.object({ id: z5.number(), by: z5.string().optional() })).mutation(async ({ input, ctx }) => {
      await acknowledgeCtoAlert(input.id, input.by ?? ctx.user.name ?? "admin");
      return { ok: true };
    }),
    resolve: adminProcedure.input(z5.object({ id: z5.number() })).mutation(async ({ input }) => {
      await resolveCtoAlert(input.id);
      return { ok: true };
    }),
    check: adminProcedure.mutation(async () => {
      const created = await checkAndCreateCtoAlerts();
      return { created };
    })
  }),
  mapGroups: router({
    list: protectedProcedure.query(async () => {
      const [groups, elems, routes, poles, reserves, pois, olts] = await Promise.allSettled([
        getMapGroups(),
        getAllElementGroupMemberships(),
        getAllRouteGroupMemberships(),
        getAllPoleGroupMemberships(),
        getAllReserveGroupMemberships(),
        getAllPoiGroupMemberships(),
        getAllOltGroupMemberships()
      ]);
      const g = groups.status === "fulfilled" ? groups.value : [];
      const allElements = elems.status === "fulfilled" ? elems.value : [];
      const allRoutes = routes.status === "fulfilled" ? routes.value : [];
      const allPoles = poles.status === "fulfilled" ? poles.value : [];
      const allReserves = reserves.status === "fulfilled" ? reserves.value : [];
      const allPois = pois.status === "fulfilled" ? pois.value : [];
      const allOlts = olts.status === "fulfilled" ? olts.value : [];
      return g.map((grp) => ({
        ...grp,
        elements: allElements.filter((e) => e.groupId === grp.id),
        routes: allRoutes.filter((r) => r.groupId === grp.id),
        poles: allPoles.filter((p) => p.groupId === grp.id),
        reserves: allReserves.filter((r) => r.groupId === grp.id),
        pois: allPois.filter((p) => p.groupId === grp.id),
        olts: allOlts.filter((o) => o.groupId === grp.id)
      }));
    }),
    memberships: protectedProcedure.query(async () => {
      const elements = await getAllElementGroupMemberships();
      const routes = await getAllRouteGroupMemberships();
      const poles = await getAllPoleGroupMemberships();
      const reserves = await getAllReserveGroupMemberships();
      const pois = await getAllPoiGroupMemberships();
      const olts = await getAllOltGroupMemberships();
      return { elements, routes, poles, reserves, pois, olts };
    }),
    members: protectedProcedure.input(z5.object({ groupId: z5.number() })).query(({ input }) => getGroupMembers(input.groupId)),
    create: adminProcedure.input(z5.object({ name: z5.string().min(1), color: z5.string().optional(), description: z5.string().optional(), parentId: z5.number().nullable().optional() })).mutation(async ({ input }) => {
      const id = await createMapGroup(input);
      return { id };
    }),
    update: adminProcedure.input(z5.object({ id: z5.number(), name: z5.string().optional(), color: z5.string().optional(), description: z5.string().optional(), parentId: z5.number().nullable().optional() })).mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updateMapGroup(id, data);
      return { ok: true };
    }),
    addElements: adminProcedure.input(z5.object({ elementIds: z5.array(z5.number()), groupId: z5.number() })).mutation(async ({ input }) => {
      for (const elementId of input.elementIds) {
        await addElementToGroup(elementId, input.groupId);
      }
      return { ok: true, count: input.elementIds.length };
    }),
    removeElements: adminProcedure.input(z5.object({ elementIds: z5.array(z5.number()), groupId: z5.number() })).mutation(async ({ input }) => {
      for (const elementId of input.elementIds) {
        await removeElementFromGroup(elementId, input.groupId);
      }
      return { ok: true, count: input.elementIds.length };
    }),
    delete: adminProcedure.input(z5.object({ id: z5.number() })).mutation(async ({ input }) => {
      await deleteMapGroup(input.id);
      return { ok: true };
    }),
    addElement: adminProcedure.input(z5.object({ elementId: z5.number(), groupId: z5.number() })).mutation(async ({ input }) => {
      await addElementToGroup(input.elementId, input.groupId);
      return { ok: true };
    }),
    removeElement: adminProcedure.input(z5.object({ elementId: z5.number(), groupId: z5.number() })).mutation(async ({ input }) => {
      await removeElementFromGroup(input.elementId, input.groupId);
      return { ok: true };
    }),
    addRoute: adminProcedure.input(z5.object({ routeId: z5.number(), groupId: z5.number() })).mutation(async ({ input }) => {
      await addRouteToGroup(input.routeId, input.groupId);
      return { ok: true };
    }),
    removeRoute: adminProcedure.input(z5.object({ routeId: z5.number(), groupId: z5.number() })).mutation(async ({ input }) => {
      await removeRouteFromGroup(input.routeId, input.groupId);
      return { ok: true };
    }),
    addPole: adminProcedure.input(z5.object({ poleId: z5.number(), groupId: z5.number() })).mutation(async ({ input }) => {
      await addPoleToGroup(input.poleId, input.groupId);
      return { ok: true };
    }),
    removePole: adminProcedure.input(z5.object({ poleId: z5.number(), groupId: z5.number() })).mutation(async ({ input }) => {
      await removePoleFromGroup(input.poleId, input.groupId);
      return { ok: true };
    }),
    addReserve: adminProcedure.input(z5.object({ reserveId: z5.number(), groupId: z5.number() })).mutation(async ({ input }) => {
      await addReserveToGroup(input.reserveId, input.groupId);
      return { ok: true };
    }),
    removeReserve: adminProcedure.input(z5.object({ reserveId: z5.number(), groupId: z5.number() })).mutation(async ({ input }) => {
      await removeReserveFromGroup(input.reserveId, input.groupId);
      return { ok: true };
    }),
    addOlt: adminProcedure.input(z5.object({ oltId: z5.number(), groupId: z5.number() })).mutation(async ({ input }) => {
      await addOltToGroup(input.oltId, input.groupId);
      return { ok: true };
    }),
    removeOlt: adminProcedure.input(z5.object({ oltId: z5.number(), groupId: z5.number() })).mutation(async ({ input }) => {
      await removeOltFromGroup(input.oltId, input.groupId);
      return { ok: true };
    }),
    reorder: adminProcedure.input(z5.object({
      updates: z5.array(z5.object({
        id: z5.number(),
        sortOrder: z5.number(),
        parentId: z5.number().nullable()
      }))
    })).mutation(async ({ input }) => {
      await reorderMapGroups(input.updates);
      return { ok: true };
    }),
    addPoi: adminProcedure.input(z5.object({ poiId: z5.number(), groupId: z5.number() })).mutation(async ({ input }) => {
      await addPoiToGroup(input.poiId, input.groupId);
      return { ok: true };
    }),
    removePoi: adminProcedure.input(z5.object({ poiId: z5.number(), groupId: z5.number() })).mutation(async ({ input }) => {
      await removePoiFromGroup(input.poiId, input.groupId);
      return { ok: true };
    }),
    addDgo: adminProcedure.input(z5.object({ dgoId: z5.number(), groupId: z5.number() })).mutation(async ({ input }) => {
      await addDgoToGroup(input.dgoId, input.groupId);
      return { ok: true };
    }),
    removeDgo: adminProcedure.input(z5.object({ dgoId: z5.number(), groupId: z5.number() })).mutation(async ({ input }) => {
      await removeDgoFromGroup(input.dgoId, input.groupId);
      return { ok: true };
    })
  }),
  fusionReport: router({
    byCeo: protectedProcedure.input(z5.object({ ceoId: z5.number() })).query(async ({ input }) => {
      const tubes = await getTubesByCeo(input.ceoId);
      const allVias = await getViasByCeo(input.ceoId);
      return tubes.map((tube) => ({
        ...tube,
        vias: allVias.filter((v) => v.tubeId === tube.id).sort((a, b) => a.viaNumber - b.viaNumber).map((via) => ({
          ...via,
          fusedToLabel: via.fusedToViaId ? (() => {
            const dest = allVias.find((v) => v.id === via.fusedToViaId);
            const destTube = dest ? tubes.find((t2) => t2.id === dest.tubeId) : null;
            return dest ? `Via ${dest.viaNumber}${dest.label ? ` \u2014 ${dest.label}` : ""}${destTube ? ` (${destTube.identifier})` : ""}` : null;
          })() : null
        }))
      }));
    }),
    byCto: protectedProcedure.input(z5.object({ ctoId: z5.number() })).query(async ({ input }) => {
      const tubes = await getTubesByCto(input.ctoId);
      const allVias = await getViasByCto(input.ctoId);
      return tubes.map((tube) => ({
        ...tube,
        vias: allVias.filter((v) => v.tubeId === tube.id).sort((a, b) => a.viaNumber - b.viaNumber).map((via) => ({
          ...via,
          fusedToLabel: via.fusedToViaId ? (() => {
            const dest = allVias.find((v) => v.id === via.fusedToViaId);
            const destTube = dest ? tubes.find((t2) => t2.id === dest.tubeId) : null;
            return dest ? `Via ${dest.viaNumber}${dest.label ? ` \u2014 ${dest.label}` : ""}${destTube ? ` (${destTube.identifier})` : ""}` : null;
          })() : null
        }))
      }));
    })
  }),
  sshCommander: sshCommanderRouter,
  genieacs: genieacsRouter,
  networkSnmp: networkSnmpRouter,
  mapPoles: router({
    list: protectedProcedure.query(() => getMapPoles()),
    byId: protectedProcedure.input(z5.object({ id: z5.number() })).query(({ input }) => getMapPoleById(input.id)),
    create: adminProcedure.input(z5.object({
      name: z5.string().min(1),
      reference: z5.string().optional(),
      effort: z5.string().optional(),
      lat: z5.number(),
      lng: z5.number(),
      notes: z5.string().optional()
    })).mutation(async ({ input }) => {
      const id = await createMapPole(input);
      return { id };
    }),
    update: adminProcedure.input(z5.object({
      id: z5.number(),
      name: z5.string().optional(),
      reference: z5.string().optional(),
      effort: z5.string().optional(),
      lat: z5.number().optional(),
      lng: z5.number().optional(),
      notes: z5.string().optional()
    })).mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updateMapPole(id, data);
      return { ok: true };
    }),
    delete: adminProcedure.input(z5.object({ id: z5.number() })).mutation(async ({ input }) => {
      await deleteMapPole(input.id);
      return { ok: true };
    })
  }),
  mapTechnicalReserves: router({
    list: protectedProcedure.query(() => getMapTechnicalReserves()),
    byId: protectedProcedure.input(z5.object({ id: z5.number() })).query(({ input }) => getMapTechnicalReserveById(input.id)),
    byRoute: protectedProcedure.input(z5.object({ routeId: z5.number() })).query(({ input }) => getMapTechnicalReservesByRoute(input.routeId)),
    create: adminProcedure.input(z5.object({
      name: z5.string().min(1),
      sizeMeters: z5.number().int().min(0),
      routeId: z5.number().nullable().optional(),
      lat: z5.number(),
      lng: z5.number(),
      notes: z5.string().optional()
    })).mutation(async ({ input }) => {
      const id = await createMapTechnicalReserve(input);
      return { id };
    }),
    update: adminProcedure.input(z5.object({
      id: z5.number(),
      name: z5.string().optional(),
      sizeMeters: z5.number().int().min(0).optional(),
      routeId: z5.number().nullable().optional(),
      lat: z5.number().optional(),
      lng: z5.number().optional(),
      notes: z5.string().optional()
    })).mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updateMapTechnicalReserve(id, data);
      return { ok: true };
    }),
    delete: adminProcedure.input(z5.object({ id: z5.number() })).mutation(async ({ input }) => {
      await deleteMapTechnicalReserve(input.id);
      return { ok: true };
    })
  }),
  mapPois: router({
    list: protectedProcedure.query(async () => {
      const pois = await getMapPois();
      const memberships = await getAllPoiGroupMemberships();
      return pois.map((p) => ({ ...p, groups: memberships.filter((m) => m.poiId === p.id).map((m) => m.groupId) }));
    }),
    byId: protectedProcedure.input(z5.object({ id: z5.number() })).query(async ({ input }) => getMapPoiById(input.id)),
    create: adminProcedure.input(z5.object({
      name: z5.string().min(1),
      category: z5.string().optional(),
      lat: z5.number(),
      lng: z5.number(),
      notes: z5.string().optional(),
      color: z5.string().optional()
    })).mutation(async ({ input }) => {
      const id = await createMapPoi(input);
      return { id };
    }),
    update: adminProcedure.input(z5.object({
      id: z5.number(),
      name: z5.string().optional(),
      category: z5.string().optional(),
      lat: z5.number().optional(),
      lng: z5.number().optional(),
      notes: z5.string().optional(),
      color: z5.string().optional()
    })).mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updateMapPoi(id, data);
      return { ok: true };
    }),
    delete: adminProcedure.input(z5.object({ id: z5.number() })).mutation(async ({ input }) => {
      await deleteMapPoi(input.id);
      return { ok: true };
    }),
    addToGroup: adminProcedure.input(z5.object({ poiId: z5.number(), groupId: z5.number() })).mutation(async ({ input }) => {
      await addPoiToGroup(input.poiId, input.groupId);
      return { ok: true };
    }),
    removeFromGroup: adminProcedure.input(z5.object({ poiId: z5.number(), groupId: z5.number() })).mutation(async ({ input }) => {
      await removePoiFromGroup(input.poiId, input.groupId);
      return { ok: true };
    })
  })
});

// server/_core/context.ts
init_env();
init_db();
init_tenantContext();
import { jwtVerify as jwtVerify2 } from "jose";
async function authenticateBearer(authHeader) {
  try {
    const token = authHeader.replace(/^Bearer\s+/i, "");
    const secret = new TextEncoder().encode(ENV.cookieSecret);
    const { payload } = await jwtVerify2(token, secret, { issuer: "fiberdoc-mobile" });
    const userId = payload.sub ? parseInt(payload.sub) : null;
    if (!userId) return null;
    return await getUserById(userId);
  } catch {
    return null;
  }
}
async function createContext(opts) {
  const req = opts.req;
  const tenantDb = req.tenantDb;
  let user = null;
  try {
    const authHeader = opts.req.headers.authorization;
    if (authHeader && authHeader.toLowerCase().startsWith("bearer ")) {
      if (tenantDb) {
        user = await runWithTenantDb(tenantDb, () => authenticateBearer(authHeader));
      } else {
        user = await authenticateBearer(authHeader);
      }
    } else {
      if (tenantDb) {
        user = await runWithTenantDb(tenantDb, () => sdk.authenticateRequest(opts.req));
      } else {
        user = await sdk.authenticateRequest(opts.req);
      }
    }
  } catch (error) {
    user = null;
  }
  return {
    req: opts.req,
    res: opts.res,
    user,
    tenantSlug: req.tenantSlug,
    tenantDbName: req.tenantDbName,
    tenantDb
  };
}

// server/_core/index.ts
init_serve_static();

// server/_core/masterDb.ts
import mysql3 from "mysql2";
import { drizzle as drizzle3 } from "drizzle-orm/mysql2";
import { mysqlTable as mysqlTable2, int as int2, varchar as varchar2, boolean as boolean2, timestamp as timestamp2, text as text2 } from "drizzle-orm/mysql-core";
import { eq as eq10 } from "drizzle-orm";

// server/_core/tenantPool.ts
import mysql2 from "mysql2";
import { drizzle as drizzle2 } from "drizzle-orm/mysql2";
var tenantPools = /* @__PURE__ */ new Map();
var tenantDbs = /* @__PURE__ */ new Map();
function parseDatabaseUrl(url) {
  const clean = url.replace(/^mysql:\/\//, "").replace(/\?.*$/, "");
  const [userPass, hostPortDb] = clean.split("@");
  const [user, pass] = userPass.split(":");
  const [hostPort, dbName] = hostPortDb.split("/");
  const [host, portStr] = hostPort.split(":");
  const port = parseInt(portStr ?? "3306", 10);
  return { user, pass, host, port, dbName };
}
function getTenantDb(dbName) {
  if (tenantDbs.has(dbName)) {
    return tenantDbs.get(dbName);
  }
  const baseUrl = process.env.DATABASE_URL ?? "";
  if (!baseUrl) throw new Error("DATABASE_URL n\xE3o configurada");
  const { user, pass, host, port } = parseDatabaseUrl(baseUrl);
  const pool = mysql2.createPool({
    host,
    port,
    user,
    password: pass,
    database: dbName,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 3e4,
    connectTimeout: 1e4
  });
  pool.on("connection", (conn) => {
    conn.on("error", (err) => {
      if (err.code === "ECONNRESET" || err.code === "PROTOCOL_CONNECTION_LOST" || err.code === "ENOTFOUND") {
        console.warn(`[TenantPool] Conex\xE3o perdida para ${dbName}:`, err.code);
        tenantPools.delete(dbName);
        tenantDbs.delete(dbName);
      }
    });
  });
  const db = drizzle2(pool.promise());
  tenantPools.set(dbName, pool);
  tenantDbs.set(dbName, db);
  return db;
}
function removeTenantPool(dbName) {
  const pool = tenantPools.get(dbName);
  if (pool) {
    pool.end(() => {
    });
    tenantPools.delete(dbName);
    tenantDbs.delete(dbName);
  }
}

// server/_core/masterDb.ts
var tenants = mysqlTable2("tenants", {
  id: int2("id").primaryKey().autoincrement(),
  slug: varchar2("slug", { length: 64 }).notNull().unique(),
  name: varchar2("name", { length: 128 }).notNull(),
  dbName: varchar2("dbName", { length: 128 }).notNull(),
  logoUrl: text2("logoUrl"),
  active: boolean2("active").notNull().default(true),
  createdAt: timestamp2("createdAt").defaultNow()
});
var _masterPool = null;
var _masterDb = null;
function getMasterDb() {
  if (_masterDb) return _masterDb;
  const baseUrl = process.env.DATABASE_URL ?? "";
  if (!baseUrl) throw new Error("DATABASE_URL n\xE3o configurada");
  const { user, pass, host, port, dbName } = parseDatabaseUrl(baseUrl);
  _masterPool = mysql3.createPool({
    host,
    port,
    user,
    password: pass,
    database: dbName,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 3e4,
    connectTimeout: 1e4
  });
  _masterPool.on("connection", (conn) => {
    conn.on("error", (err) => {
      if (err.code === "ECONNRESET" || err.code === "PROTOCOL_CONNECTION_LOST" || err.code === "ENOTFOUND") {
        console.warn("[MasterDB] Conex\xE3o perdida:", err.code);
        _masterDb = null;
        _masterPool = null;
      }
    });
  });
  _masterDb = drizzle3(_masterPool.promise());
  return _masterDb;
}
async function getTenantBySlug(slug) {
  try {
    const db = getMasterDb();
    const rows = await db.select().from(tenants).where(eq10(tenants.slug, slug));
    return rows[0] ?? null;
  } catch {
    return null;
  }
}
async function getAllTenants() {
  try {
    const db = getMasterDb();
    return await db.select().from(tenants);
  } catch {
    return [];
  }
}
async function createTenant(data) {
  const db = getMasterDb();
  const result = await db.insert(tenants).values(data);
  return result[0].insertId;
}
async function updateTenant(id, data) {
  const db = getMasterDb();
  await db.update(tenants).set(data).where(eq10(tenants.id, id));
}
async function deleteTenant(id) {
  const db = getMasterDb();
  await db.delete(tenants).where(eq10(tenants.id, id));
}
async function initMasterDb() {
  try {
    const baseUrl = process.env.DATABASE_URL ?? "";
    if (!baseUrl) return;
    const { user, pass, host, port, dbName } = parseDatabaseUrl(baseUrl);
    const pool = mysql3.createPool({
      host,
      port,
      user,
      password: pass,
      database: dbName,
      waitForConnections: true,
      connectionLimit: 2
    });
    await new Promise((resolve, reject) => {
      pool.query(`
        CREATE TABLE IF NOT EXISTS tenants (
          id INT AUTO_INCREMENT PRIMARY KEY,
          slug VARCHAR(64) NOT NULL UNIQUE,
          name VARCHAR(128) NOT NULL,
          dbName VARCHAR(128) NOT NULL,
          logoUrl TEXT,
          active BOOLEAN NOT NULL DEFAULT TRUE,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        pool.end();
        if (err) reject(err);
        else resolve();
      });
    });
    console.log("[MasterDB] Tabela tenants inicializada.");
  } catch (err) {
    console.warn("[MasterDB] Falha ao inicializar tabela tenants:", err);
  }
}

// server/_core/tenantMiddleware.ts
var RESERVED_SLUGS = /* @__PURE__ */ new Set([
  "api",
  "admin",
  "static",
  "public",
  "assets",
  "favicon.ico",
  "robots.txt",
  "sitemap.xml",
  "health",
  "status"
]);
var slugCache = /* @__PURE__ */ new Map();
var CACHE_TTL_MS = 6e4;
async function resolveTenantSlug(slug) {
  const cached = slugCache.get(slug);
  if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
    return cached.active ? { dbName: cached.dbName } : null;
  }
  const tenant = await getTenantBySlug(slug);
  if (tenant) {
    slugCache.set(slug, { dbName: tenant.dbName, active: tenant.active, ts: Date.now() });
    return tenant.active ? { dbName: tenant.dbName } : null;
  }
  return null;
}
function invalidateTenantCache(slug) {
  slugCache.delete(slug);
}
async function tenantMiddleware(req, res, next) {
  const parts = req.path.split("/").filter(Boolean);
  const firstSegment = parts[0];
  if (!firstSegment || RESERVED_SLUGS.has(firstSegment)) {
    return next();
  }
  if (!/^[a-zA-Z0-9-_]+$/.test(firstSegment)) {
    return next();
  }
  try {
    const tenant = await resolveTenantSlug(firstSegment);
    if (tenant) {
      req.tenantSlug = firstSegment;
      req.tenantDbName = tenant.dbName;
      req.tenantDb = getTenantDb(tenant.dbName);
      const slugPrefix = `/${firstSegment}`;
      req.url = req.url.replace(slugPrefix, "") || "/";
      if (!req.url.startsWith("/")) req.url = "/" + req.url;
      if (req.originalUrl.startsWith(slugPrefix)) {
        req.originalUrl = req.originalUrl.replace(slugPrefix, "") || "/";
        if (!req.originalUrl.startsWith("/")) req.originalUrl = "/" + req.originalUrl;
      }
    }
  } catch (err) {
    console.warn("[TenantMiddleware] Erro ao resolver tenant:", err);
  }
  next();
}

// server/_core/tenantProvisioner.ts
import mysql4 from "mysql2/promise";
import fs5 from "fs";
import path4 from "path";
function buildPermissionHelp(user, host, dbName) {
  return `O usu\xE1rio MySQL '${user}' n\xE3o tem permiss\xE3o para criar bancos de dados. Execute o seguinte comando no MySQL como root para corrigir:

GRANT ALL PRIVILEGES ON \`fiberdoc_%\`.* TO '${user}'@'${host}';
FLUSH PRIVILEGES;

Ou para conceder permiss\xE3o apenas para este banco espec\xEDfico:

GRANT ALL PRIVILEGES ON \`${dbName}\`.* TO '${user}'@'${host}';
FLUSH PRIVILEGES;`;
}
function isPermissionError(err) {
  return err?.code === "ER_DBACCESS_DENIED_ERROR" || err?.code === "ER_ACCESS_DENIED_ERROR" || typeof err?.message === "string" && err.message.toLowerCase().includes("access denied");
}
async function provisionTenantDatabase(dbName) {
  const baseUrl = process.env.DATABASE_URL ?? "";
  if (!baseUrl) return { success: false, error: "DATABASE_URL n\xE3o configurada" };
  const { user, pass, host, port } = parseDatabaseUrl(baseUrl);
  if (!/^[a-zA-Z0-9_]+$/.test(dbName)) {
    return { success: false, error: "Nome do banco inv\xE1lido. Use apenas letras, n\xFAmeros e underscores." };
  }
  let conn = null;
  try {
    conn = await mysql4.createConnection({
      host,
      port,
      user,
      password: pass,
      multipleStatements: true
    });
    try {
      await conn.execute(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
      console.log(`[Provisioner] Banco ${dbName} criado.`);
    } catch (createErr) {
      if (isPermissionError(createErr)) {
        const help = buildPermissionHelp(user, host, dbName);
        console.error(`[Provisioner] Permiss\xE3o negada ao criar banco ${dbName}:`, createErr.message);
        return {
          success: false,
          permissionError: true,
          error: `Permiss\xE3o negada: o usu\xE1rio MySQL '${user}' n\xE3o pode criar bancos de dados.`,
          permissionHelp: help
        };
      }
      throw createErr;
    }
    await conn.execute(`USE \`${dbName}\``);
    const migrationsDir = process.env.MIGRATIONS_DIR ?? path4.join(process.cwd(), "dist");
    const migrationFiles = [
      // Schema base (todas as tabelas Drizzle consolidadas)
      "schema-base.sql",
      // Migrações incrementais
      "migrate-v7.sql",
      "migrate-v8.sql",
      "migrate-v9.sql",
      "migrate-v10.sql",
      "migrate-v11.sql",
      "migrate-v11b.sql",
      "migrate-v12.sql",
      "migrate-v13.sql",
      "migrate-v14.sql",
      "migrate-v15.sql",
      "migrate-v16.sql",
      "migrate-v17.sql",
      "migrate-v18.sql",
      "migrate-v19.sql"
    ];
    for (const file of migrationFiles) {
      const candidates = [
        path4.join(migrationsDir, file),
        path4.join(process.cwd(), file),
        path4.join("/opt/fiberdoc", file),
        path4.join("/opt/fiberdoc/dist", file)
      ];
      const sqlFile = candidates.find((f) => fs5.existsSync(f));
      if (!sqlFile) {
        console.log(`[Provisioner] ${file} n\xE3o encontrado \u2014 ignorado.`);
        continue;
      }
      try {
        const sql5 = fs5.readFileSync(sqlFile, "utf-8");
        const statements = sql5.split(";").map((s) => s.trim()).filter((s) => s.length > 0 && !s.startsWith("--"));
        for (const stmt of statements) {
          try {
            await conn.execute(stmt);
          } catch (stmtErr) {
            if (stmtErr.code !== "ER_TABLE_EXISTS_ERROR" && stmtErr.code !== "ER_DUP_FIELDNAME" && stmtErr.code !== "ER_DUP_KEYNAME") {
              console.warn(`[Provisioner] Aviso em ${file}:`, stmtErr.message);
            }
          }
        }
        console.log(`[Provisioner] ${file} aplicado em ${dbName}.`);
      } catch (fileErr) {
        console.warn(`[Provisioner] Erro ao aplicar ${file}:`, fileErr);
      }
    }
    const defaultCredentials = await seedTenantAdmin(conn);
    return { success: true, defaultCredentials };
  } catch (err) {
    console.error(`[Provisioner] Erro ao provisionar ${dbName}:`, err);
    if (isPermissionError(err)) {
      const help = buildPermissionHelp(user, host, dbName);
      return {
        success: false,
        permissionError: true,
        error: `Permiss\xE3o negada: o usu\xE1rio MySQL '${user}' n\xE3o pode criar bancos de dados.`,
        permissionHelp: help
      };
    }
    return { success: false, error: err.message ?? String(err) };
  } finally {
    if (conn) await conn.end();
  }
}
async function seedTenantAdmin(conn) {
  const DEFAULT_EMAIL = "admin@fiberdoc.local";
  const DEFAULT_PASSWORD = "fiberdoc2025";
  const DEFAULT_NAME = "Administrador";
  const openId = `local:${DEFAULT_EMAIL}`;
  try {
    const { hash: hash2 } = await import("bcryptjs");
    const passwordHash = await hash2(DEFAULT_PASSWORD, 12);
    const now = (/* @__PURE__ */ new Date()).toISOString().slice(0, 19).replace("T", " ");
    const [existing] = await conn.execute(
      `SELECT id FROM users WHERE login_method = 'local' LIMIT 1`
    );
    if (existing.length > 0) {
      console.log("[Provisioner] Usu\xE1rio admin j\xE1 existe no banco do tenant.");
      return null;
    }
    await conn.execute(
      `INSERT INTO users (openId, name, email, role, loginMethod, passwordHash, mustChangePassword, lastSignedIn)
       VALUES (?, ?, ?, 'admin', 'local', ?, 1, ?)`,
      [openId, DEFAULT_NAME, DEFAULT_EMAIL, passwordHash, now]
    );
    console.log(`[Provisioner] \u2705 Usu\xE1rio admin padr\xE3o criado no banco do tenant.`);
    return { email: DEFAULT_EMAIL, password: DEFAULT_PASSWORD };
  } catch (err) {
    console.warn("[Provisioner] N\xE3o foi poss\xEDvel criar usu\xE1rio admin:", err.message);
    return null;
  }
}
async function databaseExists(dbName) {
  const baseUrl = process.env.DATABASE_URL ?? "";
  if (!baseUrl) return false;
  const { user, pass, host, port } = parseDatabaseUrl(baseUrl);
  let conn = null;
  try {
    conn = await mysql4.createConnection({ host, port, user, password: pass });
    const [rows] = await conn.execute(
      `SELECT SCHEMA_NAME FROM information_schema.SCHEMATA WHERE SCHEMA_NAME = ?`,
      [dbName]
    );
    return rows.length > 0;
  } catch {
    return false;
  } finally {
    if (conn) await conn.end();
  }
}

// server/_core/adminTenantRouter.ts
function registerAdminTenantRoutes(app) {
  const requireAdmin = async (req, res, next) => {
    try {
      const user = await sdk.authenticateRequest(req);
      if (!user || user.role !== "admin") {
        return res.status(403).json({ error: "Acesso negado. Requer role=admin." });
      }
      req.adminUser = user;
      next();
    } catch {
      res.status(401).json({ error: "N\xE3o autenticado" });
    }
  };
  app.get("/api/admin/tenants", requireAdmin, async (_req, res) => {
    try {
      const list = await getAllTenants();
      res.json({ tenants: list });
    } catch (err) {
      res.status(500).json({ error: err.message ?? "Erro interno" });
    }
  });
  app.post("/api/admin/tenants", requireAdmin, async (req, res) => {
    try {
      const { slug, name, logoUrl } = req.body ?? {};
      if (!slug || !name) {
        return res.status(400).json({ error: "slug e name s\xE3o obrigat\xF3rios" });
      }
      if (!/^[a-z0-9-_]+$/.test(slug)) {
        return res.status(400).json({
          error: "Slug inv\xE1lido. Use apenas letras min\xFAsculas, n\xFAmeros, h\xEDfens e underscores."
        });
      }
      const existing = await getTenantBySlug(slug);
      if (existing) {
        return res.status(409).json({ error: `Slug '${slug}' j\xE1 est\xE1 em uso.` });
      }
      const dbName = `fiberdoc_${slug.replace(/-/g, "_")}`;
      const dbExists = await databaseExists(dbName);
      const id = await createTenant({ slug, name, dbName, logoUrl: logoUrl ?? null, active: true });
      const provision = await provisionTenantDatabase(dbName);
      if (!provision.success) {
        await deleteTenant(id);
        if (provision.permissionError) {
          return res.status(500).json({
            error: provision.error,
            permissionError: true,
            permissionHelp: provision.permissionHelp,
            fix: {
              description: "Execute o comando abaixo no MySQL como root para conceder permiss\xF5es ao usu\xE1rio:",
              sql: `GRANT ALL PRIVILEGES ON \`fiberdoc_%\`.* TO '${provision.permissionHelp?.match(/TO '([^']+)'/)?.[1] ?? "fiberdoc"}'@'${provision.permissionHelp?.match(/@'([^']+)'/)?.[1] ?? "localhost"}';
FLUSH PRIVILEGES;`
            }
          });
        }
        return res.status(500).json({
          error: `Falha ao provisionar banco de dados: ${provision.error}`
        });
      }
      res.status(201).json({
        ok: true,
        id,
        slug,
        name,
        dbName,
        dbAlreadyExisted: dbExists,
        message: `Provedor '${name}' criado com sucesso. Acesse em: /${slug}`,
        defaultCredentials: provision.defaultCredentials ?? null
      });
    } catch (err) {
      res.status(500).json({ error: err.message ?? "Erro interno" });
    }
  });
  app.patch("/api/admin/tenants/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (!Number.isFinite(id)) {
        return res.status(400).json({ error: "ID inv\xE1lido" });
      }
      const { name, logoUrl, active } = req.body ?? {};
      const updates = {};
      if (name !== void 0) updates.name = name;
      if (logoUrl !== void 0) updates.logoUrl = logoUrl;
      if (active !== void 0) updates.active = active;
      await updateTenant(id, updates);
      const tenants2 = await getAllTenants();
      const tenant = tenants2.find((t2) => t2.id === id);
      if (tenant) {
        invalidateTenantCache(tenant.slug);
        if (!active) {
          removeTenantPool(tenant.dbName);
        }
      }
      res.json({ ok: true });
    } catch (err) {
      res.status(500).json({ error: err.message ?? "Erro interno" });
    }
  });
  app.delete("/api/admin/tenants/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (!Number.isFinite(id)) {
        return res.status(400).json({ error: "ID inv\xE1lido" });
      }
      const tenants2 = await getAllTenants();
      const tenant = tenants2.find((t2) => t2.id === id);
      if (!tenant) {
        return res.status(404).json({ error: "Provedor n\xE3o encontrado" });
      }
      invalidateTenantCache(tenant.slug);
      removeTenantPool(tenant.dbName);
      await deleteTenant(id);
      res.json({
        ok: true,
        message: `Provedor '${tenant.name}' removido. O banco '${tenant.dbName}' foi preservado.`
      });
    } catch (err) {
      res.status(500).json({ error: err.message ?? "Erro interno" });
    }
  });
  app.post("/api/admin/tenants/:id/reprovision", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const tenants2 = await getAllTenants();
      const tenant = tenants2.find((t2) => t2.id === id);
      if (!tenant) {
        return res.status(404).json({ error: "Provedor n\xE3o encontrado" });
      }
      const result = await provisionTenantDatabase(tenant.dbName);
      if (!result.success) {
        if (result.permissionError) {
          return res.status(500).json({
            error: result.error,
            permissionError: true,
            permissionHelp: result.permissionHelp
          });
        }
        return res.status(500).json({ error: result.error });
      }
      res.json({ ok: true, message: `Migra\xE7\xF5es reaplicadas em '${tenant.dbName}'.` });
    } catch (err) {
      res.status(500).json({ error: err.message ?? "Erro interno" });
    }
  });
  app.get("/api/admin/tenants/check-slug/:slug", requireAdmin, async (req, res) => {
    try {
      const { slug } = req.params;
      const existing = await getTenantBySlug(slug);
      res.json({ available: !existing, slug });
    } catch (err) {
      res.status(500).json({ error: err.message ?? "Erro interno" });
    }
  });
}

// server/ipReportPdf.ts
import PDFDocument from "pdfkit";
var COLORS = {
  bg: "#0f1117",
  surface: "#1a1d27",
  border: "#2a2d3a",
  primary: "#6366f1",
  text: "#e2e8f0",
  muted: "#94a3b8",
  emerald: "#34d399",
  yellow: "#fbbf24",
  red: "#f87171",
  blue: "#60a5fa"
};
var STATUS_LABEL = {
  allocated: "Alocado",
  reserved: "Reservado",
  dhcp: "DHCP",
  free: "Livre"
};
var TYPE_LABEL = {
  infrastructure: "Infraestrutura",
  clients: "Clientes",
  management: "Ger\xEAncia",
  transit: "Tr\xE2nsito",
  loopback: "Loopback",
  reserved: "Reservado",
  other: "Outro"
};
function statusColor(status) {
  switch (status) {
    case "allocated":
      return COLORS.emerald;
    case "reserved":
      return COLORS.yellow;
    case "dhcp":
      return COLORS.blue;
    default:
      return COLORS.muted;
  }
}
async function generateIpReportPdf(res) {
  const summary = await getIpDashboardSummary();
  const blocks = summary.blocks;
  const doc = new PDFDocument({
    size: "A4",
    margin: 40,
    info: {
      Title: "Relat\xF3rio de Blocos IP \u2014 FiberDoc",
      Author: "FiberDoc Sistema",
      Subject: "Documenta\xE7\xE3o de Endere\xE7amento IP"
    }
  });
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="fiberdoc-ip-report-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.pdf"`
  );
  doc.pipe(res);
  const pageW = doc.page.width;
  const pageH = doc.page.height;
  const margin = 40;
  const contentW = pageW - margin * 2;
  doc.rect(0, 0, pageW, pageH).fill(COLORS.bg);
  doc.rect(0, 0, 6, pageH).fill(COLORS.primary);
  doc.fillColor(COLORS.text).font("Helvetica-Bold").fontSize(28).text("FiberDoc", margin, 80);
  doc.fillColor(COLORS.muted).font("Helvetica").fontSize(14).text("Relat\xF3rio de Blocos IP", margin, 118);
  doc.moveTo(margin, 145).lineTo(pageW - margin, 145).strokeColor(COLORS.border).lineWidth(1).stroke();
  const now = /* @__PURE__ */ new Date();
  const dateStr = now.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
  const timeStr = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  doc.fillColor(COLORS.muted).font("Helvetica").fontSize(10).text(`Gerado em ${dateStr} \xE0s ${timeStr}`, margin, 158);
  const totalBlocks = blocks.length;
  const totalHosts = blocks.reduce((s, b) => s + (b.totalHosts ?? 0), 0);
  const totalUsed = blocks.reduce((s, b) => s + (b.used ?? 0), 0);
  const pctGlobal = totalHosts > 0 ? Math.round(totalUsed / totalHosts * 100) : 0;
  const cards = [
    { label: "Blocos", value: String(totalBlocks) },
    { label: "Total de Hosts", value: totalHosts.toLocaleString("pt-BR") },
    { label: "IPs Utilizados", value: totalUsed.toLocaleString("pt-BR") },
    { label: "Utiliza\xE7\xE3o Global", value: `${pctGlobal}%` }
  ];
  const cardW = (contentW - 12) / 4;
  cards.forEach((card, i) => {
    const x = margin + i * (cardW + 4);
    doc.rect(x, 185, cardW, 56).fill(COLORS.surface);
    doc.fillColor(COLORS.muted).font("Helvetica").fontSize(8).text(card.label.toUpperCase(), x + 10, 196);
    doc.fillColor(COLORS.text).font("Helvetica-Bold").fontSize(18).text(card.value, x + 10, 210);
  });
  doc.fillColor(COLORS.text).font("Helvetica-Bold").fontSize(13).text("Blocos IP Cadastrados", margin, 265);
  doc.moveTo(margin, 282).lineTo(pageW - margin, 282).strokeColor(COLORS.primary).lineWidth(1.5).stroke();
  const cols = {
    cidr: { x: margin, w: 130, label: "CIDR / Rede" },
    name: { x: margin + 130, w: 110, label: "Nome" },
    type: { x: margin + 240, w: 80, label: "Tipo" },
    vlan: { x: margin + 320, w: 50, label: "VLAN" },
    hosts: { x: margin + 370, w: 55, label: "Hosts" },
    used: { x: margin + 425, w: 50, label: "Usados" },
    pct: { x: margin + 475, w: 40, label: "%" }
  };
  let y = 290;
  doc.rect(margin, y, contentW, 18).fill(COLORS.surface);
  Object.values(cols).forEach((col) => {
    doc.fillColor(COLORS.muted).font("Helvetica-Bold").fontSize(7.5).text(col.label, col.x + 4, y + 5, { width: col.w - 4, align: "left" });
  });
  y += 18;
  for (const block of blocks) {
    if (y > pageH - 80) {
      doc.addPage();
      doc.rect(0, 0, pageW, pageH).fill(COLORS.bg);
      doc.rect(0, 0, 6, pageH).fill(COLORS.primary);
      y = margin;
    }
    const pct = block.totalHosts > 0 ? Math.round((block.used ?? 0) / block.totalHosts * 100) : 0;
    const rowBg = y % 36 < 18 ? COLORS.bg : COLORS.surface;
    doc.rect(margin, y, contentW, 16).fill(rowBg);
    const rowData = {
      cidr: block.cidr,
      name: block.name,
      type: TYPE_LABEL[block.type] ?? block.type,
      vlan: block.vlan ? `${block.vlan}` : "\u2014",
      hosts: block.totalHosts.toLocaleString("pt-BR"),
      used: (block.used ?? 0).toLocaleString("pt-BR"),
      pct: `${pct}%`
    };
    const pctColor = pct >= 90 ? COLORS.red : pct >= 70 ? COLORS.yellow : COLORS.emerald;
    Object.entries(cols).forEach(([key, col]) => {
      const color = key === "pct" ? pctColor : COLORS.text;
      const font = key === "cidr" ? "Courier" : "Helvetica";
      doc.fillColor(color).font(font).fontSize(8).text(rowData[key], col.x + 4, y + 4, { width: col.w - 4, align: "left" });
    });
    y += 16;
  }
  for (const block of blocks) {
    const addresses = await getIpAddressesByBlock(block.id);
    const nonFree = addresses.filter((a) => a.status !== "free");
    if (nonFree.length === 0) continue;
    doc.addPage();
    doc.rect(0, 0, pageW, pageH).fill(COLORS.bg);
    doc.rect(0, 0, 6, pageH).fill(COLORS.primary);
    let dy = margin;
    doc.fillColor(COLORS.primary).font("Helvetica-Bold").fontSize(14).text(block.name, margin, dy);
    dy += 18;
    doc.fillColor(COLORS.muted).font("Courier").fontSize(10).text(block.cidr, margin, dy);
    dy += 14;
    if (block.description) {
      doc.fillColor(COLORS.muted).font("Helvetica").fontSize(9).text(block.description, margin, dy);
      dy += 12;
    }
    const pct = block.totalHosts > 0 ? Math.round((block.used ?? 0) / block.totalHosts * 100) : 0;
    const miniCards = [
      { label: "Total de Hosts", value: block.totalHosts.toLocaleString("pt-BR") },
      { label: "Utilizados", value: (block.used ?? 0).toLocaleString("pt-BR") },
      { label: "Utiliza\xE7\xE3o", value: `${pct}%` },
      { label: "VLAN", value: block.vlan ? `VLAN ${block.vlan}` : "\u2014" }
    ];
    dy += 6;
    const mCardW = (contentW - 9) / 4;
    miniCards.forEach((mc, i) => {
      const mx = margin + i * (mCardW + 3);
      doc.rect(mx, dy, mCardW, 38).fill(COLORS.surface);
      doc.fillColor(COLORS.muted).font("Helvetica").fontSize(7).text(mc.label.toUpperCase(), mx + 6, dy + 6);
      const vColor = mc.label === "Utiliza\xE7\xE3o" ? pct >= 90 ? COLORS.red : pct >= 70 ? COLORS.yellow : COLORS.emerald : COLORS.text;
      doc.fillColor(vColor).font("Helvetica-Bold").fontSize(14).text(mc.value, mx + 6, dy + 16);
    });
    dy += 48;
    const barW = contentW;
    doc.rect(margin, dy, barW, 6).fill(COLORS.surface);
    const fillW = Math.round(barW * pct / 100);
    const barColor = pct >= 90 ? COLORS.red : pct >= 70 ? COLORS.yellow : COLORS.emerald;
    if (fillW > 0) doc.rect(margin, dy, fillW, 6).fill(barColor);
    dy += 14;
    doc.fillColor(COLORS.text).font("Helvetica-Bold").fontSize(10).text(`Endere\xE7os Alocados (${nonFree.length})`, margin, dy);
    dy += 14;
    const ipCols = {
      address: { x: margin, w: 110, label: "Endere\xE7o IP" },
      status: { x: margin + 110, w: 65, label: "Status" },
      hostname: { x: margin + 175, w: 115, label: "Hostname" },
      owner: { x: margin + 290, w: 90, label: "Propriet\xE1rio" },
      equipment: { x: margin + 380, w: 110, label: "Equipamento" }
    };
    doc.rect(margin, dy, contentW, 16).fill(COLORS.surface);
    Object.values(ipCols).forEach((col) => {
      doc.fillColor(COLORS.muted).font("Helvetica-Bold").fontSize(7).text(col.label, col.x + 3, dy + 5, { width: col.w - 3 });
    });
    dy += 16;
    for (const addr of nonFree) {
      if (dy > pageH - 60) {
        doc.addPage();
        doc.rect(0, 0, pageW, pageH).fill(COLORS.bg);
        doc.rect(0, 0, 6, pageH).fill(COLORS.primary);
        dy = margin;
      }
      const rowBg2 = dy % 28 < 14 ? COLORS.bg : COLORS.surface;
      doc.rect(margin, dy, contentW, 13).fill(rowBg2);
      const ipRowData = {
        address: addr.address,
        status: STATUS_LABEL[addr.status] ?? addr.status,
        hostname: addr.hostname ?? "\u2014",
        owner: addr.owner ?? "\u2014",
        equipment: addr.equipmentName ?? "\u2014"
      };
      Object.entries(ipCols).forEach(([key, col]) => {
        const color = key === "status" ? statusColor(addr.status) : key === "address" ? COLORS.text : COLORS.muted;
        const font = key === "address" || key === "hostname" ? "Courier" : "Helvetica";
        doc.fillColor(color).font(font).fontSize(7.5).text(ipRowData[key], col.x + 3, dy + 3, { width: col.w - 3, ellipsis: true });
      });
      dy += 13;
    }
  }
  doc.fillColor(COLORS.muted).font("Helvetica").fontSize(8).text(
    `FiberDoc \u2014 Relat\xF3rio gerado automaticamente em ${dateStr} \xE0s ${timeStr}`,
    margin,
    pageH - 30,
    { width: contentW, align: "center" }
  );
  doc.end();
}

// server/equipmentReportPdf.ts
init_db();
init_schema();
import PDFDocument2 from "pdfkit";
import { eq as eq11, asc } from "drizzle-orm";
var EQUIPMENT_TYPE_LABELS = {
  switch: "Switch",
  olt: "OLT",
  dgo: "DGO",
  splitter: "Splitter",
  router: "Roteador",
  server: "Servidor",
  patch_panel: "Patch Panel",
  amplifier: "Amplificador",
  other: "Outro"
};
var STATUS_LABELS = {
  active: "Ativo",
  inactive: "Inativo",
  maintenance: "Manuten\xE7\xE3o"
};
async function generateEquipmentReportPdf() {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const rows = await db.select({
    id: equipments.id,
    name: equipments.name,
    type: equipments.type,
    model: equipments.model,
    manufacturer: equipments.manufacturer,
    status: equipments.status,
    vlan: equipments.vlan,
    interfaceIp: equipments.interfaceIp,
    serviceDescription: equipments.serviceDescription,
    roomId: equipments.roomId,
    roomName: rooms.name
  }).from(equipments).leftJoin(rooms, eq11(equipments.roomId, rooms.id)).orderBy(asc(rooms.name), asc(equipments.name));
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument2({
      size: "A4",
      layout: "landscape",
      margins: { top: 40, bottom: 40, left: 40, right: 40 }
    });
    const chunks = [];
    doc.on("data", (c) => chunks.push(c));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);
    const W = doc.page.width;
    const DARK_BG = "#0f1117";
    const CARD_BG = "#1a1d2e";
    const PRIMARY = "#6366f1";
    const TEXT = "#e2e8f0";
    const MUTED = "#64748b";
    const BORDER = "#2d3748";
    const GREEN = "#10b981";
    const YELLOW = "#f59e0b";
    const RED = "#ef4444";
    doc.rect(0, 0, W, doc.page.height).fill(DARK_BG);
    doc.rect(0, 0, 8, doc.page.height).fill(PRIMARY);
    doc.fontSize(28).fillColor(TEXT).font("Helvetica-Bold").text("FiberDoc", 50, 60);
    doc.fontSize(14).fillColor(MUTED).font("Helvetica").text("Sistema de Documenta\xE7\xE3o de Fibras e Equipamentos", 50, 96);
    doc.moveDown(2);
    doc.rect(40, 140, W - 80, 56).fill(CARD_BG);
    doc.fontSize(20).fillColor(PRIMARY).font("Helvetica-Bold").text("Relat\xF3rio de Equipamentos", 56, 154);
    const now = /* @__PURE__ */ new Date();
    doc.fontSize(10).fillColor(MUTED).font("Helvetica").text(`Gerado em ${now.toLocaleString("pt-BR")}  \xB7  ${rows.length} equipamento(s)`, 56, 178);
    const active = rows.filter((r) => r.status === "active").length;
    const inactive = rows.filter((r) => r.status === "inactive").length;
    const maintenance = rows.filter((r) => r.status === "maintenance").length;
    const withIp = rows.filter((r) => r.interfaceIp).length;
    const withVlan = rows.filter((r) => r.vlan).length;
    const kpis = [
      { label: "Total", value: String(rows.length), color: PRIMARY },
      { label: "Ativos", value: String(active), color: GREEN },
      { label: "Inativos", value: String(inactive), color: RED },
      { label: "Manuten\xE7\xE3o", value: String(maintenance), color: YELLOW },
      { label: "Com IP", value: String(withIp), color: PRIMARY },
      { label: "Com VLAN", value: String(withVlan), color: PRIMARY }
    ];
    const kpiW = (W - 80 - 10 * (kpis.length - 1)) / kpis.length;
    let kpiX = 40;
    kpis.forEach((k) => {
      doc.rect(kpiX, 220, kpiW, 60).fill(CARD_BG);
      doc.rect(kpiX, 220, kpiW, 3).fill(k.color);
      doc.fontSize(22).fillColor(k.color).font("Helvetica-Bold").text(k.value, kpiX, 233, { width: kpiW, align: "center" });
      doc.fontSize(8).fillColor(MUTED).font("Helvetica").text(k.label, kpiX, 258, { width: kpiW, align: "center" });
      kpiX += kpiW + 10;
    });
    doc.addPage();
    doc.rect(0, 0, W, doc.page.height).fill(DARK_BG);
    doc.rect(0, 0, 8, doc.page.height).fill(PRIMARY);
    doc.fontSize(14).fillColor(TEXT).font("Helvetica-Bold").text("Listagem Completa de Equipamentos", 50, 40);
    doc.fontSize(9).fillColor(MUTED).font("Helvetica").text(`${rows.length} equipamento(s) cadastrado(s)`, 50, 58);
    const cols = [
      { label: "Equipamento", x: 50, w: 130 },
      { label: "Tipo", x: 188, w: 70 },
      { label: "Modelo / Fabricante", x: 266, w: 120 },
      { label: "Sala / Local", x: 394, w: 100 },
      { label: "Status", x: 502, w: 60 },
      { label: "VLAN", x: 570, w: 45 },
      { label: "Interface / IP", x: 623, w: 100 },
      { label: "Servi\xE7o", x: 731, w: 100 }
    ];
    let y = 78;
    doc.rect(40, y, W - 80, 18).fill(CARD_BG);
    cols.forEach((c) => {
      doc.fontSize(7).fillColor(MUTED).font("Helvetica-Bold").text(c.label.toUpperCase(), c.x, y + 5, { width: c.w, lineBreak: false });
    });
    y += 18;
    rows.forEach((row, i) => {
      const rowH = 20;
      if (y + rowH > doc.page.height - 50) {
        doc.addPage();
        doc.rect(0, 0, W, doc.page.height).fill(DARK_BG);
        doc.rect(0, 0, 8, doc.page.height).fill(PRIMARY);
        y = 40;
        doc.rect(40, y, W - 80, 18).fill(CARD_BG);
        cols.forEach((c) => {
          doc.fontSize(7).fillColor(MUTED).font("Helvetica-Bold").text(c.label.toUpperCase(), c.x, y + 5, { width: c.w, lineBreak: false });
        });
        y += 18;
      }
      if (i % 2 === 0) doc.rect(40, y, W - 80, rowH).fill("#161929");
      const statusColor2 = row.status === "active" ? GREEN : row.status === "inactive" ? RED : YELLOW;
      doc.fontSize(8).fillColor(TEXT).font("Helvetica-Bold").text(row.name ?? "", cols[0].x, y + 6, { width: cols[0].w, lineBreak: false });
      doc.fontSize(8).fillColor(MUTED).font("Helvetica").text(EQUIPMENT_TYPE_LABELS[row.type ?? ""] ?? row.type ?? "", cols[1].x, y + 6, { width: cols[1].w, lineBreak: false });
      const modelStr = [row.model, row.manufacturer].filter(Boolean).join(" / ");
      doc.fontSize(7).fillColor(MUTED).font("Helvetica").text(modelStr || "\u2014", cols[2].x, y + 6, { width: cols[2].w, lineBreak: false });
      doc.fontSize(8).fillColor(TEXT).font("Helvetica").text(row.roomName ?? "\u2014", cols[3].x, y + 6, { width: cols[3].w, lineBreak: false });
      doc.fontSize(7).fillColor(statusColor2).font("Helvetica-Bold").text(STATUS_LABELS[row.status ?? ""] ?? row.status ?? "", cols[4].x, y + 6, { width: cols[4].w, lineBreak: false });
      doc.fontSize(8).fillColor(row.vlan ? PRIMARY : MUTED).font("Helvetica").text(row.vlan ? String(row.vlan) : "\u2014", cols[5].x, y + 6, { width: cols[5].w, lineBreak: false });
      doc.fontSize(7).fillColor(row.interfaceIp ? TEXT : MUTED).font("Helvetica").text(row.interfaceIp ?? "\u2014", cols[6].x, y + 6, { width: cols[6].w, lineBreak: false });
      doc.fontSize(7).fillColor(MUTED).font("Helvetica").text(row.serviceDescription ?? "\u2014", cols[7].x, y + 6, { width: cols[7].w, lineBreak: false });
      doc.moveTo(40, y + rowH).lineTo(W - 40, y + rowH).strokeColor(BORDER).lineWidth(0.3).stroke();
      y += rowH;
    });
    const totalPages = doc._pageBuffer?.length ?? 2;
    doc.fontSize(8).fillColor(MUTED).font("Helvetica").text(`FiberDoc  \xB7  Relat\xF3rio de Equipamentos  \xB7  ${now.toLocaleDateString("pt-BR")}`, 40, doc.page.height - 30, {
      width: W - 80,
      align: "center"
    });
    doc.end();
  });
}

// server/fusionReportPdf.ts
init_db();
import PDFDocument3 from "pdfkit";
var TUBE_COLOR_HEX = {
  blue: "#3b82f6",
  orange: "#f97316",
  green: "#10b981",
  brown: "#92400e",
  slate: "#94a3b8",
  white: "#e5e7eb",
  red: "#ef4444",
  black: "#18181b",
  yellow: "#facc15",
  violet: "#8b5cf6",
  rose: "#f472b6",
  aqua: "#22d3ee"
};
async function generateFusionReportPdf(type, refId) {
  const tubes = type === "ceo" ? await getTubesByCeo(refId) : await getTubesByCto(refId);
  const allVias = type === "ceo" ? await getViasByCeo(refId) : await getViasByCto(refId);
  const entity = type === "ceo" ? await getCeoById(refId) : await getCtoById(refId);
  const entityName = entity?.name ?? (type === "ceo" ? "CEO" : "CTO");
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument3({
      size: "A4",
      margins: { top: 40, bottom: 40, left: 40, right: 40 }
    });
    const chunks = [];
    doc.on("data", (c) => chunks.push(c));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);
    const W = doc.page.width - 80;
    const DARK = "#0f1117";
    const CYAN = "#22d3ee";
    const MUTED = "#6b7280";
    const WHITE = "#f9fafb";
    const FUSED_BG = "#164e63";
    const FREE_BG = "#14532d";
    doc.rect(0, 0, doc.page.width, doc.page.height).fill(DARK);
    doc.rect(40, 40, W, 50).fill("#1e2130");
    doc.fontSize(18).fillColor(CYAN).font("Helvetica-Bold").text("FiberDoc \u2014 Relat\xF3rio de Fus\xF5es", 50, 52, { width: W - 20 });
    doc.fontSize(10).fillColor(MUTED).font("Helvetica").text(
      `${type.toUpperCase()}: ${entityName}  |  Gerado em: ${(/* @__PURE__ */ new Date()).toLocaleString("pt-BR")}`,
      50,
      74,
      { width: W - 20 }
    );
    let y = 110;
    const totalVias = allVias.length;
    const fusedVias = allVias.filter((v) => v.fusedToViaId !== null).length;
    const freeVias = totalVias - fusedVias;
    doc.rect(40, y, W, 36).fill("#1e2130");
    doc.fontSize(9).fillColor(MUTED).font("Helvetica").text("TUBOS", 50, y + 6).text("VIAS TOTAL", 160, y + 6).text("FUSIONADAS", 270, y + 6).text("LIVRES", 380, y + 6);
    doc.fontSize(14).fillColor(WHITE).font("Helvetica-Bold").text(String(tubes.length), 50, y + 18).text(String(totalVias), 160, y + 18).text(String(fusedVias), 270, y + 18);
    doc.fillColor("#4ade80").text(String(freeVias), 380, y + 18);
    y += 52;
    for (const tube of tubes) {
      const vias = allVias.filter((v) => v.tubeId === tube.id).sort((a, b) => a.viaNumber - b.viaNumber);
      if (vias.length === 0) continue;
      if (y + 28 + vias.length * 22 > doc.page.height - 60) {
        doc.addPage();
        doc.rect(0, 0, doc.page.width, doc.page.height).fill(DARK);
        y = 40;
      }
      const tubeColor = TUBE_COLOR_HEX[tube.color ?? "slate"] ?? "#94a3b8";
      doc.rect(40, y, W, 24).fill("#1a1f2e");
      doc.rect(40, y, 4, 24).fill(tubeColor);
      doc.fontSize(10).fillColor(WHITE).font("Helvetica-Bold").text(
        `${tube.type === "splitter" ? "\u2295" : "\u25CB"} ${tube.identifier}  (${vias.length} vias)`,
        52,
        y + 7,
        { width: W - 20 }
      );
      y += 28;
      for (const via of vias) {
        if (y + 22 > doc.page.height - 60) {
          doc.addPage();
          doc.rect(0, 0, doc.page.width, doc.page.height).fill(DARK);
          y = 40;
        }
        const isFused = via.fusedToViaId !== null;
        const rowBg = isFused ? FUSED_BG : FREE_BG;
        doc.rect(44, y, W - 4, 20).fill(rowBg);
        doc.fontSize(9).fillColor(WHITE).font("Helvetica-Bold").text(`Via ${via.viaNumber}`, 50, y + 5, { width: 50 });
        doc.fontSize(9).fillColor(via.label ? WHITE : MUTED).font("Helvetica").text(via.label ?? "\u2014", 110, y + 5, { width: 180 });
        if (isFused) {
          const dest = allVias.find((v) => v.id === via.fusedToViaId);
          const destTube = dest ? tubes.find((t2) => t2.id === dest.tubeId) : null;
          const fusedLabel = dest ? `\u2192 Via ${dest.viaNumber}${dest.label ? ` \u2014 ${dest.label}` : ""}${destTube ? ` (${destTube.identifier})` : ""}` : "\u2192 ?";
          doc.fontSize(8).fillColor(CYAN).font("Helvetica").text(fusedLabel, 300, y + 6, { width: W - 260 });
        } else {
          doc.fontSize(8).fillColor("#4ade80").font("Helvetica").text("LIVRE", 300, y + 6, { width: 60 });
        }
        y += 22;
      }
      y += 6;
    }
    const pageCount = doc._pageBuffer?.length ?? 1;
    doc.fontSize(8).fillColor(MUTED).font("Helvetica").text(
      `FiberDoc \u2014 Sistema de Documenta\xE7\xE3o de Fibras  |  P\xE1gina 1 de ${pageCount}`,
      40,
      doc.page.height - 30,
      { width: W, align: "center" }
    );
    doc.end();
  });
}

// server/_core/index.ts
import multer from "multer";

// server/systemUpdate.ts
init_db();
init_schema();
import fs6 from "fs";
import path5 from "path";
import { execSync as execSync2 } from "child_process";
import { eq as eq12 } from "drizzle-orm";
var updateStatus = {
  running: false,
  progress: 0,
  step: "idle",
  log: []
};
function getUpdateStatus() {
  return { ...updateStatus, log: [...updateStatus.log] };
}
function setStatus2(progress, step, logLine) {
  updateStatus.progress = progress;
  updateStatus.step = step;
  if (logLine) updateStatus.log.push(`[${(/* @__PURE__ */ new Date()).toLocaleTimeString("pt-BR")}] ${logLine}`);
}
async function getCurrentVersion() {
  try {
    const pkgPath = path5.join(process.cwd(), "package.json");
    const pkg = JSON.parse(fs6.readFileSync(pkgPath, "utf-8"));
    return {
      version: pkg.version ?? "3.0.0",
      buildDate: pkg.buildDate ?? (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      description: pkg.description ?? "FiberDoc \u2014 Sistema de Documenta\xE7\xE3o de Fibras e Equipamentos"
    };
  } catch {
    return { version: "3.0.0", buildDate: "2026-02-26", description: "FiberDoc" };
  }
}
async function getUpdateHistory() {
  try {
    const db = await getDb();
    if (!db) return [];
    const row = await db.select({ value: systemSettings.value }).from(systemSettings).where(eq12(systemSettings.key, "update_history")).limit(1);
    if (row[0]?.value) return JSON.parse(row[0].value);
  } catch {
  }
  return [];
}
async function saveUpdateHistory(entry) {
  try {
    const db = await getDb();
    if (!db) return;
    const history = await getUpdateHistory();
    history.unshift(entry);
    const trimmed = history.slice(0, 20);
    const existing = await db.select({ id: systemSettings.id }).from(systemSettings).where(eq12(systemSettings.key, "update_history")).limit(1);
    if (existing[0]) {
      await db.update(systemSettings).set({ value: JSON.stringify(trimmed) }).where(eq12(systemSettings.key, "update_history"));
    } else {
      await db.insert(systemSettings).values({ key: "update_history", value: JSON.stringify(trimmed) });
    }
  } catch (e) {
    console.error("Erro ao salvar hist\xF3rico de atualiza\xE7\xE3o:", e);
  }
}
function validateUpdatePackage(zipPath) {
  try {
    const output = execSync2(`unzip -l "${zipPath}" 2>&1`, { encoding: "utf-8" });
    const hasPackageJson = output.includes("package.json");
    const hasClientOrServer = output.includes("client/") || output.includes("server/") || output.includes("drizzle/");
    if (!hasPackageJson && !hasClientOrServer) {
      return { valid: false, error: "Pacote inv\xE1lido: n\xE3o cont\xE9m arquivos do FiberDoc (package.json, client/ ou server/)" };
    }
    try {
      const pkgContent = execSync2(`unzip -p "${zipPath}" package.json 2>/dev/null || unzip -p "${zipPath}" "*/package.json" 2>/dev/null`, {
        encoding: "utf-8"
      });
      const pkg = JSON.parse(pkgContent.trim());
      return { valid: true, version: pkg.version ?? "desconhecida" };
    } catch {
      return { valid: true, version: "desconhecida" };
    }
  } catch (e) {
    return { valid: false, error: `Arquivo ZIP inv\xE1lido ou corrompido: ${e.message}` };
  }
}
async function applyUpdate(zipPath, originalName) {
  if (updateStatus.running) throw new Error("J\xE1 existe uma atualiza\xE7\xE3o em andamento");
  updateStatus = { running: true, progress: 0, step: "validating", log: [] };
  setStatus2(5, "validating", `Iniciando atualiza\xE7\xE3o: ${originalName}`);
  const isProduction = process.env.NODE_ENV === "production";
  const appDir = process.cwd();
  const tmpDir = path5.join("/tmp", `fiberdoc-update-${Date.now()}`);
  const backupDir = path5.join("/tmp", `fiberdoc-backup-${Date.now()}`);
  try {
    setStatus2(10, "validating", "Validando pacote ZIP...");
    const validation = validateUpdatePackage(zipPath);
    if (!validation.valid) throw new Error(validation.error);
    setStatus2(15, "validating", `Pacote v\xE1lido. Vers\xE3o detectada: ${validation.version}`);
    setStatus2(20, "backup", "Criando backup dos arquivos atuais...");
    fs6.mkdirSync(backupDir, { recursive: true });
    const criticalFiles = ["server", "client/src", "drizzle", "package.json", "tsconfig.json"];
    for (const f of criticalFiles) {
      const src = path5.join(appDir, f);
      if (fs6.existsSync(src)) {
        execSync2(`cp -r "${src}" "${backupDir}/" 2>/dev/null || true`);
      }
    }
    setStatus2(30, "backup", "Backup criado com sucesso");
    setStatus2(35, "extracting", "Extraindo pacote de atualiza\xE7\xE3o...");
    fs6.mkdirSync(tmpDir, { recursive: true });
    execSync2(`unzip -q "${zipPath}" -d "${tmpDir}"`, { timeout: 6e4 });
    const entries = fs6.readdirSync(tmpDir);
    const extractDir = entries.length === 1 && fs6.statSync(path5.join(tmpDir, entries[0])).isDirectory() ? path5.join(tmpDir, entries[0]) : tmpDir;
    setStatus2(45, "extracting", `Extra\xEDdo em: ${extractDir}`);
    setStatus2(50, "copying", "Aplicando arquivos atualizados...");
    const excludes = ["node_modules", ".env", "fiberdoc.env", "storage", ".manus-logs"];
    const updateFiles = fs6.readdirSync(extractDir);
    let copied = 0;
    for (const file of updateFiles) {
      if (excludes.includes(file)) continue;
      const src = path5.join(extractDir, file);
      const dst = path5.join(appDir, file);
      execSync2(`cp -r "${src}" "${dst}" 2>/dev/null || true`);
      copied++;
    }
    setStatus2(65, "copying", `${copied} itens copiados`);
    if (isProduction) {
      setStatus2(70, "installing", "Instalando depend\xEAncias...");
      execSync2(`cd "${appDir}" && pnpm install --frozen-lockfile 2>&1 | tail -3`, {
        timeout: 12e4,
        encoding: "utf-8"
      });
      setStatus2(80, "installing", "Depend\xEAncias instaladas");
      setStatus2(82, "building", "Compilando aplica\xE7\xE3o...");
      execSync2(`cd "${appDir}" && pnpm run build 2>&1 | tail -5`, {
        timeout: 18e4,
        encoding: "utf-8"
      });
      setStatus2(92, "building", "Build conclu\xEDdo");
    }
    setStatus2(95, "saving", "Salvando hist\xF3rico de atualiza\xE7\xE3o...");
    await saveUpdateHistory({
      version: validation.version ?? "desconhecida",
      appliedAt: (/* @__PURE__ */ new Date()).toISOString(),
      description: originalName
    });
    try {
      const newPkgPath = path5.join(extractDir, "package.json");
      if (fs6.existsSync(newPkgPath)) {
        const newPkg = JSON.parse(fs6.readFileSync(newPkgPath, "utf-8"));
        const curPkgPath = path5.join(appDir, "package.json");
        const curPkg = JSON.parse(fs6.readFileSync(curPkgPath, "utf-8"));
        curPkg.version = newPkg.version ?? curPkg.version;
        curPkg.buildDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        fs6.writeFileSync(curPkgPath, JSON.stringify(curPkg, null, 2));
      }
    } catch {
    }
    setStatus2(100, "done", "Atualiza\xE7\xE3o aplicada com sucesso!");
    updateStatus.running = false;
    updateStatus.completedAt = Date.now();
    if (isProduction) {
      setTimeout(() => {
        try {
          execSync2("systemctl restart fiberdoc 2>/dev/null || pm2 restart fiberdoc 2>/dev/null || true");
        } catch {
        }
      }, 2e3);
    }
  } catch (err) {
    updateStatus.running = false;
    updateStatus.error = err.message;
    setStatus2(updateStatus.progress, "error", `ERRO: ${err.message}`);
    if (isProduction && fs6.existsSync(backupDir)) {
      try {
        setStatus2(updateStatus.progress, "rollback", "Restaurando backup ap\xF3s erro...");
        execSync2(`cp -r "${backupDir}/." "${appDir}/" 2>/dev/null || true`);
        setStatus2(updateStatus.progress, "rollback", "Backup restaurado");
      } catch {
      }
    }
    throw err;
  } finally {
    try {
      fs6.rmSync(tmpDir, { recursive: true, force: true });
    } catch {
    }
    try {
      fs6.rmSync(zipPath, { force: true });
    } catch {
    }
    if (!isProduction) {
      try {
        fs6.rmSync(backupDir, { recursive: true, force: true });
      } catch {
      }
    }
  }
}

// server/_core/index.ts
init_db();
init_db();
var LOCAL_UPLOADS_DIR2 = process.env.BACKUP_LOCAL_DIR ? path6.join(path6.dirname(process.env.BACKUP_LOCAL_DIR), "uploads") : "/opt/fiberdoc/uploads";
function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}
async function findAvailablePort(startPort = 3e3) {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}
async function startServer() {
  const app = express2();
  const server = createServer(app);
  app.use(express2.json({ limit: "50mb" }));
  app.use(express2.urlencoded({ limit: "50mb", extended: true }));
  app.use(tenantMiddleware);
  registerAdminTenantRoutes(app);
  registerOAuthRoutes(app);
  registerLocalAuthRoutes(app);
  app.post("/api/webhooks/sgp", async (req, res) => {
    try {
      const { handleSgpWebhook: handleSgpWebhook2, validateWebhookSignature: validateWebhookSignature2 } = await Promise.resolve().then(() => (init_webhookHandler(), webhookHandler_exports));
      const payload = JSON.stringify(req.body);
      const signature = req.headers["x-webhook-signature"];
      if (signature) {
        const isValid = await validateWebhookSignature2(payload, signature);
        if (!isValid) {
          console.warn("[Webhook] Assinatura inv\xE1lida");
          return res.status(401).json({ error: "Assinatura inv\xE1lida" });
        }
      }
      const result = await handleSgpWebhook2(req.body);
      if (result) {
        res.json({
          success: result.success,
          serial: result.serial,
          message: result.message
        });
      } else {
        res.status(400).json({ error: "Falha ao processar webhook" });
      }
    } catch (err) {
      console.error("[Webhook] Erro:", err.message);
      res.status(500).json({ error: err.message || "Erro ao processar webhook" });
    }
  });
  app.get("/api/ip-report-pdf", async (req, res) => {
    try {
      await generateIpReportPdf(res);
    } catch (err) {
      console.error("[ip-report-pdf] erro:", err);
      if (!res.headersSent) {
        res.status(500).json({ error: "Erro ao gerar PDF" });
      }
    }
  });
  app.get("/api/equipment-report-pdf", async (req, res) => {
    try {
      const pdfBuffer = await generateEquipmentReportPdf();
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename="FiberDoc_Equipamentos_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.pdf"`);
      res.send(pdfBuffer);
    } catch (err) {
      console.error("[equipment-report-pdf] erro:", err);
      if (!res.headersSent) {
        res.status(500).json({ error: "Erro ao gerar PDF" });
      }
    }
  });
  app.get("/api/fusion-report/:type/:id", async (req, res) => {
    try {
      const type = req.params.type;
      const id = parseInt(req.params.id);
      if (!id || !Number.isFinite(id) || type !== "ceo" && type !== "cto") {
        return res.status(400).json({ error: "Par\xE2metros inv\xE1lidos" });
      }
      const pdfBuffer = await generateFusionReportPdf(type, id);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename="FiberDoc_Fusoes_${type.toUpperCase()}_${id}_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.pdf"`);
      res.send(pdfBuffer);
    } catch (err) {
      console.error("[fusion-report-pdf] erro:", err);
      if (!res.headersSent) res.status(500).json({ error: "Erro ao gerar PDF" });
    }
  });
  const uploadStorage = multer({ dest: "/tmp/fiberdoc-uploads/", limits: { fileSize: 500 * 1024 * 1024 } });
  app.get("/api/system/version", async (_req, res) => {
    try {
      const [version, history] = await Promise.all([getCurrentVersion(), getUpdateHistory()]);
      res.json({ version, history });
    } catch (err) {
      res.status(500).json({ error: "Erro ao obter vers\xE3o" });
    }
  });
  app.get("/api/system/update-status", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();
    const send = () => {
      const status = getUpdateStatus();
      res.write(`data: ${JSON.stringify(status)}

`);
      if (!status.running && (status.completedAt || status.error)) {
        clearInterval(timer);
        res.end();
      }
    };
    send();
    const timer = setInterval(send, 800);
    req.on("close", () => clearInterval(timer));
  });
  app.post("/api/system/update", uploadStorage.single("update"), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: "Nenhum arquivo enviado" });
    try {
      applyUpdate(req.file.path, req.file.originalname).catch(console.error);
      res.json({ ok: true, message: "Atualiza\xE7\xE3o iniciada" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  app.get("/api/system/network", express2.json(), async (req, res) => {
    try {
      let user = null;
      try {
        user = await sdk.authenticateRequest(req);
      } catch {
      }
      if (!user || user.role !== "admin") {
        res.status(403).json({ error: "Acesso negado" });
        return;
      }
      const { execSync: execSync3 } = await import("child_process");
      const ifaceOutput = execSync3("ip -o addr show", { encoding: "utf8" });
      const interfaces = [];
      for (const line of ifaceOutput.split("\n")) {
        const m = line.match(/^\d+:\s+(\S+)\s+inet\s+([\d.]+)\/(\d+)/);
        if (m && m[1] !== "lo") {
          interfaces.push({ name: m[1], ip: m[2], prefix: parseInt(m[3]), type: m[1].startsWith("docker") || m[1].startsWith("veth") ? "virtual" : "physical" });
        }
      }
      let gateway = "";
      let dns = "";
      let activeIface = interfaces.find((i) => i.type === "physical")?.name ?? "ens18";
      try {
        const ifContent = fs7.readFileSync("/etc/network/interfaces", "utf8");
        const gwMatch = ifContent.match(/gateway\s+([\d.]+)/);
        const dnsMatch = ifContent.match(/dns-nameservers\s+(.+)/);
        if (gwMatch) gateway = gwMatch[1].trim();
        if (dnsMatch) dns = dnsMatch[1].trim();
      } catch {
      }
      try {
        const routeOut = execSync3("ip route show default", { encoding: "utf8" });
        const rm = routeOut.match(/default via ([\d.]+)/);
        if (rm) gateway = rm[1];
      } catch {
      }
      res.json({ interfaces: interfaces.filter((i) => i.type === "physical"), gateway, dns, activeIface });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  app.post("/api/system/network", express2.json(), async (req, res) => {
    try {
      let user = null;
      try {
        user = await sdk.authenticateRequest(req);
      } catch {
      }
      if (!user || user.role !== "admin") {
        res.status(403).json({ error: "Acesso negado" });
        return;
      }
      const { iface, ip, prefix, gateway, dns } = req.body;
      const ipRe = /^(\d{1,3}\.){3}\d{1,3}$/;
      if (!iface || !ip || !prefix || !gateway) {
        res.status(400).json({ error: "Par\xE2metros obrigat\xF3rios: iface, ip, prefix, gateway" });
        return;
      }
      if (!ipRe.test(ip) || !ipRe.test(gateway)) {
        res.status(400).json({ error: "IP ou gateway inv\xE1lido" });
        return;
      }
      if (iface.includes("/") || iface.includes(";") || iface.includes("&")) {
        res.status(400).json({ error: "Nome de interface inv\xE1lido" });
        return;
      }
      const { execSync: execSync3 } = await import("child_process");
      const ifacePath = "/etc/network/interfaces";
      const backupPath = `/etc/network/interfaces.bak.${Date.now()}`;
      try {
        fs7.copyFileSync(ifacePath, backupPath);
      } catch {
      }
      const dnsLine = dns ? `
        dns-nameservers ${dns}` : "\n        dns-nameservers 8.8.8.8";
      const newContent = `# This file describes the network interfaces available on your system
# and how to activate them. For more information, see interfaces(5).
source /etc/network/interfaces.d/*
# The loopback network interface
auto lo
iface lo inet loopback
# The primary network interface
allow-hotplug ${iface}
iface ${iface} inet static
        address ${ip}/${prefix}
        gateway ${gateway}${dnsLine}
`;
      fs7.writeFileSync(ifacePath, newContent, "utf8");
      try {
        const currentIpOut = execSync3(`ip addr show ${iface}`, { encoding: "utf8" });
        const currentIpMatch = currentIpOut.match(/inet ([\d.]+\/(\d+))/);
        if (currentIpMatch) {
          execSync3(`ip addr del ${currentIpMatch[1]} dev ${iface}`, { encoding: "utf8" });
        }
      } catch {
      }
      try {
        execSync3(`ip addr add ${ip}/${prefix} dev ${iface}`, { encoding: "utf8" });
      } catch {
      }
      try {
        execSync3(`ip route del default`, { encoding: "utf8" });
      } catch {
      }
      try {
        execSync3(`ip route add default via ${gateway}`, { encoding: "utf8" });
      } catch {
      }
      res.json({ ok: true, message: `IP alterado para ${ip}/${prefix} na interface ${iface}. Gateway: ${gateway}. A configura\xE7\xE3o ser\xE1 mantida ap\xF3s reinicializa\xE7\xE3o.` });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  app.get("/api/uploads/:filename", (req, res) => {
    try {
      const filename = req.params.filename;
      if (!filename || filename.includes("..") || filename.includes("/")) {
        return res.status(400).json({ error: "Nome de arquivo inv\xE1lido" });
      }
      const filePath = path6.join(LOCAL_UPLOADS_DIR2, filename);
      if (!fs7.existsSync(filePath)) {
        return res.status(404).json({ error: "Arquivo n\xE3o encontrado" });
      }
      const ext = path6.extname(filename).toLowerCase();
      const mimeTypes = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif", ".webp": "image/webp", ".svg": "image/svg+xml" };
      res.setHeader("Content-Type", mimeTypes[ext] ?? "application/octet-stream");
      res.setHeader("Cache-Control", "public, max-age=86400");
      fs7.createReadStream(filePath).pipe(res);
    } catch (err) {
      console.error("[uploads] erro:", err);
      if (!res.headersSent) res.status(500).json({ error: "Erro ao servir arquivo" });
    }
  });
  app.get("/api/backup/download/:filename", (req, res) => {
    try {
      const filename = req.params.filename;
      if (!filename || filename.includes("..") || filename.includes("/") || !filename.endsWith(".json")) {
        return res.status(400).json({ error: "Nome de arquivo inv\xE1lido" });
      }
      const filePath = path6.join(LOCAL_BACKUP_DIR, filename);
      if (!fs7.existsSync(filePath)) {
        return res.status(404).json({ error: "Arquivo n\xE3o encontrado" });
      }
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      fs7.createReadStream(filePath).pipe(res);
    } catch (err) {
      console.error("[backup-download] erro:", err);
      if (!res.headersSent) res.status(500).json({ error: "Erro ao baixar backup" });
    }
  });
  app.get("/api/cto/sgp-links", async (_req, res) => {
    try {
      const all = await getCtos();
      const links = all.filter((c) => c.sgpId != null).map((c) => ({ ctoId: c.id, ctoName: c.name, sgpId: c.sgpId }));
      res.json({ ok: true, links });
    } catch (err) {
      res.status(500).json({ ok: false, error: err.message ?? "Erro interno" });
    }
  });
  app.post("/api/cto/:ctoId/link-sgp", async (req, res) => {
    try {
      const ctoId = parseInt(req.params.ctoId);
      const sgpId = parseInt(req.body?.sgpId);
      if (!Number.isFinite(ctoId) || !Number.isFinite(sgpId)) {
        return res.status(400).json({ ok: false, error: "ctoId e sgpId devem ser n\xFAmeros inteiros v\xE1lidos" });
      }
      await updateCto(ctoId, { sgpId });
      res.json({ ok: true, ctoId, sgpId });
    } catch (err) {
      res.status(500).json({ ok: false, error: err.message ?? "Erro interno" });
    }
  });
  app.delete("/api/cto/:ctoId/link-sgp", async (req, res) => {
    try {
      const ctoId = parseInt(req.params.ctoId);
      if (!Number.isFinite(ctoId)) {
        return res.status(400).json({ ok: false, error: "ctoId deve ser um n\xFAmero inteiro v\xE1lido" });
      }
      await updateCto(ctoId, { sgpId: null });
      res.json({ ok: true, ctoId, sgpId: null });
    } catch (err) {
      res.status(500).json({ ok: false, error: err.message ?? "Erro interno" });
    }
  });
  app.get("/api/cables/group-summary", async (req, res) => {
    try {
      let user = null;
      try {
        user = await sdk.authenticateRequest(req);
      } catch {
      }
      if (!user) {
        res.status(401).json({ error: "N\xE3o autenticado" });
        return;
      }
      const dbMod = await Promise.resolve().then(() => (init_db(), db_exports));
      const [allRoutes, allElements, allGroups, allRouteGroups] = await Promise.all([
        dbMod.getMapRoutes(),
        dbMod.getMapElements(),
        dbMod.getMapGroups(),
        dbMod.getAllRouteGroupMemberships()
      ]);
      const haversine = (a, b) => {
        const R = 6371;
        const dLat = (b.lat - a.lat) * Math.PI / 180;
        const dLng = (b.lng - a.lng) * Math.PI / 180;
        const s = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * Math.PI / 180) * Math.cos(b.lat * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
        return R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
      };
      const rows = allRoutes.map((r) => {
        const fromEl = allElements.find((e) => e.id === r.fromElementId);
        const toEl = allElements.find((e) => e.id === r.toElementId);
        let path7 = [];
        try {
          if (r.path) path7 = JSON.parse(r.path);
        } catch {
        }
        let lenM = 0;
        if (path7.length >= 2) {
          let d = 0;
          for (let i = 1; i < path7.length; i++) d += haversine(path7[i - 1], path7[i]);
          lenM = Math.round(d * 1e3);
        }
        const routeGroupIds = allRouteGroups.filter((rg) => rg.routeId === r.id).map((rg) => Number(rg.groupId));
        return { fibras: Number(r.fiberCount ?? 0), comprimento_m: lenM, groupIds: routeGroupIds };
      });
      const groupMap = {};
      for (const row of rows) {
        const gids = row.groupIds.length > 0 ? row.groupIds : [-1];
        for (const gid of gids) {
          const g = allGroups.find((x) => x.id === gid);
          const key = String(gid);
          if (!groupMap[key]) groupMap[key] = { groupId: gid, groupName: g?.name ?? "Sem grupo", groupColor: g?.color ?? "#888", cabos: 0, metros: 0, fibras: 0 };
          groupMap[key].cabos++;
          groupMap[key].metros += row.comprimento_m;
          groupMap[key].fibras += row.fibras;
        }
      }
      const summary = Object.values(groupMap).sort((a, b) => b.metros - a.metros).map((s) => ({
        groupId: s.groupId === -1 ? 0 : s.groupId,
        groupName: s.groupName,
        groupColor: s.groupColor,
        cabos: s.cabos,
        metros: s.metros,
        fibras: s.fibras
      }));
      res.json({ summary });
    } catch (err) {
      res.status(500).json({ error: err.message ?? "Erro interno" });
    }
  });
  app.post("/api/export-kml", async (req, res) => {
    try {
      let user = null;
      try {
        user = await sdk.authenticateRequest(req);
      } catch {
      }
      if (!user) {
        res.status(401).json({ error: "N\xE3o autenticado" });
        return;
      }
      const {
        format = "kml",
        elementIds,
        routeIds,
        includeFibers = false,
        fiberIds,
        exportTypes,
        exportGroupId,
        // se definido, exportar apenas elementos deste grupo
        includePoles = true,
        includeReserves = true,
        includePois = true,
        includeFusions = true
      } = req.body ?? {};
      const typeCto = exportTypes?.cto !== false;
      const typeCeo = exportTypes?.ceo !== false;
      const typeCabo = exportTypes?.cabo !== false;
      const { zipSync, strToU8 } = await import("fflate");
      const dbMod = await Promise.resolve().then(() => (init_db(), db_exports));
      const [
        allElements,
        allRoutes,
        allCtos,
        allCeos,
        allPoles,
        allReserves,
        allGroups,
        allElementMemberships,
        allRouteMemberships,
        allPoleMemberships,
        allReserveMemberships,
        allPois,
        allPoiMemberships
      ] = await Promise.all([
        getMapElements(),
        getMapRoutes(),
        getCtos(),
        dbMod.getCeos(),
        dbMod.getMapPoles(),
        dbMod.getMapTechnicalReserves(),
        dbMod.getMapGroups(),
        dbMod.getAllElementGroupMemberships(),
        dbMod.getAllRouteGroupMemberships(),
        dbMod.getAllPoleGroupMemberships(),
        dbMod.getAllReserveGroupMemberships(),
        dbMod.getMapPois(),
        dbMod.getAllPoiGroupMemberships()
      ]);
      const filterByGroup = (id, memberships, key) => exportGroupId ? memberships.some((m) => m.groupId === exportGroupId && m[key] === id) : true;
      let elements = allElements.filter((e) => e.type === "cto" ? typeCto : typeCeo);
      if (elementIds?.length) elements = elements.filter((e) => elementIds.includes(e.id));
      if (exportGroupId) elements = elements.filter((e) => filterByGroup(e.id, allElementMemberships, "elementId"));
      let routes = typeCabo ? allRoutes : [];
      if (routeIds?.length) routes = routes.filter((r) => routeIds.includes(r.id));
      if (exportGroupId) routes = routes.filter((r) => filterByGroup(r.id, allRouteMemberships, "routeId"));
      let poles = Array.isArray(includePoles) ? allPoles.filter((p) => includePoles.includes(p.id)) : includePoles ? allPoles : [];
      if (exportGroupId) poles = poles.filter((p) => filterByGroup(p.id, allPoleMemberships, "poleId"));
      let reserves = Array.isArray(includeReserves) ? allReserves.filter((r) => includeReserves.includes(r.id)) : includeReserves ? allReserves : [];
      if (exportGroupId) reserves = reserves.filter((r) => filterByGroup(r.id, allReserveMemberships, "reserveId"));
      let pois = Array.isArray(includePois) ? allPois.filter((p) => includePois.includes(p.id)) : includePois ? allPois : [];
      if (exportGroupId) pois = pois.filter((p) => allPoiMemberships.some((m) => m.groupId === exportGroupId && m.poiId === p.id));
      const ctoMap = new Map(allCtos.map((c) => [c.id, c]));
      const ceoMap = new Map(allCeos.map((c) => [c.id, c]));
      const groupMap = new Map(allGroups.map((g) => [g.id, g]));
      const esc = (s) => (s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
      const hexToKml = (hex, alpha = "ff") => {
        if (!hex) return null;
        const h = hex.replace("#", "");
        if (h.length !== 6) return null;
        return alpha + h.slice(4, 6) + h.slice(2, 4) + h.slice(0, 2);
      };
      const statusColor2 = (status, type) => {
        const s = status ?? "active";
        if (type === "cto") return s === "active" ? "ff00ff00" : s === "maintenance" ? "ff00ffff" : "ff0000ff";
        return s === "active" ? "ff00ffff" : s === "maintenance" ? "ff00ff00" : "ff0000ff";
      };
      const buildCeoDescription = async (ceoId, ref) => {
        if (!includeFusions) return "";
        try {
          const [tubes, vias, splitters, splitterVias, associations] = await Promise.all([
            dbMod.getTubesByCeo(ceoId),
            dbMod.getViasByCeo(ceoId),
            dbMod.getSplittersByCeo(ceoId),
            dbMod.getSplitterViasByCeo(ceoId),
            dbMod.getViaAssociationsByCeo(ceoId)
          ]);
          const lines = [];
          const totalVias = vias.length;
          const fusedVias = vias.filter((v) => v.fusedToViaId || v.fusedToSplitterId).length;
          const fusedAssoc = associations.length;
          lines.push(`Status: ${ref?.status ?? "active"}`);
          if (ref?.location) lines.push(`Localiza\xE7\xE3o: ${ref.location}`);
          lines.push(`Tubos: ${tubes.length} | Splitters: ${splitters.length}`);
          lines.push(`Vias: ${totalVias} total | ${fusedVias + fusedAssoc} fusionadas | ${totalVias - fusedVias - fusedAssoc} livres`);
          lines.push("");
          for (const tube of tubes) {
            const tubeVias = vias.filter((v) => v.tubeId === tube.id).sort((a, b) => a.viaNumber - b.viaNumber);
            const fusedCount = tubeVias.filter((v) => v.fusedToViaId || v.fusedToSplitterId).length;
            lines.push(`\u25B6 ${tube.identifier} (${tubeVias.length} vias, ${fusedCount} fusionadas)`);
            for (const via of tubeVias) {
              let dest = "livre";
              if (via.fusedToViaId) {
                const destVia = vias.find((v) => v.id === via.fusedToViaId);
                const destTube = destVia ? tubes.find((t2) => t2.id === destVia.tubeId) : null;
                dest = destVia ? `\u2192 ${destTube?.identifier ?? "?"} / Via ${destVia.viaNumber}${destVia.label ? " (" + destVia.label + ")" : ""}` : "\u2192 ?";
              } else if (via.fusedToSplitterId) {
                const destSpl = splitters.find((s) => s.id === via.fusedToSplitterId);
                const destSplVia = via.fusedToSplitterViaId ? splitterVias.find((sv) => sv.id === via.fusedToSplitterViaId) : null;
                dest = `\u2192 ${destSpl?.identifier ?? "SPL"} / ${destSplVia ? destSplVia.viaNumber === 0 ? "ENT" : "Via " + destSplVia.viaNumber : "?"}`;
              } else {
                const assoc = associations.find((a) => a.sourceType === "tube" && a.sourceViaId === via.id);
                if (assoc) {
                  const destSpl = splitters.find((s) => s.id === assoc.targetViaId || splitterVias.some((sv) => sv.id === assoc.targetViaId && sv.splitterId === s.id));
                  const destSplVia = splitterVias.find((sv) => sv.id === assoc.targetViaId);
                  const spl = destSplVia ? splitters.find((s) => s.id === destSplVia.splitterId) : null;
                  dest = spl ? `\u2192 ${spl.identifier} / ${destSplVia?.viaNumber === 0 ? "ENT" : "Via " + destSplVia?.viaNumber}` : "\u2192 SPL";
                }
              }
              const label = via.label ? ` [${via.label}]` : "";
              lines.push(`  Via ${via.viaNumber}${label}: ${dest}`);
            }
          }
          for (const spl of splitters) {
            const splVias = splitterVias.filter((sv) => sv.splitterId === spl.id).sort((a, b) => a.viaNumber - b.viaNumber);
            lines.push("");
            lines.push(`\u25B6 ${spl.identifier} (${spl.ratio}, ${spl.splitterType === "balanced" ? "balanceado" : "desbalanceado"})`);
            for (const sv of splVias) {
              const assoc = associations.find((a) => a.sourceType === "splitter" && a.sourceViaId === sv.id || a.targetType === "splitter" && a.targetViaId === sv.id);
              let dest = "livre";
              if (assoc) {
                const tubeViaId = assoc.sourceType === "splitter" ? assoc.targetViaId : assoc.sourceViaId;
                const tubeVia = vias.find((v) => v.id === tubeViaId);
                const tube = tubeVia ? tubes.find((t2) => t2.id === tubeVia.tubeId) : null;
                dest = tubeVia ? `\u2192 ${tube?.identifier ?? "?"} / Via ${tubeVia.viaNumber}` : "\u2192 ?";
              }
              const viaLabel = sv.viaNumber === 0 ? "ENT" : `Via ${sv.viaNumber}`;
              lines.push(`  ${viaLabel}: ${dest}`);
            }
          }
          if (ref?.notes) {
            lines.push("");
            lines.push(`Notas: ${ref.notes}`);
          }
          return lines.join("&#10;");
        } catch {
          return "";
        }
      };
      const buildCtoDescription = async (ctoId, ref) => {
        if (!includeFusions) return "";
        try {
          const [tubes, vias, associations] = await Promise.all([
            dbMod.getTubesByCto(ctoId),
            dbMod.getViasByCto(ctoId),
            dbMod.getViaAssociationsByCto(ctoId)
          ]);
          const lines = [];
          const fusedVias = vias.filter((v) => v.fusedToViaId).length;
          const fusedAssoc = associations.length;
          lines.push(`Status: ${ref?.status ?? "active"}`);
          if (ref?.address) lines.push(`Endere\xE7o: ${ref.address}`);
          lines.push(`Capacidade: ${ref?.capacity ?? 0} portas | Usadas: ${ref?.usedPorts ?? 0} | Livres: ${(ref?.capacity ?? 0) - (ref?.usedPorts ?? 0)}`);
          lines.push(`Tubos/Splitters: ${tubes.length}`);
          lines.push(`Vias: ${vias.length} total | ${fusedVias + fusedAssoc} fusionadas | ${vias.length - fusedVias - fusedAssoc} livres`);
          lines.push("");
          for (const tube of tubes) {
            const tubeVias = vias.filter((v) => v.tubeId === tube.id).sort((a, b) => a.viaNumber - b.viaNumber);
            const fusedCount = tubeVias.filter((v) => v.fusedToViaId).length;
            const typeLabel = tube.type === "splitter" ? `Splitter ${tube.ratio ?? ""}` : "Tubo";
            lines.push(`\u25B6 ${tube.identifier} [${typeLabel}] (${tubeVias.length} vias, ${fusedCount} fusionadas)`);
            for (const via of tubeVias) {
              let dest = "livre";
              if (via.fusedToViaId) {
                const destVia = vias.find((v) => v.id === via.fusedToViaId);
                const destTube = destVia ? tubes.find((t2) => t2.id === destVia.tubeId) : null;
                const viaLabel = destVia?.viaNumber === 0 ? "ENT" : `Via ${destVia?.viaNumber}`;
                dest = destVia ? `\u2192 ${destTube?.identifier ?? "?"} / ${viaLabel}${destVia.label ? " (" + destVia.label + ")" : ""}` : "\u2192 ?";
              } else {
                const assoc = associations.find((a) => a.sourceType === "tube" && a.sourceViaId === via.id || a.targetType === "tube" && a.targetViaId === via.id);
                if (assoc) {
                  const otherViaId = assoc.sourceType === "tube" && assoc.sourceViaId === via.id ? assoc.targetViaId : assoc.sourceViaId;
                  const otherVia = vias.find((v) => v.id === otherViaId);
                  const otherTube = otherVia ? tubes.find((t2) => t2.id === otherVia.tubeId) : null;
                  const viaLabel = otherVia?.viaNumber === 0 ? "ENT" : `Via ${otherVia?.viaNumber}`;
                  dest = otherVia ? `\u2192 ${otherTube?.identifier ?? "SPL"} / ${viaLabel}` : "\u2192 SPL";
                }
              }
              const label = via.label ? ` [${via.label}]` : "";
              const viaNum = via.viaNumber === 0 ? "ENT" : `Via ${via.viaNumber}`;
              lines.push(`  ${viaNum}${label}: ${dest}`);
            }
          }
          if (ref?.notes) {
            lines.push("");
            lines.push(`Notas: ${ref.notes}`);
          }
          return lines.join("&#10;");
        } catch {
          return "";
        }
      };
      const haversineM = (a, b) => {
        const R = 6371e3;
        const dLat = (b.lat - a.lat) * Math.PI / 180;
        const dLng = (b.lng - a.lng) * Math.PI / 180;
        const s = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * Math.PI / 180) * Math.cos(b.lat * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
        return R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
      };
      const calcRouteLen = (route, fromEl, toEl) => {
        const pts = [];
        if (fromEl) pts.push({ lat: fromEl.lat, lng: fromEl.lng });
        if (route.path) {
          try {
            pts.push(...JSON.parse(route.path));
          } catch {
          }
        }
        if (toEl) pts.push({ lat: toEl.lat, lng: toEl.lng });
        let d = 0;
        for (let i = 1; i < pts.length; i++) d += haversineM(pts[i - 1], pts[i]);
        return d;
      };
      const allElementsMap = new Map(allElements.map((e) => [e.id, e]));
      const linemarks = routes.map((r) => {
        const fromEl = allElementsMap.get(r.fromElementId);
        const toEl = allElementsMap.get(r.toElementId);
        let coords = "";
        if (fromEl) coords += `${fromEl.lng},${fromEl.lat},0`;
        if (r.path) {
          try {
            const pts = JSON.parse(r.path);
            if (pts.length > 0) {
              if (coords) coords += " ";
              coords += pts.map((p) => `${p.lng},${p.lat},0`).join(" ");
            }
          } catch {
          }
        }
        if (toEl) coords += (coords ? " " : "") + `${toEl.lng},${toEl.lat},0`;
        if (!coords) return "";
        const rawColor = r.color ?? "#22d3ee";
        const kmlColor = hexToKml(rawColor) ?? "ff" + rawColor.replace("#", "");
        const name = esc(r.name ?? `Cabo ${r.id}`);
        const lenM = calcRouteLen(r, fromEl, toEl);
        const lenStr = lenM > 0 ? `${Math.round(lenM)} m` : "";
        const fromName = fromEl ? esc((fromEl.type === "cto" ? ctoMap.get(fromEl.referenceId)?.name : ceoMap.get(fromEl.referenceId)?.name) ?? fromEl.type.toUpperCase() + "-" + fromEl.referenceId) : "";
        const toName = toEl ? esc((toEl.type === "cto" ? ctoMap.get(toEl.referenceId)?.name : ceoMap.get(toEl.referenceId)?.name) ?? toEl.type.toUpperCase() + "-" + toEl.referenceId) : "";
        const desc4 = [
          r.cableType ? `Tipo: ${r.cableType}` : "",
          `Fibras: ${r.fiberCount ?? 12}`,
          lenStr ? `Comprimento: ${lenStr}` : "",
          fromName ? `De: ${fromName}` : "",
          toName ? `Para: ${toName}` : "",
          r.notes ? `Notas: ${esc(r.notes)}` : ""
        ].filter(Boolean).join("&#10;");
        return `    <Placemark>
      <name>${name}</name>
      <description>${desc4}</description>
      <Style><LineStyle><color>${kmlColor}</color><width>3</width></LineStyle></Style>
      <LineString><tessellate>1</tessellate><coordinates>${coords}</coordinates></LineString>
    </Placemark>`;
      }).filter(Boolean).join("\n");
      const ctoPlacemarksList = [];
      for (const el of elements.filter((e) => e.type === "cto")) {
        const ref = ctoMap.get(el.referenceId);
        const name = esc(ref?.name ?? `CTO-${el.referenceId}`);
        const elColor = el.color ? hexToKml(el.color) : null;
        const iconColor = elColor ?? statusColor2(ref?.status, "cto");
        const desc4 = await buildCtoDescription(el.referenceId, ref);
        ctoPlacemarksList.push(`    <Placemark>
      <name>${name}</name>
      <description>${desc4}</description>
      <Style><IconStyle><color>${iconColor}</color><scale>1.2</scale><Icon><href>icons/cto.png</href></Icon></IconStyle></Style>
      <Point><coordinates>${el.lng},${el.lat},0</coordinates></Point>
    </Placemark>`);
      }
      const ceoPlacemarksList = [];
      for (const el of elements.filter((e) => e.type === "ceo")) {
        const ref = ceoMap.get(el.referenceId);
        const name = esc(ref?.name ?? `CEO-${el.referenceId}`);
        const elColor = el.color ? hexToKml(el.color) : null;
        const iconColor = elColor ?? statusColor2(ref?.status, "ceo");
        const desc4 = await buildCeoDescription(el.referenceId, ref);
        ceoPlacemarksList.push(`    <Placemark>
      <name>${name}</name>
      <description>${desc4}</description>
      <Style><IconStyle><color>${iconColor}</color><scale>1.2</scale><Icon><href>icons/ceo.png</href></Icon></IconStyle></Style>
      <Point><coordinates>${el.lng},${el.lat},0</coordinates></Point>
    </Placemark>`);
      }
      const polePlacemarks = poles.map((p) => {
        const name = esc(p.name ?? `Poste-${p.id}`);
        const desc4 = [
          p.reference ? `Refer\xEAncia: ${esc(p.reference)}` : "",
          p.effort ? `Esfor\xE7o: ${esc(p.effort)}` : "",
          p.notes ? `Notas: ${esc(p.notes)}` : ""
        ].filter(Boolean).join("&#10;");
        return `    <Placemark>
      <name>${name}</name>
      <description>${desc4}</description>
      <Style><IconStyle><color>ff0088ff</color><scale>0.9</scale><Icon><href>icons/pole.png</href></Icon></IconStyle></Style>
      <Point><coordinates>${p.lng},${p.lat},0</coordinates></Point>
    </Placemark>`;
      }).join("\n");
      const reservePlacemarks = reserves.map((r) => {
        const name = esc(r.name ?? `Reserva-${r.id}`);
        const routeRef = r.routeId ? allRoutes.find((rt) => rt.id === r.routeId) : null;
        const desc4 = [
          `Tamanho: ${r.sizeMeters ?? 0} m`,
          routeRef ? `Rota: ${esc(routeRef.name ?? `Cabo ${routeRef.id}`)}` : "",
          r.notes ? `Notas: ${esc(r.notes)}` : ""
        ].filter(Boolean).join("&#10;");
        return `    <Placemark>
      <name>${name}</name>
      <description>${desc4}</description>
      <Style><IconStyle><color>ff00aaff</color><scale>0.9</scale><Icon><href>icons/reserve.png</href></Icon></IconStyle></Style>
      <Point><coordinates>${r.lng},${r.lat},0</coordinates></Point>
    </Placemark>`;
      }).join("\n");
      const poiCategoryColor = (cat) => {
        switch ((cat ?? "").toLowerCase()) {
          case "camera":
            return "ff0000ff";
          case "predio":
          case "pr\xE9dio":
            return "ffaa00ff";
          case "antena":
            return "ff00aaff";
          case "torre":
            return "ff00ffaa";
          default:
            return "ff4488ff";
        }
      };
      const poiPlacemarks = pois.map((p) => {
        const name = esc(p.name ?? `POI-${p.id}`);
        const desc4 = [
          p.category ? `Categoria: ${esc(p.category)}` : "",
          p.notes ? `Notas: ${esc(p.notes)}` : ""
        ].filter(Boolean).join("&#10;");
        const color = poiCategoryColor(p.category);
        return `    <Placemark>
      <name>${name}</name>
      <description>${desc4}</description>
      <Style><IconStyle><color>${color}</color><scale>1.0</scale><Icon><href>https://maps.google.com/mapfiles/kml/paddle/wht-blank.png</href></Icon></IconStyle></Style>
      <Point><coordinates>${p.lng},${p.lat},0</coordinates></Point>
    </Placemark>`;
      }).join("\n");
      const buildGroupFolders = () => {
        if (!exportGroupId && allGroups.length === 0) return null;
        const elGroupMap = /* @__PURE__ */ new Map();
        allElementMemberships.forEach((m) => {
          if (!elGroupMap.has(m.elementId)) elGroupMap.set(m.elementId, []);
          elGroupMap.get(m.elementId).push(m.groupId);
        });
        const routeGroupMap = /* @__PURE__ */ new Map();
        allRouteMemberships.forEach((m) => {
          if (!routeGroupMap.has(m.routeId)) routeGroupMap.set(m.routeId, []);
          routeGroupMap.get(m.routeId).push(m.groupId);
        });
        const poleGroupMap = /* @__PURE__ */ new Map();
        allPoleMemberships.forEach((m) => {
          if (!poleGroupMap.has(m.poleId)) poleGroupMap.set(m.poleId, []);
          poleGroupMap.get(m.poleId).push(m.groupId);
        });
        const reserveGroupMap = /* @__PURE__ */ new Map();
        allReserveMemberships.forEach((m) => {
          if (!reserveGroupMap.has(m.reserveId)) reserveGroupMap.set(m.reserveId, []);
          reserveGroupMap.get(m.reserveId).push(m.groupId);
        });
        const poiGroupMap = /* @__PURE__ */ new Map();
        allPoiMemberships.forEach((m) => {
          if (!poiGroupMap.has(m.poiId)) poiGroupMap.set(m.poiId, []);
          poiGroupMap.get(m.poiId).push(m.groupId);
        });
        return { elGroupMap, routeGroupMap, poleGroupMap, reserveGroupMap, poiGroupMap };
      };
      const groupMaps = buildGroupFolders();
      let folders = "";
      if (allGroups.length > 0 && !exportGroupId) {
        const assignedElIds = /* @__PURE__ */ new Set();
        const assignedRouteIds = /* @__PURE__ */ new Set();
        const assignedPoleIds = /* @__PURE__ */ new Set();
        const assignedReserveIds = /* @__PURE__ */ new Set();
        const assignedPoiIds = /* @__PURE__ */ new Set();
        const buildGroupFolder = (group, depth) => {
          const children = allGroups.filter((g) => g.parentId === group.id);
          const groupItems = [];
          const indent = "  ".repeat(depth + 1);
          if (typeCto) {
            for (let i = 0; i < ctoPlacemarksList.length; i++) {
              const el = elements.filter((e) => e.type === "cto")[i];
              if (!el) continue;
              if (groupMaps?.elGroupMap.get(el.id)?.includes(group.id)) {
                groupItems.push(ctoPlacemarksList[i]);
                assignedElIds.add(el.id);
              }
            }
          }
          if (typeCeo) {
            const ceoEls = elements.filter((e) => e.type === "ceo");
            for (let i = 0; i < ceoPlacemarksList.length; i++) {
              const el = ceoEls[i];
              if (!el) continue;
              if (groupMaps?.elGroupMap.get(el.id)?.includes(group.id)) {
                groupItems.push(ceoPlacemarksList[i]);
                assignedElIds.add(el.id);
              }
            }
          }
          if (typeCabo) {
            routes.forEach((r, i) => {
              if (groupMaps?.routeGroupMap.get(r.id)?.includes(group.id)) {
                const pm = linemarks.split("\n    <Placemark>")[i + 1];
                if (pm) {
                  groupItems.push("    <Placemark>" + pm.split("</Placemark>")[0] + "</Placemark>");
                }
                assignedRouteIds.add(r.id);
              }
            });
          }
          if (includePoles) {
            poles.forEach((p, i) => {
              if (groupMaps?.poleGroupMap.get(p.id)?.includes(group.id)) {
                const pm = polePlacemarks.split("\n    <Placemark>")[i + 1];
                if (pm) {
                  groupItems.push("    <Placemark>" + pm.split("</Placemark>")[0] + "</Placemark>");
                }
                assignedPoleIds.add(p.id);
              }
            });
          }
          if (includeReserves) {
            reserves.forEach((r, i) => {
              if (groupMaps?.reserveGroupMap.get(r.id)?.includes(group.id)) {
                const pm = reservePlacemarks.split("\n    <Placemark>")[i + 1];
                if (pm) {
                  groupItems.push("    <Placemark>" + pm.split("</Placemark>")[0] + "</Placemark>");
                }
                assignedReserveIds.add(r.id);
              }
            });
          }
          pois.forEach((p, i) => {
            if (groupMaps?.poiGroupMap.get(p.id)?.includes(group.id)) {
              const pm = poiPlacemarks.split("\n    <Placemark>")[i + 1];
              if (pm) {
                groupItems.push("    <Placemark>" + pm.split("</Placemark>")[0] + "</Placemark>");
              }
              assignedPoiIds.add(p.id);
            }
          });
          const childFolders = children.map((c) => buildGroupFolder(c, depth + 1));
          if (groupItems.length === 0 && childFolders.every((f) => f === "")) return "";
          const colorStyle = group.color ? `
${indent}<Style><IconStyle><color>${hexToKml(group.color)}</color></IconStyle><LineStyle><color>${hexToKml(group.color)}</color></LineStyle></Style>` : "";
          return `${indent}<Folder>
${indent}  <name>${esc(group.name)}</name>${group.description ? `
${indent}  <description>${esc(group.description)}</description>` : ""}${colorStyle}
${groupItems.join("\n")}
${childFolders.filter(Boolean).join("\n")}
${indent}</Folder>`;
        };
        const rootGroups = allGroups.filter((g) => !g.parentId);
        const groupFolders = rootGroups.map((g) => buildGroupFolder(g, 0)).filter(Boolean);
        const semGrupoItems = [];
        if (typeCto) {
          const ctoEls = elements.filter((e) => e.type === "cto");
          ctoEls.forEach((el, i) => {
            if (!assignedElIds.has(el.id)) semGrupoItems.push(ctoPlacemarksList[i]);
          });
        }
        if (typeCeo) {
          const ceoEls = elements.filter((e) => e.type === "ceo");
          ceoEls.forEach((el, i) => {
            if (!assignedElIds.has(el.id)) semGrupoItems.push(ceoPlacemarksList[i]);
          });
        }
        if (typeCabo) {
          routes.forEach((r, i) => {
            if (!assignedRouteIds.has(r.id)) {
              const pm = linemarks.split("\n    <Placemark>")[i + 1];
              if (pm) semGrupoItems.push("    <Placemark>" + pm.split("</Placemark>")[0] + "</Placemark>");
            }
          });
        }
        if (includePoles) {
          poles.forEach((p, i) => {
            if (!assignedPoleIds.has(p.id)) {
              const pm = polePlacemarks.split("\n    <Placemark>")[i + 1];
              if (pm) semGrupoItems.push("    <Placemark>" + pm.split("</Placemark>")[0] + "</Placemark>");
            }
          });
        }
        if (includeReserves) {
          reserves.forEach((r, i) => {
            if (!assignedReserveIds.has(r.id)) {
              const pm = reservePlacemarks.split("\n    <Placemark>")[i + 1];
              if (pm) semGrupoItems.push("    <Placemark>" + pm.split("</Placemark>")[0] + "</Placemark>");
            }
          });
        }
        pois.forEach((p, i) => {
          if (!assignedPoiIds.has(p.id)) {
            const pm = poiPlacemarks.split("\n    <Placemark>")[i + 1];
            if (pm) semGrupoItems.push("    <Placemark>" + pm.split("</Placemark>")[0] + "</Placemark>");
          }
        });
        if (semGrupoItems.length > 0) {
          groupFolders.push(`  <Folder>
    <name>Sem Grupo</name>
${semGrupoItems.join("\n")}
  </Folder>`);
        }
        folders = groupFolders.join("\n");
      } else {
        const ctoFolder = typeCto && ctoPlacemarksList.length > 0 ? `  <Folder>
    <name>CTOs</name>
${ctoPlacemarksList.join("\n")}
  </Folder>` : "";
        const ceoFolder = typeCeo && ceoPlacemarksList.length > 0 ? `  <Folder>
    <name>CEOs</name>
${ceoPlacemarksList.join("\n")}
  </Folder>` : "";
        const cableFolder = typeCabo && linemarks ? `  <Folder>
    <name>Cabos de Fibra</name>
${linemarks}
  </Folder>` : "";
        const poleFolder = includePoles && polePlacemarks ? `  <Folder>
    <name>Postes</name>
${polePlacemarks}
  </Folder>` : "";
        const reserveFolder = includeReserves && reservePlacemarks ? `  <Folder>
    <name>Reservas T\xE9cnicas</name>
${reservePlacemarks}
  </Folder>` : "";
        const poiFolder = pois.length > 0 && poiPlacemarks ? `  <Folder>
    <name>Pontos de Interesse</name>
${poiPlacemarks}
  </Folder>` : "";
        folders = [ctoFolder, ceoFolder, cableFolder, poleFolder, reserveFolder, poiFolder].filter(Boolean).join("\n");
      }
      const kml = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
<Document>
  <name>FiberDoc \u2014 Infraestrutura de Rede</name>
  <description>Exportado em ${(/* @__PURE__ */ new Date()).toLocaleString("pt-BR")}</description>
${folders}
</Document>
</kml>`;
      const filename = `fiberdoc-infraestrutura-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}`;
      if (format === "kmz") {
        const kmlU8 = strToU8(kml);
        const { KMZ_ICONS: KMZ_ICONS2 } = await Promise.resolve().then(() => (init_kmzIcons(), kmzIcons_exports));
        const iconEntries = {};
        for (const [iconPath, b64] of Object.entries(KMZ_ICONS2)) {
          iconEntries[iconPath] = [Buffer.from(b64, "base64"), { level: 0 }];
        }
        const zipped = zipSync({ "doc.kml": [kmlU8, { level: 0 }], ...iconEntries });
        res.setHeader("Content-Type", "application/vnd.google-earth.kmz");
        res.setHeader("Content-Disposition", `attachment; filename="${filename}.kmz"`);
        res.send(Buffer.from(zipped));
      } else {
        res.setHeader("Content-Type", "application/vnd.google-earth.kml+xml; charset=utf-8");
        res.setHeader("Content-Disposition", `attachment; filename="${filename}.kml"`);
        res.send(kml);
      }
    } catch (err) {
      console.error("[export-kml] erro:", err);
      if (!res.headersSent) res.status(500).json({ error: err.message ?? "Erro ao exportar" });
    }
  });
  app.get("/api/ssh/execute-stream", async (req, res) => {
    const { equipmentId, commandId, params, sessionId } = req.query;
    if (!equipmentId || !commandId || !sessionId) {
      return res.status(400).json({ error: "Par\xE2metros obrigat\xF3rios em falta" });
    }
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();
    try {
      const sshMod = await Promise.resolve().then(() => (init_ssh(), ssh_exports));
      const { getDb: getDb2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      const schema = await Promise.resolve().then(() => (init_schema(), schema_exports));
      const { eq: eqD } = await import("drizzle-orm");
      const db = await getDb2();
      if (!db) {
        res.write(`data: ${JSON.stringify({ type: "error", data: "DB indispon\xEDvel" })}

`);
        return res.end();
      }
      const cred = await sshMod.getSshCredential(parseInt(equipmentId));
      if (!cred) {
        res.write(`data: ${JSON.stringify({ type: "error", data: "Credenciais SSH n\xE3o configuradas" })}

`);
        return res.end();
      }
      const cmdRows = await db.select().from(schema.sshCommands).where(eqD(schema.sshCommands.id, parseInt(commandId)));
      const cmd = cmdRows[0];
      if (!cmd) {
        res.write(`data: ${JSON.stringify({ type: "error", data: "Comando n\xE3o encontrado" })}

`);
        return res.end();
      }
      const equipRows = await db.select().from(schema.equipments).where(eqD(schema.equipments.id, parseInt(equipmentId)));
      const equip = equipRows[0];
      if (!equip) {
        res.write(`data: ${JSON.stringify({ type: "error", data: "Equipamento n\xE3o encontrado" })}

`);
        return res.end();
      }
      let password;
      try {
        password = sshMod.decryptPassword(cred.sshPasswordEnc);
      } catch {
        res.write(`data: ${JSON.stringify({ type: "error", data: "Erro ao desencriptar credenciais" })}

`);
        return res.end();
      }
      const rawLines = JSON.parse(cmd.commandLines);
      const parsedParams = params ? JSON.parse(decodeURIComponent(params)) : {};
      const lines = sshMod.applyParams(rawLines, parsedParams);
      const host = equip.ipAddress ?? equip.name;
      const confirmMode = cmd.confirmMode ?? "none";
      req.on("close", () => {
        const sess = sshMod.getActiveSession(sessionId);
        if (sess) {
          try {
            sess.conn.end();
          } catch {
          }
        }
      });
      const result = await sshMod.executeSshCommand(host, cred.sshPort, cred.sshUser, password, lines, cmd.sleepMs, confirmMode, sessionId, res);
      if (confirmMode !== "manual") {
        await db.insert(schema.sshExecutionLog).values({
          equipmentId: parseInt(equipmentId),
          commandId: parseInt(commandId),
          commandName: cmd.name,
          params: params ?? null,
          output: result.output,
          success: result.success,
          executedBy: "stream"
        }).catch(() => {
        });
      }
    } catch (err) {
      if (!res.writableEnded) {
        res.write(`data: ${JSON.stringify({ type: "error", data: err.message })}

`);
        res.end();
      }
    }
  });
  app.post("/api/ssh/confirm", express2.json(), async (req, res) => {
    const { sessionId, answer } = req.body;
    if (!sessionId || !answer) return res.status(400).json({ error: "sessionId e answer s\xE3o obrigat\xF3rios" });
    const { respondToConfirm: respondToConfirm2 } = await Promise.resolve().then(() => (init_ssh(), ssh_exports));
    const ok = respondToConfirm2(sessionId, answer);
    res.json({ ok });
  });
  app.get("/api/osrm/route", async (req, res) => {
    const { fromLng, fromLat, toLng, toLat } = req.query;
    if (!fromLng || !fromLat || !toLng || !toLat) {
      return res.status(400).json({ error: "Par\xE2metros obrigat\xF3rios: fromLng, fromLat, toLng, toLat" });
    }
    const coords = `${fromLng},${fromLat};${toLng},${toLat}`;
    const servers = [
      `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson&steps=true`,
      `https://routing.openstreetmap.de/routed-car/route/v1/driving/${coords}?overview=full&geometries=geojson&steps=true`
    ];
    for (const url of servers) {
      try {
        const response = await fetch(url, { signal: AbortSignal.timeout(8e3) });
        if (!response.ok) continue;
        const data = await response.json();
        if (data?.code === "Ok" && data.routes?.[0]) {
          const route = data.routes[0];
          const allCoords = [];
          for (const leg of route.legs ?? []) {
            for (const step of leg.steps ?? []) {
              const stepCoords = step.geometry?.coordinates ?? [];
              for (const c of stepCoords) {
                const last = allCoords[allCoords.length - 1];
                if (!last || last[0] !== c[0] || last[1] !== c[1]) {
                  allCoords.push(c);
                }
              }
            }
          }
          if (allCoords.length > 2) {
            route.geometry = { type: "LineString", coordinates: allCoords };
          }
          return res.json(data);
        }
      } catch (e) {
        console.warn(`[OSRM proxy] Falha em ${url}: ${e?.message}`);
      }
    }
    return res.status(502).json({ error: "Todos os servidores OSRM indispon\xEDveis" });
  });
  app.get("/api/osrm/test", async (_req, res) => {
    const results = {};
    const servers = [
      { name: "router.project-osrm.org", url: "https://router.project-osrm.org/route/v1/driving/-46.633,-23.550;-46.640,-23.560?overview=false" },
      { name: "routing.openstreetmap.de", url: "https://routing.openstreetmap.de/routed-car/route/v1/driving/-46.633,-23.550;-46.640,-23.560?overview=false" }
    ];
    for (const s of servers) {
      try {
        const r = await fetch(s.url, { signal: AbortSignal.timeout(6e3) });
        const d = await r.json();
        results[s.name] = d?.code === "Ok" ? "OK" : `code=${d?.code}`;
      } catch (e) {
        results[s.name] = `ERRO: ${e?.message}`;
      }
    }
    res.json(results);
  });
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext
    })
  );
  if (process.env.NODE_ENV === "development") {
    const { setupVite: setupVite2 } = await Promise.resolve().then(() => (init_vite_prod(), vite_prod_exports));
    await setupVite2(app, server);
  } else {
    serveStatic(app);
  }
  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);
  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }
  initMasterDb().catch((err) => console.warn("[MasterDB] Aviso:", err));
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
    startBackupScheduler();
    startSnmpPoller();
    startNetworkSnmpPoller();
    seedDefaultAdmin().catch(console.error);
  });
}
startServer().catch(console.error);
